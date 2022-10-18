let canvasSize = 640;
let coffee = '#4B3619';

let numberOfCellsEachSide = 8;
let blackPawn, blackRook, blackKnight, blackBishop, blackKing, blackQueen;
let whitePawn, whiteRook, whiteKnight, whiteBishop, whiteKing, whiteQueen;
let blackPawnImg, blackRookImg, blackKnightImg, blackBishopImg, blackKingImg, blackQueenImg;
let whitePawnImg, whiteRookImg, whiteKnightImg, whiteBishopImg, whiteKingImg, whiteQueenImg;
let piecesSize = 435;
let blackChecked, whiteChecked;
let pieceMoveable;

function preload() {
  blackPawnImg = loadImage('blackPawn.png');
  blackRookImg = loadImage('blackRook.png');
  blackKnightImg = loadImage('blackKnight.png');
  blackBishopImg = loadImage('blackBishop.png');
  blackKingImg = loadImage('blackKing.png');
  blackQueenImg = loadImage('blackQueen.png');
}



function setup() {
  createCanvas(canvasSize, canvasSize);
}

function draw() {
  background(220);
  drawChessboard();

  image(blackPawnImg, canvasSize - 40, canvasSize, piecesSize, piecesSize);
}

function drawChessboard() {
  let cellSideLength = canvasSize / numberOfCellsEachSide;
  let isWhite = true;

  for (let i = 0; i < numberOfCellsEachSide; i++) {
    for (let j = 0; j < numberOfCellsEachSide; j++) {
      isWhite === true ? fill("white") : fill(coffee);

      noStroke();
      rect(i*cellSideLength, j*cellSideLength, cellSideLength, cellSideLength);

      isWhite = !isWhite;
    }

    isWhite = !isWhite;
  }    
}

function windoResized() {
  setup();
}
