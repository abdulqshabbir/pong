'use strict';
//-------------------- Global Variables ---------------------------//

const CANVAS_HEIGHT = 300;
const CANVAS_WIDTH = 400;
//SCREEN_EDGE is how the top-left corner of the canvas is from the viewport
const SCREEN_EDGE = 100;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 70;
const BALL_RADIUS = 7;
const FRAMES_PER_SECOND = 35;
let mouseX = 0;
let mouseY = 0;
let ballXPosition = SCREEN_EDGE + CANVAS_WIDTH/2;//center vertically
let ballYPosition = SCREEN_EDGE + CANVAS_HEIGHT/2;//center horizontally
let ballXVelocity = 8;
let ballYVelocity = 5;
let rightPaddleCenter = SCREEN_EDGE + CANVAS_HEIGHT/2;
let throwBallInPlayersDirection = true;
let numberOfRallies = 0; //used to keep track of how fast to move ball

window.onload = function() {// wait for window to load

// --------------------Event Listeners ---------------------------//

//move player paddle on mouse move
window.addEventListener('mousemove', (event) => {
  mouseX = event.x;
  mouseY = event.y;
  movePlayerPaddle(mouseX, mouseY);
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

  movePlayerPaddle(mouseX, mouseY);
  moveComputerPaddle();
  moveBall();
}

function movePlayerPaddle(mouseX, mouseY) {
  let leftPaddlePosition = mouseY;

  if(leftPaddlePosition <= SCREEN_EDGE + PADDLE_HEIGHT/2) {
    //if mouse leaves canvas from top, fix left paddle to top of canvas
    drawRectangle(SCREEN_EDGE, SCREEN_EDGE, PADDLE_WIDTH,
      PADDLE_HEIGHT, 'white');
  }
  else if(leftPaddlePosition >= SCREEN_EDGE + CANVAS_HEIGHT
    - PADDLE_HEIGHT/2) {
    //if mouse leaves canvas from bottom, fix left paddle to bottom of canvas
    drawRectangle(SCREEN_EDGE, SCREEN_EDGE + CANVAS_HEIGHT -
      PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
  }
  else{
    //move paddle normally
    drawRectangle(SCREEN_EDGE, mouseY - PADDLE_HEIGHT/2,
      PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
  }
}

function moveComputerPaddle() {
  let distanceBetweenPaddleAndBall = rightPaddleCenter - ballYPosition;
  let ballIsABovePaddle = true;

  if(ballYPosition >= rightPaddleCenter) {
    ballIsABovePaddle = false;
  }

  if(Math.abs(distanceBetweenPaddleAndBall) >= 20
          && ballIsABovePaddle) {
            rightPaddleCenter -= 10;
  }
  else if (Math.abs(distanceBetweenPaddleAndBall) >= 20
          && !ballIsABovePaddle) {
            rightPaddleCenter += 10;
  }
  //draw right paddle after its positions is updated

  drawRectangle(SCREEN_EDGE + CANVAS_WIDTH - PADDLE_WIDTH,
      rightPaddleCenter - PADDLE_HEIGHT/2, PADDLE_WIDTH,
      PADDLE_HEIGHT, 'white');
}

function moveBall() {
  ballXPosition = ballXPosition + ballXVelocity;
  ballYPosition = ballYPosition + ballYVelocity;
  let topOfLeftPaddle = mouseY - PADDLE_HEIGHT/2;
  let bottomOfLeftPaddle = mouseY + PADDLE_HEIGHT/2;
  let topOfRightPaddle = rightPaddleCenter - PADDLE_HEIGHT/2;
  let bottomOfRightPaddle = rightPaddleCenter + PADDLE_HEIGHT/2;

  if(ballXPosition >= SCREEN_EDGE + CANVAS_WIDTH) { //right edge
    if(ballYPosition >= topOfRightPaddle &&
        ballYPosition <= bottomOfRightPaddle) {
          //ball hits computer paddle!
          ballXVelocity = -ballXVelocity;
          numberOfRallies++;
          console.log(numberOfRallies);
        }
    else {
      //ball misses computer paddle!
      resetBall();
    }
  }
  if (ballXPosition <= SCREEN_EDGE) {//left edge
    if(ballYPosition >= topOfLeftPaddle && ballYPosition <= bottomOfLeftPaddle) {
      //ball hits player paddle!
      ballXVelocity = -ballXVelocity;
      numberOfRallies;
      console.log(numberOfRallies);
    }
    else {
      //ball misses player paddle!
      resetBall();
    }
  }
  if (ballYPosition >= SCREEN_EDGE + CANVAS_HEIGHT) {
    //bounce off of bottom edge
    ballYVelocity = -ballYVelocity;
  }
  if (ballYPosition <= SCREEN_EDGE) {
    //bounce off of top edge
    ballYVelocity = -ballYVelocity;
  }

  if(numberOfRallies >= 3) {//make game harder for both players
    numberOfRallies = 0;
    makeBallMoveFaster();
  }

  //draw ball
  drawBall(ballXPosition, ballYPosition, BALL_RADIUS);
}

function resetBall() {
  //change direction in which ball initially goes after reset
  throwBallInPlayersDirection = !throwBallInPlayersDirection;

  ballXPosition = SCREEN_EDGE + CANVAS_WIDTH/2;
  ballYPosition = SCREEN_EDGE + CANVAS_HEIGHT/2;

  if(throwBallInPlayersDirection === true) {
    ballXVelocity = -8
  }
  else {
    ballXVelocity = 8;
  }
  ballYVelocity = 5;
  //This variable is how the top-left corner
}

function makeBallMoveFaster() {

  if(ballYVelocity >= 0) {
    ballYVelocity += 1;
    console.log('ballYVelocity: ', Math.abs(ballYVelocity));
  }
  else if(ballYVelocity < 0) {
    ballYVelocity -= 1;
    console.log('ballYVelocity: ', Math.abs(ballYVelocity));
  }
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


/*
Computer Paddle:
1.  Set up setInterval function
2.  If abs(center of paddle - position of ball y) >= 40
        lower paddle until is in range
3.  else if abs(center of paddle -  ballYPosition)<=40
        leave paddle

center of paddle =

*/
