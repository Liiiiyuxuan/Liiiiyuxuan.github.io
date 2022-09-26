// Square Aroung Edge
// Eason Li
// Sept 26, 2022

let lengthOfSquare = 50;
let xCoordinate = 0;
let yCoordinate = 0;
let speed = 10;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawSquare(lengthOfSquare);
}

function drawSquare (squareSize) {
  fill("black");
  square(xCoordinate, yCoordinate, squareSize);
  // adjustSquare(squareSize)
  moveSquare(squareSize);
}

function moveSquare (squareSize) {
  if (xCoordinate < windowWidth - squareSize && yCoordinate <= 0) {
    adjustSquare(squareSize);
    xCoordinate += speed;
  }

  else if (yCoordinate < windowHeight - squareSize && xCoordinate >= squareSize) {
    adjustSquare(squareSize);
    yCoordinate += speed;
  }

  else if (xCoordinate > 0 && yCoordinate >= windowHeight - squareSize) {
    adjustSquare(squareSize);
    xCoordinate -= speed;
  }

  else if (yCoordinate > 0 && xCoordinate <= squareSize) {
    adjustSquare(squareSize);
    yCoordinate -= speed;
  }

}

function  adjustSquare(squareSize) {
  if (xCoordinate > windowWidth - squareSize) {
    xCoordinate = windowWidth - squareSize;
  }

  if (xCoordinate < 0) {
    xCoordinate = 0;
  }

  if (yCoordinate > windowHeight - squareSize) {
    yCoordinate = windowHeight - squareSize;
  }

  if (yCoordinate < 0) {
    yCoordinate = 0;
  }
}