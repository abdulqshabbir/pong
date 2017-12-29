//-------------------- Global Variables ---------------------------//

const CANVAS_HEIGHT = 300;
const CANVAS_WIDTH = 400;
const SCREEN_EDGE = 100;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_RADIUS = 8;
const FRAMES_PER_SECOND = 35;

//--------------------- Game Objects ------------------------------//

window.onload = function() {// wait for window to load

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

setInterval(drawObjects, 1000/FRAMES_PER_SECOND); //animate!

let ballXPosition = SCREEN_EDGE + CANVAS_WIDTH/2;
let ballYPosition = SCREEN_EDGE + CANVAS_HEIGHT/2;
let ballXVelocity = 5;
let ballYVelocity = 3;

let leftPaddlePosition = 0;
let rightPaddlePosition = 0;


function drawObjects() {
  ballXPosition = ballXPosition + ballXVelocity;
  ballYPosition = ballYPosition + ballYVelocity;
  context.clearRect(SCREEN_EDGE, SCREEN_EDGE, 600, 500);

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

  updateBall();

}

function updateBall() {
    if(ballXPosition >= SCREEN_EDGE + CANVAS_WIDTH) { //right edge
      ballXVelocity = -ballXVelocity;
    }
    else if (ballYPosition >= SCREEN_EDGE + CANVAS_HEIGHT) {//bottom edge
      ballYVelocity = -ballYVelocity;
    }
    else if (ballXPosition <= SCREEN_EDGE) {//left edge
      ballXVelocity = -ballXVelocity;
    }
    else if (ballYPosition <= SCREEN_EDGE) {
      ballYVelocity = -ballYVelocity; 
    }
    drawBall(ballXPosition, ballYPosition, 10);
}

function drawBall(xPos, yPos, radius) {
  context.beginPath();
  context.arc(xPos, yPos, radius, 0, 2*Math.PI);
  context.fill();
  context.fillStyle = 'blue';

}

function drawRectangle(xPos, yPos, width, height, color) {
  context.fillStyle = color;
  context.fillRect(xPos, yPos, width, height, color);
}

};
