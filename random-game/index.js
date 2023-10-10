'use strict';

const canvas = document.getElementById('game-ground');
const ctx = canvas.getContext('2d');
const canvasWidth = (canvas.width = 500);
const canvasHeight = (canvas.height = 500);
let cells = 20;
let snake;
let score = 0;
let foods = [
  './img/strawberry-food.png',
  './img/cherry-food.png',
  './img/apple-food.png',
];
const foodImg = new Image();
foodImg.src = foods[Math.floor(Math.random() * 3)]
const box = canvasWidth / cells;
let food = {
  x: Math.floor(Math.random() * cells) * box,
  y: Math.floor(Math.random() * cells) * box,
};
console.log(food);

function drawGround() {
  ctx.lineWidth = 1.1;
  ctx.strokeStyle = '#7CF314';
  for (let i = 1; i < cells; i++) {
    let f = (canvasWidth / cells) * i;
    console.log(f);
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
drawGround()
setInterval(() => ctx.drawImage(foodImg, food.x, food.y), 500);
