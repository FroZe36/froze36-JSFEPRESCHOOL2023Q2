'use strict';

const canvas = document.getElementById('game-ground');
const ctx = canvas.getContext('2d');
const canvasWidth = (canvas.width = 500);
const canvasHeight = (canvas.height = 500);
const resetbtn = document.querySelector('.btn-reset');
let btnDifficulty = document.querySelectorAll('.btn-difficulty');
const difficultyText = document.querySelector('.difficulty-text');
const eatAudio = new Audio('./audio/eatAudio.mp3');
let tableBody = document.querySelector('.score-table-body');
let localStorageItem;
difficultyText.style.color = '#2abf22';
difficultyText.textContent = 'Easy';
let difficulty = 100;
let cells = 20;
const box = canvasWidth / cells;
let isPlayGame = false;
let score = 0;
const scoreText = document.querySelector('.score');
let dir;
let game;
let snake = [{ x: 10 * box, y: 10 * box }];

let food;
const foodImg = new Image();
const snakeHead = new Image();
snakeHead.src = './img/snake-head.png';

resetbtn.addEventListener('click', resetGame);
btnDifficulty.forEach(item =>
  item.addEventListener('click', e => {
    if (e.target.classList.contains('easy') && isPlayGame != false) {
      difficulty = 100;
      difficultyText.style.color = '#2abf22';
      difficultyText.textContent = 'Easy';
      clearInterval(game);
      while (tableBody.firstChild) {
        tableBody.firstChild.remove();
      }
      gameStart();
    } else if (e.target.classList.contains('medium') && isPlayGame != false) {
      difficulty = 75;
      difficultyText.style.color = '#b7bf22';
      difficultyText.textContent = 'Medium';
      clearInterval(game);
      while (tableBody.firstChild) {
        tableBody.firstChild.remove();
      }
      gameStart();
    } else if (e.target.classList.contains('hard') && isPlayGame != false) {
      difficulty = 50;
      difficultyText.style.color = '#e02716';
      difficultyText.textContent = 'Hard';
      clearInterval(game);
      while (tableBody.firstChild) {
        tableBody.firstChild.remove();
      }
      gameStart();
    }
  }),
);
function direction(e) {
  if (e.key == 'ArrowUp' && dir != 'down') {
    dir = 'up';
  } else if (e.key == 'ArrowDown' && dir != 'up') {
    dir = 'down';
  } else if (e.key == 'ArrowLeft' && dir != 'right') {
    dir = 'left';
  } else if (e.key == 'ArrowRight' && dir != 'left') {
    dir = 'right';
  }
}
document.addEventListener('keydown', direction);

function drawGround() {
  ctx.fillStyle = '#181825';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#7CF314';
  for (let i = 1; i < cells; i++) {
    let f = (canvasWidth / cells) * i;
    ctx.beginPath();
    ctx.moveTo(f, 0);
    ctx.lineTo(f, canvasHeight);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, f);
    ctx.lineTo(canvasWidth, f);
    ctx.stroke();
    ctx.closePath();
  }
}
drawGround();
createFood();
gameStart();
function gameStart() {
  if (localStorage.getItem('score')) {
    localStorageItem = JSON.parse(localStorage.getItem('score'));
    if (localStorageItem.length >= 10) {
      while (tableBody.firstChild) {
        tableBody.firstChild.remove();
      }
      localStorage.removeItem('score');
    }
    createTableScore(localStorageItem);
  }
  isPlayGame = true;
  scoreText.textContent = score;
  ctx.drawImage(foodImg, food.x, food.y);
  game = setInterval(() => {
    if (isPlayGame) {
      clearBoard();
      ctx.drawImage(foodImg, food.x, food.y);
      drawSnake();
      moveSnake();
      checkGameOver();
    } else {
      displayGameOver();
    }
  }, difficulty);
}
function clearBoard() {
  drawGround();
}
function createFood() {
  food = {
    x: Math.floor(Math.random() * cells) * box,
    y: Math.floor(Math.random() * cells) * box,
    foods: [
      './img/strawberry-food.png',
      './img/cherry-food.png',
      './img/apple-food.png',
    ],
  };
  foodImg.src = food.foods[~~(Math.random() * 3)];
}
function moveSnake() {
  const head = {
    x: snake[0].x,
    y: snake[0].y,
  };
  snake.unshift(head);
  if (snake[0].x == food.x && snake[0].y == food.y) {
    eatAudio.play();
    score++;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
  if (dir === 'right') snake[0].x += box;
  if (dir === 'left') snake[0].x -= box;
  if (dir === 'down') snake[0].y += box;
  if (dir === 'up') snake[0].y -= box;
}
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.drawImage(snakeHead, snake[i].x, snake[i].y);
    } else {
      ctx.fillStyle = '#cf15d5';
      ctx.fillRect(snake[i].x + 1, snake[i].y + 1, box - 2, box - 2);
    }
  }
}
function checkGameOver() {
  if (
    snake[0].x < 0 ||
    snake[0].y < 0 ||
    snake[0].x >= canvasWidth ||
    snake[0].y >= canvasHeight
  ) {
    isPlayGame = false;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      isPlayGame = false;
    }
  }
}
function displayGameOver() {
  ctx.font = "60px 'Rubik Wet Paint', cursive";
  ctx.fillStyle = 'red';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', canvasWidth / 2, canvasHeight / 2);
  ctx.fillStyle = 'white';
  ctx.fillText(`Your Score: ${score}`, canvasWidth / 2, 350);
  setLocalStorage();
  clearInterval(game);
}
function resetGame() {
  score = 0;
  snake = [{ x: 10 * box, y: 10 * box }];
  dir = null;
  while (tableBody.firstChild) {
    tableBody.firstChild.remove();
  }
  clearInterval(game);
  createFood();
  gameStart();
}
function setLocalStorage() {
  localStorageItem = [score];
  if (localStorage.getItem('score')) {
    localStorageItem = JSON.parse(localStorage.getItem('score'));
    if (localStorageItem.length >= 10) {
      localStorage.removeItem('score');
    }
    localStorageItem.push(score);
    localStorage.setItem('score', JSON.stringify(localStorageItem));
  } else {
    localStorage.setItem('score', JSON.stringify(localStorageItem));
  }
  while (tableBody.firstChild) {
    tableBody.firstChild.remove();
  }
  createTableScore(localStorageItem);
}
function createTableScore(arr) {
  let gameNumber = '';
  let score = 0;
  for (let i = 0; i < arr.length; i++) {
    score = arr[i];
    switch (i) {
      case 0:
        gameNumber = 'First Game';
        break;
      case 1:
        gameNumber = 'Second Game';
        break;
      case 2:
        gameNumber = 'Third Game';
        break;
      case 3:
        gameNumber = 'Fourth Game';
        break;
      case 4:
        gameNumber = 'Fifth Game';
        break;
      case 5:
        gameNumber = 'Sixth Game';
        break;
      case 6:
        gameNumber = 'Seventh Game';
        break;
      case 7:
        gameNumber = 'Eighth Game';
        break;
      case 8:
        gameNumber = 'Ninth Game';
        break;
      case 9:
        gameNumber = 'Tenth Game';
        break;
    }
    let tableRow = document.createElement('tr');
    let tableRowGameNumber = document.createElement('th');
    tableRowGameNumber.classList.add('score-header');
    let tableRowScore = document.createElement('td');
    tableRowScore.classList.add('score-td');
    tableRowGameNumber.textContent = gameNumber;
    tableRowScore.textContent = score;
    tableRow.append(tableRowGameNumber, tableRowScore);
    tableBody.append(tableRow);
  }
}
console.log(`- [ ] 1. Вёрстка +10
1.1 реализован интерфейс игры +5
1.2 в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, [логотип курса](https://rs.school/images/rs_school_js.svg) со [ссылкой на курс](https://rs.school/js-stage0/) +5
- [ ] 2. Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам +10
- [ ] 3. Реализовано завершение игры при достижении игровой цели +10
- [ ] 4. По окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д +10
- [ ] 5. Есть таблица результатов, в которой сохраняются результаты 10 игр с наибольшим счетом (лучшим временем и т.п.) или просто 10 последних игр (хранится в local storage) +10
- [ ] 6. Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10
- [ ] 7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
7.1  высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
`);
