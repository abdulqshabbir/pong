'use strict';
//-------------------- Global Variables ---------------------------//

const displayPlayerScore = document.getElementById('playerScore');
const displayComputerScore = document.getElementById('computerScore');
let playerScore = 0;
let computerScore = 0;

window.onload = function() {// wait for window to load

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const CANVAS_TOP = canvas.getBoundingClientRect().top;
const CANVAS_BOTTOM = canvas.getBoundingClientRect().bottom;
const CANVAS_LEFT = canvas.getBoundingClientRect().left;
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const SCREEN_EDGE = 0;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 70;
const BALL_RADIUS = 7;
const FRAMES_PER_SECOND = 35;
let mouseX = 0;
let mouseY = 0;
let ballXPosition = CANVAS_TOP + CANVAS_WIDTH/2;//center vertically
let ballYPosition = CANVAS_LEFT + CANVAS_HEIGHT/2;//center horizontally
let ballXVelocity = 8;
let ballYVelocity = 5;
let rightPaddleCenter = CANVAS_TOP + CANVAS_HEIGHT/2;
let throwBallInPlayersDirection = true;
let numberOfRallies = 0; //used to keep track of how fast to move ball
//move player paddle on mouse move

// --------------------Event Listeners ---------------------------//

window.addEventListener('mousemove', (event) => {
  mouseX = event.x;
  mouseY = event.y;
  movePlayerPaddle(mouseX, mouseY);
});

//--------------------- Game Logic ------------------------------//

setInterval(drawObjects, 1000/FRAMES_PER_SECOND); //animate!

function drawObjects() {
  //clear existing canvas
  context.clearRect(CANVAS_LEFT, CANVAS_TOP, CANVAS_WIDTH, CANVAS_HEIGHT);
  //draw pong background
  drawRectangle(CANVAS_LEFT, CANVAS_TOP, CANVAS_WIDTH,
    CANVAS_HEIGHT, 'black');

  movePlayerPaddle(mouseX, mouseY);
  moveComputerPaddle();
  moveBall();
}

function movePlayerPaddle(mouseX, mouseY) {
  let centerOfLeftPaddle = mouseY;
  let topOfLeftPaddle = mouseY - PADDLE_HEIGHT/2;
  let bottomOfLeftPaddle = mouseY + PADDLE_HEIGHT/2;

  if(topOfLeftPaddle <= CANVAS_TOP) {
    //if mouse leaves canvas from top, fix left paddle to top of canvas
    drawRectangle(CANVAS_LEFT, CANVAS_TOP, PADDLE_WIDTH,
      PADDLE_HEIGHT, 'white');
  }
  else if(bottomOfLeftPaddle >= CANVAS_BOTTOM) {
    //if mouse leaves canvas from bottom, fix left paddle to bottom of canvas
    drawRectangle(CANVAS_LEFT, CANVAS_TOP + CANVAS_HEIGHT -
      PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
  }
  else{
    //move paddle normally
    drawRectangle(CANVAS_LEFT, mouseY - CANVAS_TOP - PADDLE_HEIGHT/2,
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

  drawRectangle(CANVAS_LEFT + CANVAS_WIDTH - PADDLE_WIDTH,
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

  if(ballXPosition >= CANVAS_LEFT + CANVAS_WIDTH) { //right edge
    if(ballYPosition >= topOfRightPaddle &&
        ballYPosition <= bottomOfRightPaddle) {
          //ball hits computer paddle!
          ballXVelocity = -ballXVelocity;
          numberOfRallies++;
        }
    else {
      //ball misses computer paddle!
      resetBall();
      updateScore('player');
    }
  }
  if (ballXPosition <= CANVAS_LEFT) {//left edge
    if(ballYPosition >= topOfLeftPaddle && ballYPosition <= bottomOfLeftPaddle) {
      //ball hits player paddle!
      ballXVelocity = -ballXVelocity;
      numberOfRallies++;
      let deltaY = ballYPosition - (topOfLeftPaddle + PADDLE_HEIGHT/2);
      ballYVelocity = deltaY*0.35;
      console.log(ballYVelocity);
    }
    else {
      //ball misses player paddle!
      resetBall();
      updateScore('computer');
    }
  }
  if (ballYPosition >= CANVAS_TOP + CANVAS_HEIGHT) {
    //bounce off of bottom edge
    ballYVelocity = -ballYVelocity;
  }
  if (ballYPosition <= CANVAS_TOP) {
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
    ballXVelocity = -8;
  }
  else {
    ballXVelocity = 8;
  }
  ballYVelocity = 5;
  //This variable is how the top-left corner
}

function updateScore(roundWinner) {
  if(roundWinner === 'player') {
    updateDisplay('player');
  }
  else if(roundWinner === 'computer') {
    updateDisplay('computer');
  }
}

function updateDisplay(winner) {
  if(playerScore >= 9 || computerScore >= 9) {
    displayGameOver();
  }
  if(winner === 'player') {
    playerScore++;
    let tempStoragePlayer = displayPlayerScore.innerHTML.split('');
    tempStoragePlayer = tempStoragePlayer.splice(0, tempStoragePlayer.length - 1);
    tempStoragePlayer.push(playerScore);
    let textToDisplay = tempStoragePlayer.join('');
    displayPlayerScore.innerHTML = textToDisplay;
  }
  else if (winner === 'computer') {
    computerScore++;
    let tempStorageComputer = displayComputerScore.innerHTML.split('');
    tempStorageComputer = tempStorageComputer.splice(0, tempStorageComputer.length - 1);
    tempStorageComputer.push(' ', computerScore);
    let textToDisplay = tempStorageComputer.join('');
    displayComputerScore.innerHTML = textToDisplay;
  }
}

function makeBallMoveFaster() {

  if(ballXVelocity >= 0) {
    ballXVelocity += 1;
  }
  else if(ballXVelocity < 0) {
    ballXVelocity -= 1;
  }
}

function displayGameOver() {
  displayPlayerScore.remove();
  displayComputerScore.remove();
  canvas.remove();
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
