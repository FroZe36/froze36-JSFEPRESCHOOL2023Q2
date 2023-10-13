'use strict';

const canvas = document.getElementById('game-ground');
const ctx = canvas.getContext('2d');
const canvasWidth = (canvas.width = 500);
const canvasHeight = (canvas.height = 500);
const resetbtn = document.querySelector('.btn-reset');
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
  }, 100);
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
  ctx.font = "65px 'Rubik Wet Paint', cursive";
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText('Game is over', canvasWidth / 2, canvasHeight / 2);
  clearInterval(game);
}
function resetGame() {
  score = 0;
  snake = [{ x: 10 * box, y: 10 * box }];
  dir = null;
  clearInterval(game);
  createFood();
  gameStart();
}
