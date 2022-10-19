let chessboardSize = 800;
let columns = 8;
let rows = 8;
let counter = 0;

let colourList = ["white", "black"];
let numberList = ['8', '7', '6', '5', '4', '3', '2', '1'];
let letterList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

let theBoard = [
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '']
];

let whitePawnImg, whiteRookImg, whiteKnightImg, whiteBishopImg, whiteQueenImg, whiteKingImg;
let blackPawnImg, blackRookImg, blackKnightImg, blackBishopImg, blackQueenImg, blackKingImg;

function preload() {
  whitePawnImg = loadImage('white.pawn.png');
}

function setup() {
  createCanvas(chessboardSize, chessboardSize);
}

function draw() {
  drawChessboard();
  designateCoordinates();
  image(whitePawnImg, 400, 400, 100, 100);
}

function drawChessboard() {
  for (let i = 0; i <= 8; i++) {
    for (let j = 0; j <= 8; j++) {
      fill(colourList[counter]);
      rect(i*chessboardSize/rows, j*chessboardSize/columns, chessboardSize/rows, chessboardSize/columns);
      
      if (counter === 0) {
        counter ++;
      } else if (counter === 1) {
        counter --;
      }
    }
  }
  counter--;
}

function designateCoordinates() {
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
      property = {
        x: letterList[j],
        y: numberList[i],
      }
      theBoard[i][j] = property;
    }
  }
}

function setUpPieces() {

}