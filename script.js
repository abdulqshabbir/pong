const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const CANVAS_HEIGHT = 300;
const CANVAS_WIDTH = 400;
const SCREEN_EDGE = 100;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_RADIUS = 8;

/*
window.addEventListener('mousemove', function(e) {
  console.log('mouse x: ', e.x, 'mouse y: ', e.y);

}); */

drawObjects();

function drawObjects() {
  //draw pong background
  drawRectangle(SCREEN_EDGE, SCREEN_EDGE, CANVAS_WIDTH,
    CANVAS_HEIGHT, 'black');

  //draw left paddle
  drawRectangle(SCREEN_EDGE, SCREEN_EDGE + CANVAS_HEIGHT/2 - PADDLE_HEIGHT/2,
    PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

  //draw right paddle
  drawRectangle(SCREEN_EDGE + CANVAS_WIDTH - PADDLE_WIDTH,
      SCREEN_EDGE + CANVAS_HEIGHT/2 - PADDLE_HEIGHT/2,
      PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

  drawBall(SCREEN_EDGE + (CANVAS_WIDTH/2),
    SCREEN_EDGE + CANVAS_HEIGHT/2, BALL_RADIUS);

}

function drawBall(xPos, yPos, radius) {
  context.beginPath();
  context.arc(xPos, yPos, radius, 0, 2*Math.PI);
  context.fill();
  context.fillStyle = 'white';

}


function drawRectangle(xPos, yPos, width, height, color) {
  context.fillStyle = color;
  context.fillRect(xPos, yPos, width, height, color);
}
