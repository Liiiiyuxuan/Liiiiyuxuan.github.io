let chessboardSize = 720;
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
  whiteRookImg = loadImage('white.rook.png');
  whiteKnightImg = loadImage('white.knight.png');
  whiteBishopImg = loadImage('white.Bishop.png');
  whiteQueenImg = loadImage('white.Queen.png');
  whiteKingImg = loadImage('white.King.png');

  blackPawnImg = loadImage('black.pawn.png');
  blackRookImg = loadImage('black.rook.png');
  blackKnightImg = loadImage('black.knight.png');
  blackBishopImg = loadImage('black.Bishop.png');
  blackQueenImg = loadImage('black.Queen.png');
  blackKingImg = loadImage('black.King.png');
}

function setup() {
  createCanvas(chessboardSize, chessboardSize);
}

function draw() {
  drawChessboard();
  designateCoordinates();
  setUpPieces();
  console.log(theBoard);
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
        piece: 'none',
      }
      theBoard[i][j] = property;
    }
  }
}

function setUpPieces() {
  // setting up white pawns
  for (let i = 0; i < rows; i++) {
    image(whitePawnImg, chessboardSize / rows * i, chessboardSize / columns * 6, chessboardSize / rows, chessboardSize / columns);
    theBoard[6][i].property = 'whitePawn';
  }

  // setting up white rooks
  image(whiteRookImg, chessboardSize / rows * 0, chessboardSize / columns * 7, chessboardSize / rows, chessboardSize / columns);
  image(whiteRookImg, chessboardSize / rows * 7, chessboardSize / columns * 7, chessboardSize / rows, chessboardSize / columns);
  theBoard[7][0].property = 'whiteRook';
  theBoard[7][7].property = 'whiteRook';

  // setting up white knights
  image(whiteKnightImg, chessboardSize / rows * 1, chessboardSize / columns * 7, chessboardSize / rows, chessboardSize / columns);
  image(whiteKnightImg, chessboardSize / rows * 6, chessboardSize / columns * 7, chessboardSize / rows, chessboardSize / columns);
  theBoard[7][1].property = 'whiteKnight';
  theBoard[7][6].property = 'whiteKnight';

  // setting up white bishops
  image(whiteBishopImg, chessboardSize / rows * 2, chessboardSize / columns * 7, chessboardSize / rows, chessboardSize / columns);
  image(whiteBishopImg, chessboardSize / rows * 5, chessboardSize / columns * 7, chessboardSize / rows, chessboardSize / columns);
  theBoard[7][2].property = 'whiteBishop';
  theBoard[7][5].property = 'whiteBishop';

  // setting up white queen and king
  image(whiteQueenImg, chessboardSize / rows * 3, chessboardSize / columns * 7, chessboardSize / rows, chessboardSize / columns);
  image(whiteKingImg,  chessboardSize / rows * 4, chessboardSize / columns * 7, chessboardSize / rows, chessboardSize / columns);
  theBoard[7][3].property = 'whiteQueen';
  theBoard[7][4].property = 'whiteKing';


  // setting up black pawns
  for (let i = 0; i < rows; i++) {
    image(blackPawnImg, chessboardSize / rows * i, chessboardSize / columns * 1, chessboardSize / rows, chessboardSize / columns);
    theBoard[1][i].property = 'blackPawn';
  }

  // setting up black rooks
  image(blackRookImg, chessboardSize / rows * 0, chessboardSize / columns * 0, chessboardSize / rows, chessboardSize / columns);
  image(blackRookImg, chessboardSize / rows * 7, chessboardSize / columns * 0, chessboardSize / rows, chessboardSize / columns);
  theBoard[0][0].property = 'blackRook';
  theBoard[0][7].property = 'blackRook';

  // setting up black knights
  image(blackKnightImg, chessboardSize / rows * 1, chessboardSize / columns * 0, chessboardSize / rows, chessboardSize / columns);
  image(blackKnightImg, chessboardSize / rows * 6, chessboardSize / columns * 0, chessboardSize / rows, chessboardSize / columns);
  theBoard[0][1].property = 'blackKnight';
  theBoard[0][6].property = 'blackKnight';

  // setting up black bishops
  image(blackBishopImg, chessboardSize / rows * 2, chessboardSize / columns * 0, chessboardSize / rows, chessboardSize / columns);
  image(blackBishopImg, chessboardSize / rows * 5, chessboardSize / columns * 0, chessboardSize / rows, chessboardSize / columns);
  theBoard[0][2].property = 'blackBishop';
  theBoard[0][5].property = 'blackBishop';

  // setting up black queen and king
  image(blackQueenImg, chessboardSize / rows * 3, chessboardSize / columns * 0, chessboardSize / rows, chessboardSize / columns);
  image(blackKingImg,  chessboardSize / rows * 4, chessboardSize / columns * 0, chessboardSize / rows, chessboardSize / columns);
  theBoard[0][3].property = 'blackQueen';
  theBoard[0][4].property = 'blackKing';
}