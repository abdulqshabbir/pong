//-------------------- Global Variables ---------------------------//

const CANVAS_HEIGHT = 300;
const CANVAS_WIDTH = 400;
const SCREEN_EDGE = 100;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 70;
const BALL_RADIUS = 7;
const FRAMES_PER_SECOND = 35;
let mouseX = 0;
let mouseY = 0;
let ballXPosition = SCREEN_EDGE + CANVAS_WIDTH/2;
let ballYPosition = SCREEN_EDGE + CANVAS_HEIGHT/2;
let ballXVelocity = 8;
let ballYVelocity = 5;

window.onload = function() {// wait for window to load

// --------------------Event Listeners ---------------------------//

//move player paddle on mouse moves
window.addEventListener('mousemove', (event) => {
  mouseX = event.x;
  mouseY = event.y;
  movePaddles(mouseX, mouseY);
});

//--------------------- Game Logic ------------------------------//
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

setInterval(drawObjects, 1000/FRAMES_PER_SECOND); //animate!

function drawObjects() {
  //clear existing canvas
  context.clearRect(SCREEN_EDGE, SCREEN_EDGE, 600, 500);
  //draw pong background
  drawRectangle(SCREEN_EDGE, SCREEN_EDGE, CANVAS_WIDTH,
    CANVAS_HEIGHT, 'black');

  movePaddles(mouseX, mouseY);
  moveBall();
}

function movePaddles(mouseX, mouseY) {
  let leftPaddlePosition = mouseY;

  if(leftPaddlePosition <= SCREEN_EDGE + PADDLE_HEIGHT/2) {
    //fix left paddle to top of canvas
    drawRectangle(SCREEN_EDGE, SCREEN_EDGE, PADDLE_WIDTH,
      PADDLE_HEIGHT, 'white');
  }
  else if(leftPaddlePosition >= SCREEN_EDGE + CANVAS_HEIGHT
    - PADDLE_HEIGHT/2) {
    //fix left paddle to bottom of canvas
    drawRectangle(SCREEN_EDGE, SCREEN_EDGE + CANVAS_HEIGHT -
      PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
  }
  else{
    //move paddle normally
    drawRectangle(SCREEN_EDGE, mouseY - PADDLE_HEIGHT/2,
      PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
  }

  //draw right paddle
  drawRectangle(SCREEN_EDGE + CANVAS_WIDTH - PADDLE_WIDTH,
      SCREEN_EDGE + CANVAS_HEIGHT/2 - PADDLE_HEIGHT/2,
      PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
}

function moveBall() {
  ballXPosition = ballXPosition + ballXVelocity;
  ballYPosition = ballYPosition + ballYVelocity;
  let topOfLeftPaddle = mouseY - PADDLE_HEIGHT/2;
  let bottomOfLeftPaddle = mouseY + PADDLE_HEIGHT/2;

  if(ballXPosition >= SCREEN_EDGE + CANVAS_WIDTH) { //right edge
    ballXVelocity = -ballXVelocity;
  }
  else if (ballXPosition <= SCREEN_EDGE) {//left edge
    if(ballYPosition >= topOfLeftPaddle && ballYPosition <= bottomOfLeftPaddle) {
      ballXVelocity = -ballXVelocity;
    }
    else {
      resetBall();
    }
  }
  else if (ballYPosition >= SCREEN_EDGE + CANVAS_HEIGHT) {//bottom edge
    ballYVelocity = -ballYVelocity;
  }
  else if (ballYPosition <= SCREEN_EDGE) {//top edge
    ballYVelocity = -ballYVelocity;
  }

  //draw ball
  drawBall(ballXPosition, ballYPosition, BALL_RADIUS);
}

function resetBall() {
  ballXPosition = SCREEN_EDGE + CANVAS_WIDTH/2;
  ballYPosition = SCREEN_EDGE + CANVAS_HEIGHT/2;
  ballXVelocity = 5;
  ballYVelocity = 3;
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
