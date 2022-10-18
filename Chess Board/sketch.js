let numberOfCellsEachSide = 8;
let blackPawn, blackRook, blackKnight, blackBishop, blackKing, blackQueen;
let whitePawn, whiteRook, whiteKnight, whiteBishop, whiteKing, whiteQueen;
let blackPawnImg, blackRookImg, blackKnightImg, blackBishopImg, blackKingImg, blackQueenImg;
let whitePawnImg, whiteRookImg, whiteKnightImg, whiteBishopImg, whiteKingImg, whiteQueenImg;
let blackChecked, whiteChecked;
let pieceMoveable;

function setup() {
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
}

function draw() {
  background(220);
  drawChessboard();
}

function preload() {
  let blackPawn = loadImage('blackPawn.png');
}

function drawChessboard() {
  let cellSideLength = min(windowWidth, windowHeight) / numberOfCellsEachSide;
  let isWhite = true;

  for (let i = 0; i < numberOfCellsEachSide; i++) {
    for (let j = 0; j < numberOfCellsEachSide; j++) {
      isWhite === true ? fill("white") : fill("black");

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
