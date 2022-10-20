let chessboardSize = 720;
let columns = 8;
let rows = 8;
let counter = 0;
let diametre = 25;

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

let pawnAvailability = false;

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

  movePawn();
  moveKing();
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
    theBoard[6][i].piece = 'whitePawn';
  }

  // setting up white rooks
  image(whiteRookImg, chessboardSize / rows * 0, chessboardSize / columns * 7, chessboardSize / rows, chessboardSize / columns);
  image(whiteRookImg, chessboardSize / rows * 7, chessboardSize / columns * 7, chessboardSize / rows, chessboardSize / columns);
  theBoard[7][0].piece = 'whiteRook';
  theBoard[7][7].piece = 'whiteRook';

  // setting up white knights
  image(whiteKnightImg, chessboardSize / rows * 1, chessboardSize / columns * 7, chessboardSize / rows, chessboardSize / columns);
  image(whiteKnightImg, chessboardSize / rows * 6, chessboardSize / columns * 7, chessboardSize / rows, chessboardSize / columns);
  theBoard[7][1].piece = 'whiteKnight';
  theBoard[7][6].piece = 'whiteKnight';

  // setting up white bishops
  image(whiteBishopImg, chessboardSize / rows * 2, chessboardSize / columns * 7, chessboardSize / rows, chessboardSize / columns);
  image(whiteBishopImg, chessboardSize / rows * 5, chessboardSize / columns * 7, chessboardSize / rows, chessboardSize / columns);
  theBoard[7][2].piece = 'whiteBishop';
  theBoard[7][5].piece = 'whiteBishop';

  // setting up white queen and king
  image(whiteQueenImg, chessboardSize / rows * 3, chessboardSize / columns * 7, chessboardSize / rows, chessboardSize / columns);
  image(whiteKingImg,  chessboardSize / rows * 4, chessboardSize / columns * 7, chessboardSize / rows, chessboardSize / columns);
  theBoard[7][3].piece = 'whiteQueen';
  theBoard[7][4].piece = 'whiteKing';


  // setting up black pawns
  for (let i = 0; i < rows; i++) {
    image(blackPawnImg, chessboardSize / rows * i, chessboardSize / columns * 1, chessboardSize / rows, chessboardSize / columns);
    theBoard[1][i].piece = 'blackPawn';
  }

  // setting up black rooks
  image(blackRookImg, chessboardSize / rows * 0, chessboardSize / columns * 0, chessboardSize / rows, chessboardSize / columns);
  image(blackRookImg, chessboardSize / rows * 7, chessboardSize / columns * 0, chessboardSize / rows, chessboardSize / columns);
  theBoard[0][0].piece = 'blackRook';
  theBoard[0][7].piece = 'blackRook';

  // setting up black knights
  image(blackKnightImg, chessboardSize / rows * 1, chessboardSize / columns * 0, chessboardSize / rows, chessboardSize / columns);
  image(blackKnightImg, chessboardSize / rows * 6, chessboardSize / columns * 0, chessboardSize / rows, chessboardSize / columns);
  theBoard[0][1].piece = 'blackKnight';
  theBoard[0][6].piece = 'blackKnight';

  // setting up black bishops
  image(blackBishopImg, chessboardSize / rows * 2, chessboardSize / columns * 0, chessboardSize / rows, chessboardSize / columns);
  image(blackBishopImg, chessboardSize / rows * 5, chessboardSize / columns * 0, chessboardSize / rows, chessboardSize / columns);
  theBoard[0][2].piece = 'blackBishop';
  theBoard[0][5].piece = 'blackBishop';

  // setting up black queen and king
  image(blackQueenImg, chessboardSize / rows * 3, chessboardSize / columns * 0, chessboardSize / rows, chessboardSize / columns);
  image(blackKingImg,  chessboardSize / rows * 4, chessboardSize / columns * 0, chessboardSize / rows, chessboardSize / columns);
  theBoard[0][3].piece = 'blackQueen';
  theBoard[0][4].piece = 'blackKing';
}

function movePawn() {
  if (mouseIsPressed) {
    let j = floor(mouseY / (chessboardSize / columns));
    let i = floor(mouseX / (chessboardSize / rows));
    if (theBoard[j][i].piece === 'whitePawn') {
      fill(25, 255, 25, 125);
      if (j === 6 && theBoard[j-1][i].piece === 'none' && theBoard[j-2][i].piece === 'none') {
        square(chessboardSize / rows * i, chessboardSize / columns * (j-1), chessboardSize / rows);
        square(chessboardSize / rows * i, chessboardSize / columns * (j-2), chessboardSize / rows);
      }

      else if (theBoard[j-1][i].piece === 'none') {
        square(chessboardSize / rows * i, chessboardSize / columns * (j-1), chessboardSize / rows);
      }
    }
    else if (theBoard[j][i].piece === 'blackPawn') {
      fill(25, 255, 25, 125);
      if (j === 1 && theBoard[j+1][i].piece === 'none' && theBoard[j+2][i].piece === 'none') {
        square(chessboardSize / rows * i, chessboardSize / columns * (j+1), chessboardSize / rows);
        square(chessboardSize / rows * i, chessboardSize / columns * (j+2), chessboardSize / rows);
      }

      else if (theBoard[j+1][i].piece === 'none') {
        square(chessboardSize / rows * i, chessboardSize / columns * (j+1), chessboardSize / rows);
      }
    }
  }
}

function moveKing() {
  if (mouseIsPressed) {
    let j = floor(mouseY / (chessboardSize / columns));
    let i = floor(mouseX / (chessboardSize / rows));

    if (theBoard[j][i].piece === 'whiteKing') {
      for (let counter1 = j - 1; counter1 <= j + 1; counter1++) {
        for (let counter2 = i - 1; counter2 <= i + 1; counter2++) {
          if (theBoard[counter1][counter2] !== undefined && theBoard[counter1][counter2].piece === 'none') {
            fill(25, 255, 25, 125);
            square(chessboardSize / rows * counter2, chessboardSize / columns * counter1, chessboardSize / rows);
          }
        }
      }
    }

    if (theBoard[j][i].piece === 'blackKing') {
      for (let counter1 = j - 1; counter1 <= j + 1; counter1++) {
        for (let counter2 = i - 1; counter2 <= i + 1; counter2++) {
          if (theBoard[counter1][counter2] !== undefined && theBoard[counter1][counter2].piece === 'none') {
            fill(25, 255, 25, 125);
            square(chessboardSize / rows * counter2, chessboardSize / columns * counter1, chessboardSize / rows);
          }
        }
      }
    }

  }
}
