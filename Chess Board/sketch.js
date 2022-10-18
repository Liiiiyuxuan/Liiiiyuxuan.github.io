let canvasSize = 640;
let coffee = '#4B3619';
let lightgray = 'lightgray';

let theBoard = [
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '']
]

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

// the comments below are the coordinates for each pieces
let whitePawn1X = canvasSize / 8 * 0;
let whitePawn2X = canvasSize / 8 * 1;
let whitePawn3X = canvasSize / 8 * 2;
let whitePawn4X = canvasSize / 8 * 3;
let whitePawn5X = canvasSize / 8 * 4;
let whitePawn6X = canvasSize / 8 * 5;
let whitePawn7X = canvasSize / 8 * 6;
let whitePawn8X = canvasSize / 8 * 7;

let whitePawn1Y = canvasSize / 2 + 2 * canvasSize / numberOfCellsEachSide;
let whitePawn2Y = canvasSize / 2 + 2 * canvasSize / numberOfCellsEachSide;
let whitePawn3Y = canvasSize / 2 + 2 * canvasSize / numberOfCellsEachSide;
let whitePawn4Y = canvasSize / 2 + 2 * canvasSize / numberOfCellsEachSide;
let whitePawn5Y = canvasSize / 2 + 2 * canvasSize / numberOfCellsEachSide;
let whitePawn6Y = canvasSize / 2 + 2 * canvasSize / numberOfCellsEachSide;
let whitePawn7Y = canvasSize / 2 + 2 * canvasSize / numberOfCellsEachSide;
let whitePawn8Y = canvasSize / 2 + 2 * canvasSize / numberOfCellsEachSide;

let whiteRook1X   = canvasSize / 8 * 0;
let whiteKnight1X = canvasSize / 8 * 1;
let whiteBishop1X = canvasSize / 8 * 2;
let whiteQueenX   = canvasSize / 8 * 3;
let whiteKingX    = canvasSize / 8 * 4;
let whiteBishop2X = canvasSize / 8 * 5;
let whiteKnight2X = canvasSize / 8 * 6;
let whiteRook2X   = canvasSize / 8 * 7;

let whiteRook1Y   = canvasSize / 2 + 3 * canvasSize / numberOfCellsEachSide;
let whiteKnight1Y = canvasSize / 2 + 3 * canvasSize / numberOfCellsEachSide;
let whiteBishop1Y = canvasSize / 2 + 3 * canvasSize / numberOfCellsEachSide;
let whiteQueenY   = canvasSize / 2 + 3 * canvasSize / numberOfCellsEachSide;
let whiteKingY    = canvasSize / 2 + 3 * canvasSize / numberOfCellsEachSide;
let whiteBishop2Y = canvasSize / 2 + 3 * canvasSize / numberOfCellsEachSide;
let whiteKnight2Y = canvasSize / 2 + 3 * canvasSize / numberOfCellsEachSide;
let whiteRook2Y   = canvasSize / 2 + 3 * canvasSize / numberOfCellsEachSide;

let blackPawn1X = canvasSize / 8 * 0;
let blackPawn2X = canvasSize / 8 * 1;
let blackPawn3X = canvasSize / 8 * 2;
let blackPawn4X = canvasSize / 8 * 3;
let blackPawn5X = canvasSize / 8 * 4;
let blackPawn6X = canvasSize / 8 * 5;
let blackPawn7X = canvasSize / 8 * 6;
let blackPawn8X = canvasSize / 8 * 7;

let blackPawn1Y = canvasSize / 2 - 3 * canvasSize / numberOfCellsEachSide;
let blackPawn2Y = canvasSize / 2 - 3 * canvasSize / numberOfCellsEachSide;
let blackPawn3Y = canvasSize / 2 - 3 * canvasSize / numberOfCellsEachSide;
let blackPawn4Y = canvasSize / 2 - 3 * canvasSize / numberOfCellsEachSide;
let blackPawn5Y = canvasSize / 2 - 3 * canvasSize / numberOfCellsEachSide;
let blackPawn6Y = canvasSize / 2 - 3 * canvasSize / numberOfCellsEachSide;
let blackPawn7Y = canvasSize / 2 - 3 * canvasSize / numberOfCellsEachSide;
let blackPawn8Y = canvasSize / 2 - 3 * canvasSize / numberOfCellsEachSide;


let blackRook1X   = canvasSize / 8 * 0;
let blackKnight1X = canvasSize / 8 * 1;
let blackBishop1X = canvasSize / 8 * 2;
let blackQueenX   = canvasSize / 8 * 3;
let blackKingX    = canvasSize / 8 * 4;
let blackBishop2X = canvasSize / 8 * 5;
let blackKnight2X = canvasSize / 8 * 6;
let blackRook2X   = canvasSize / 8 * 7;

let blackRook1Y   = canvasSize / 2 - 4 * canvasSize / numberOfCellsEachSide;
let blackKnight1Y = canvasSize / 2 - 4 * canvasSize / numberOfCellsEachSide;
let blackBishop1Y = canvasSize / 2 - 4 * canvasSize / numberOfCellsEachSide;
let blackQueenY   = canvasSize / 2 - 4 * canvasSize / numberOfCellsEachSide;
let blackKingY    = canvasSize / 2 - 4 * canvasSize / numberOfCellsEachSide;
let blackBishop2Y = canvasSize / 2 - 4 * canvasSize / numberOfCellsEachSide;
let blackKnight2Y = canvasSize / 2 - 4 * canvasSize / numberOfCellsEachSide;
let blackRook2Y   = canvasSize / 2 - 4 * canvasSize / numberOfCellsEachSide;



let blackChecked, whiteChecked;
let blackOccupied, whiteOccupied;
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
  setUpPieces();
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

function setUpPieces() {
  // white pawn
  whitePawn1 = image(whitePawnImg, whitePawn1X, whitePawn1Y, pawnWidth, pawnHeight);
  whitePawn2 = image(whitePawnImg, whitePawn2X, whitePawn2Y, pawnWidth, pawnHeight);
  whitePawn3 = image(whitePawnImg, whitePawn3X, whitePawn3Y, pawnWidth, pawnHeight);
  whitePawn4 = image(whitePawnImg, whitePawn4X, whitePawn4Y, pawnWidth, pawnHeight);
  whitePawn5 = image(whitePawnImg, whitePawn5X, whitePawn5Y, pawnWidth, pawnHeight);
  whitePawn6 = image(whitePawnImg, whitePawn6X, whitePawn6Y, pawnWidth, pawnHeight);
  whitePawn7 = image(whitePawnImg, whitePawn7X, whitePawn7Y, pawnWidth, pawnHeight);
  whitePawn8 = image(whitePawnImg, whitePawn8X, whitePawn8Y, pawnWidth, pawnHeight);
  for (let i = 0; i < numberOfCellsEachSide; i++) {
    theBoard[6][i] = 'whitePawn' + (i + 1);
  }

  image(whiteRookImg,   whiteRook1X,   whiteRook1Y,   rookWidth,   rookHeight);
  theBoard[7][0] = 'whiteRook1';
  image(whiteKnightImg, whiteKnight1X, whiteKnight1Y, knightWidth, knightHeight);
  theBoard[7][1] = 'whiteKnight1';
  image(whiteBishopImg, whiteBishop1X, whiteBishop1Y, bishopWidth, bishopHeight);
  theBoard[7][2] = 'whiteBishop1';
  image(whiteQueenImg,  whiteQueenX,   whiteQueenY,   pawnWidth,   pawnHeight);
  theBoard[7][3] = 'whiteQueen';
  image(whiteKingImg,   whiteKingX,    whiteKingY,    pawnWidth,   pawnHeight);
  theBoard[7][4] = 'whiteKing';
  image(whiteBishopImg, whiteBishop2X, whiteBishop2Y, bishopWidth, bishopHeight);
  theBoard[7][5] = 'whiteBishop2';
  image(whiteKnightImg, whiteKnight2X, whiteKnight2Y, knightWidth, knightHeight);
  theBoard[7][6] = 'whiteKnight2';
  image(whiteRookImg,   whiteRook2X,   whiteRook2Y,   rookWidth,   rookHeight);
  theBoard[7][7] = 'whiteRook2';

  // black pawn
  blackPawn1 = image(blackPawnImg, blackPawn1X, blackPawn1Y, pawnWidth, pawnHeight);
  blackPawn2 = image(blackPawnImg, blackPawn2X, blackPawn2Y, pawnWidth, pawnHeight);
  blackPawn3 = image(blackPawnImg, blackPawn3X, blackPawn3Y, pawnWidth, pawnHeight);
  blackPawn4 = image(blackPawnImg, blackPawn4X, blackPawn4Y, pawnWidth, pawnHeight);
  blackPawn5 = image(blackPawnImg, blackPawn5X, blackPawn5Y, pawnWidth, pawnHeight);
  blackPawn6 = image(blackPawnImg, blackPawn6X, blackPawn6Y, pawnWidth, pawnHeight);
  blackPawn7 = image(blackPawnImg, blackPawn7X, blackPawn7Y, pawnWidth, pawnHeight);
  blackPawn8 = image(blackPawnImg, blackPawn8X, blackPawn8Y, pawnWidth, pawnHeight);
  for (let i = 0; i < numberOfCellsEachSide; i++) {
    theBoard[1][i] = 'blackPawn' + (i + 1);
  }

  image(blackRookImg,   blackRook1X,   blackRook1Y,   rookWidth,   rookHeight);
  theBoard[0][0] = 'blackRook1';
  image(blackKnightImg, blackKnight1X, blackKnight1Y, knightWidth, knightHeight);
  theBoard[0][1] = 'blackKnight1';
  image(blackBishopImg, blackBishop1X, blackBishop1Y, bishopWidth, bishopHeight);
  theBoard[0][2] = 'blackBishop1';
  image(blackQueenImg,  blackQueenX,   blackQueenY,   pawnWidth,   pawnHeight);
  theBoard[0][3] = 'blackQueen';
  image(blackKingImg,   blackKingX,    blackKingY,    pawnWidth,   pawnHeight);
  theBoard[0][4] = 'blackKing';
  image(blackBishopImg, blackBishop2X, blackBishop2Y, bishopWidth, bishopHeight);
  theBoard[0][5] = 'blackBishop2';
  image(blackKnightImg, blackKnight2X, blackKnight2Y, knightWidth, knightHeight);
  theBoard[0][6] = 'blackKnight2';
  image(blackRookImg,   blackRook2X,   blackRook2Y,   rookWidth,   rookHeight);
  theBoard[0][7] = 'blackRook2';

}

function windoResized() {
  setup();
}
