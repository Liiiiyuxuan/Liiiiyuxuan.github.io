let canvasSize = 640;
let coffee = '#4B3619';
let lightgray = 'lightgray'

let numberOfCellsEachSide = 8;

let blackPawn1, blackPawn2, blackPawn3,   blackPawn4,   blackPawn5,   blackPawn6,   blackPawn7, blackPawn8;
let whitePawn1, whitePawn2, whitePawn3,   whitePawn4,   whitePawn5,   whitePawn6,   whitePawn7, whitePawn8;
let blackRook1, blackRook2, blackKnight1, blackKnight2, blackBishop1, blackBishop2, blackKing,  blackQueen;
let whiteRook1, whiteRook2, whiteKnight1, whiteKnight2, whiteBishop1, whiteBishop2, whiteKing,  whiteQueen;

let blackPawnImg, blackRookImg, blackKnightImg, blackBishopImg, blackKingImg, blackQueenImg;
let whitePawnImg, whiteRookImg, whiteKnightImg, whiteBishopImg, whiteKingImg, whiteQueenImg;

let pawnWidth = 75;
let pawnHeight = 100;
let rookWidth = 75;
let rookHeight = 88;
let knightWidth = 72;
let knightHeight = 88;
let bishopWidth = 71;
let bishopHeight = 81;

let blackChecked, whiteChecked;
let pieceMoveable;

function preload() {
  blackPawnImg = loadImage('blackPawn.png');
  blackRookImg = loadImage('blackRook.png');
  blackKnightImg = loadImage('blackKnight.png');
  blackBishopImg = loadImage('blackBishop.png');
  blackKingImg = loadImage('blackKing.png');
  blackQueenImg = loadImage('blackQueen.png');

  whitePawnImg = loadImage('whitePawn.png');
  whiteRookImg = loadImage('whiteRook.png');
  whiteKnightImg = loadImage('whiteKnight.png');
  whiteBishopImg = loadImage('whiteBishop.png');
  whiteKingImg = loadImage('whiteKing.png');
  whiteQueenImg = loadImage('whiteQueen.png');
}



function setup() {
  createCanvas(canvasSize, canvasSize);
}

function draw() {
  background(220);
  drawChessboard();

  // white pawn
  whitePawn1 = image(whitePawnImg, canvasSize / 8 * 0, canvasSize / 2 + 2 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  whitePawn2 = image(whitePawnImg, canvasSize / 8 * 1, canvasSize / 2 + 2 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  whitePawn3 = image(whitePawnImg, canvasSize / 8 * 2, canvasSize / 2 + 2 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  whitePawn4 = image(whitePawnImg, canvasSize / 8 * 3, canvasSize / 2 + 2 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  whitePawn5 = image(whitePawnImg, canvasSize / 8 * 4, canvasSize / 2 + 2 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  whitePawn6 = image(whitePawnImg, canvasSize / 8 * 5, canvasSize / 2 + 2 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  whitePawn7 = image(whitePawnImg, canvasSize / 8 * 6, canvasSize / 2 + 2 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  whitePawn8 = image(whitePawnImg, canvasSize / 8 * 7, canvasSize / 2 + 2 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);

  whiteRook1 = image(whiteRookImg,   canvasSize / 8 * 0, canvasSize / 2 + 3 * canvasSize / numberOfCellsEachSide, rookWidth, rookHeight);
  image(whiteKnightImg, canvasSize / 8 * 1, canvasSize / 2 + 3 * canvasSize / numberOfCellsEachSide, knightWidth, knightHeight);
  image(whiteBishopImg, canvasSize / 8 * 2, canvasSize / 2 + 3 * canvasSize / numberOfCellsEachSide, bishopWidth, bishopHeight);
  image(whiteQueenImg,  canvasSize / 8 * 3, canvasSize / 2 + 3 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  image(whiteKingImg,   canvasSize / 8 * 4, canvasSize / 2 + 3 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  image(whiteBishopImg, canvasSize / 8 * 5, canvasSize / 2 + 3 * canvasSize / numberOfCellsEachSide, bishopWidth, bishopHeight);
  image(whiteKnightImg, canvasSize / 8 * 6, canvasSize / 2 + 3 * canvasSize / numberOfCellsEachSide, knightWidth, knightHeight);
  image(whiteRookImg,   canvasSize / 8 * 7, canvasSize / 2 + 3 * canvasSize / numberOfCellsEachSide, rookWidth, rookHeight);

  // black pawn
  blackPawn1 = image(blackPawnImg, canvasSize / 8 * 0, canvasSize / 2 - 3 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  blackPawn2 = image(blackPawnImg, canvasSize / 8 * 1, canvasSize / 2 - 3 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  blackPawn3 = image(blackPawnImg, canvasSize / 8 * 2, canvasSize / 2 - 3 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  blackPawn4 = image(blackPawnImg, canvasSize / 8 * 3, canvasSize / 2 - 3 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  blackPawn5 = image(blackPawnImg, canvasSize / 8 * 4, canvasSize / 2 - 3 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  blackPawn6 = image(blackPawnImg, canvasSize / 8 * 5, canvasSize / 2 - 3 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  blackPawn7 = image(blackPawnImg, canvasSize / 8 * 6, canvasSize / 2 - 3 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  blackPawn8 = image(blackPawnImg, canvasSize / 8 * 7, canvasSize / 2 - 3 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);

  image(blackRookImg,   canvasSize / 8 * 0, canvasSize / 2 - 4 * canvasSize / numberOfCellsEachSide, rookWidth, rookHeight);
  image(blackKnightImg, canvasSize / 8 * 1, canvasSize / 2 - 4 * canvasSize / numberOfCellsEachSide, knightWidth, knightHeight);
  image(blackBishopImg, canvasSize / 8 * 2, canvasSize / 2 - 4 * canvasSize / numberOfCellsEachSide, bishopWidth, bishopHeight);
  image(blackQueenImg,  canvasSize / 8 * 3, canvasSize / 2 - 4 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  image(blackKingImg,   canvasSize / 8 * 4, canvasSize / 2 - 4 * canvasSize / numberOfCellsEachSide, pawnWidth, pawnHeight);
  image(blackBishopImg, canvasSize / 8 * 5, canvasSize / 2 - 4 * canvasSize / numberOfCellsEachSide, bishopWidth, bishopHeight);
  image(blackKnightImg, canvasSize / 8 * 6, canvasSize / 2 - 4 * canvasSize / numberOfCellsEachSide, knightWidth, knightHeight);
  image(blackRookImg,   canvasSize / 8 * 7, canvasSize / 2 - 4 * canvasSize / numberOfCellsEachSide, rookWidth, rookHeight);

}

function drawChessboard() {
  let cellSideLength = canvasSize / numberOfCellsEachSide;
  let isWhite = true;

  for (let i = 0; i < numberOfCellsEachSide; i++) {
    for (let j = 0; j < numberOfCellsEachSide; j++) {
      isWhite === true ? fill(lightgray) : fill(coffee);

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
