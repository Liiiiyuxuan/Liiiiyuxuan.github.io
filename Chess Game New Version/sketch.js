/*
Class √                Class has been used to creat cells on the chess board and buttons 

Switch & Case √        Switch and case were used in the cell class. Easier to read compared to lines of if and else if

Date Get √             Date() is used to find out the date when the game is played

Arrow Function √       Arrow functions can be found in the button class. Sometimes easier to read

Throw & Try & Catch √  These can be found in the pawn promotion. Input will be asked from the user, and we need to detect whether the input is valid or not

*/

let rows = 8;
let columns = 8;
let boardSize = 720;
let buttonWidth = 100;
let buttonHeight = 60;
let takenPieceSize = 40;

let whiteSecondTimer = 0;
let whiteMinuteTimer = 0;
let whiteTimer = 0;
let blackSecondTimer = 0;
let blackMinuteTimer = 0;
let blackTimer = 0;

let whoseTurn = 'white';
let moveColour, takeColour;

const DATE = new Date();
const YEAR = DATE.getFullYear();
const MONTH = DATE.getMonth() + 1;
const DAY = DATE.getDate();

let theBoard = [ // use Array() just for fun
  Array(),
  Array(),
  Array(),
  Array(),
  Array(),
  Array(),
  Array(),
  Array(),
];

// list that stores the board for taking back (undo)
let theBoardList = [];

// array used to store all the pieces selected, push the piece that has been most recently selected
// therefore, if we want to move any of the pieces, we could use the last element pushed into the cell
// and assign the designated spot with the slected piece's information we have stored
let pos = [
  ['none', 'none'],
];

// the array used to store all the pieces or cells that has been taken 
let pieceTaken = [
  ['none', 'none']
];

let whiteCastleKingSide = true;
let whiteCastleQueenSide = true;
let blackCastleKingSide = true;
let blackCastleQueenSide = true;
let gameOverSound = true;

let whitePawnImg, whiteRookImg, whiteKnightImg, whiteBishopImg, whiteQueenImg, whiteKingImg;
let blackPawnImg, blackRookImg, blackKnightImg, blackBishopImg, blackQueenImg, blackKingImg;

function preload() {
  whitePawnImg   = loadImage('images/white.pawn.png');
  whiteRookImg   = loadImage('images/white.rook.png');
  whiteKnightImg = loadImage('images/white.knight.png');
  whiteBishopImg = loadImage('images/white.Bishop.png');
  whiteQueenImg  = loadImage('images/white.Queen.png');
  whiteKingImg   = loadImage('images/white.King.png');

  blackPawnImg   = loadImage('images/black.pawn.png');
  blackRookImg   = loadImage('images/black.rook.png');
  blackKnightImg = loadImage('images/black.knight.png');
  blackBishopImg = loadImage('images/black.Bishop.png');
  blackQueenImg  = loadImage('images/black.Queen.png');
  blackKingImg   = loadImage('images/black.King.png');

  gameOverSound = loadSound('sounds/gameEnd.wav');
  moveSound     = loadSound('sounds/move.wav');
  takeSound     = loadSound('sounds/take.wav');

  myFont = loadFont('gameFont.ttf');
}



function setup() {
  fill(0);
  createCanvas(windowWidth, windowHeight);
  boardSetUp();

  moveColour = color(25, 255, 25, 125);
  takeColour = color(255, 25, 25, 125);
}

function draw() {
  background('white');

  for (let i = 0; i < theBoard.length; i++) {
    for (let j = 0; j < theBoard[i].length; j++) {

      // show each cell, either white or black based on their positions
      theBoard[i][j].showCell();

      // show the pieces based on the piece info we assigned to wach cell
      // therefore, we can change the pices on the board by simply change the info of each element (cell) in theBoard array
      theBoard[i][j].showPiece();
    }
  };

  movePawn();
  moveKnight();
  moveBishop();
  moveRook();
  moveQueen();
  moveKing();

  takeBack();
  timer();
  displayTakenPiece();
  checkWinner();
}



// you can change the board set up in the way you like by editing the code in this function
function boardSetUp() {
  // first of all, assign all the cells with the same value to create the board
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let cell = new Cell(i, j, 'none', 'none', false, false);
      theBoard[i].push(cell);
    }
  };

  // the first two rows are all black pieces
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < columns; j++){
      theBoard[i][j].colour = 'black';
    }
  };

  theBoard[0][0].piece = 'rook';
  theBoard[0][1].piece = 'knight';
  theBoard[0][2].piece = 'bishop';
  theBoard[0][3].piece = 'queen';
  theBoard[0][4].piece = 'king';
  theBoard[0][5].piece = 'bishop';
  theBoard[0][6].piece = 'knight';
  theBoard[0][7].piece = 'rook';

  for (let j = 0; j < columns; j++) {
    theBoard[1][j].piece = 'pawn';
  }

  // the last two rows are all white pieces
  for (let i = 6; i < rows; i++) {
    for (let j = 0; j < columns; j++){
      theBoard[i][j].colour = 'white';
    }
  };

  theBoard[7][0].piece = 'rook';
  theBoard[7][1].piece = 'knight';
  theBoard[7][2].piece = 'bishop';
  theBoard[7][3].piece = 'queen';
  theBoard[7][4].piece = 'king';
  theBoard[7][5].piece = 'bishop';
  theBoard[7][6].piece = 'knight';
  theBoard[7][7].piece = 'rook';

  for (let j = 0; j < columns; j++) {
    theBoard[6][j].piece = 'pawn';
  }

  // try { 
  //   
  // } 
  // catch (e) {   
  //    
  // } 

  addToBoardList();
}

function selectPiece() {
  if (mouseIsPressed) {
    // detect in which cell is our mouse clicked
    let j = floor(mouseY / (boardSize / columns));
    let i = floor(mouseX / (boardSize / rows));

    // set all the cell to be unselected to avoid any errors
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        if (y !== j || x !== i) {
          theBoard[y][x].selected = false;
        }
      }
    }

    // the cell can only be selected if there is a piece on it
    if (j < rows && i < columns && theBoard[j][i].colour === whoseTurn && !theBoard[j][i].available) {
      theBoard[j][i].selected = true;
    } 
    
    // even after we click an empty cell, all the cell will be set to unselected and unavailable, 
    // so the piece we have selected before won't be able to move
    else if (j < rows && i < columns && theBoard[j][i].piece === 'none') {
      for (let x = 0; x < rows; x ++) {
        for (let y = 0; y < columns; y ++) {
          if (y !== j || x !== i) {
            theBoard[y][x].selected = false;
            theBoard[y][x].available = false;
          }
        }
      }
    }
  }
}

function movePiece() {
  let pieceColour, pieceType;

  // we first push the position of the piece that was most recently selected
  for (let counter = 0; counter < theBoard.length; counter ++) {
    for (let secondCounter = 0; secondCounter < theBoard[counter].length; secondCounter++) {
      if (theBoard[counter][secondCounter].selected) {
        pos.push([counter, secondCounter]);
      }
    }
  }

  if (mouseIsPressed) {
    let j = floor(mouseY / (boardSize / columns));
    let i = floor(mouseX / (boardSize / rows));

    if (j < rows && i < columns && theBoard[j][i].available) {
      // this array is used to in the checkWinner() for the purpose of checking the last element passed in
      // If the last element passed in was a king, so one of the players wins the game
      if (theBoard[j][i].colour !== 'none'){
        takeSound.play();
        pieceTaken.push( [theBoard[j][i].colour, theBoard[j][i].piece] );
      }
      else {
        moveSound.play();
      }
      
      // the cell our selected pieve has left from is empty now
      pieceColour = theBoard[pos[pos.length - 1][0]][pos[pos.length - 1][1]].colour;
      pieceType = theBoard[pos[pos.length - 1][0]][pos[pos.length - 1][1]].piece;

      // if a rook or a king has been moved, castle status should be changed to false
      if (pieceType === 'king') {
        if (pieceColour === 'white') {
          whiteCastleKingSide = false;
          whiteCastleQueenSide = false;
        }
        else if (pieceColour === 'black') {
          blackCastleKingSide = false;
          blackCastleQueenSide = false;
        }
      }
      if (pieceType === 'rook') {
        if (pieceColour === 'white' && pos[pos.length - 1][0] === 7 && pos[pos.length - 1][1] === 0) {
          whiteCastleQueenSide = false;
        }
        if (pieceColour === 'white' && pos[pos.length - 1][0] === 7 && pos[pos.length - 1][1] === 7) {
          whiteCastleKingSide = false;
        }
        if (pieceColour === 'black' && pos[pos.length - 1][0] === 0 && pos[pos.length - 1][1] === 0) {
          blackCastleQueenSide = false;
        }
        if (pieceColour === 'black' && pos[pos.length - 1][0] === 0 && pos[pos.length - 1][1] === 7) {
          blackCastleKingSide = false;
        }
      }

      theBoard[pos[pos.length - 1][0]][pos[pos.length - 1][1]].colour = 'none';
      theBoard[pos[pos.length - 1][0]][pos[pos.length - 1][1]].piece = 'none';

      // then we can replace the available cell with the piece we have selected by pass in the piece information we just saved
      theBoard[j][i].colour = pieceColour;
      theBoard[j][i].piece = pieceType;
      theBoard[j][i].available = false;

      // pawn promotion, happens when the pawn is at the last line
      if (pieceType === 'pawn' && j === 0 || pieceType === 'pawn' && j === 7) {
        pawnPromotion(j, i);
      }
      
      // castle on the king side
      if (pieceType === 'king' && i === pos[pos.length - 1][1] + 2) {
        theBoard[pos[pos.length - 1][0]][7].colour = 'none';
        theBoard[pos[pos.length - 1][0]][7].piece = 'none';

        theBoard[j][5].colour = pieceColour;
        theBoard[j][5].piece = 'rook';
        theBoard[j][5].available = false;
      }

      // castle on the queen side
      if (pieceType === 'king' && i === pos[pos.length - 1][1] - 2) {
        theBoard[pos[pos.length - 1][0]][0].colour = 'none';
        theBoard[pos[pos.length - 1][0]][0].piece = 'none';

        theBoard[j][3].colour = pieceColour;
        theBoard[j][3].piece = 'rook';
        theBoard[j][3].available = false;
      }

      whoseTurn = whoseTurn === 'white' ? 'black' : 'white';

      initializingAvailability();
      addToBoardList();
    }
  }
}

// add the current board to the boardList for takeBack()
function addToBoardList() {
  // board
  theBoardList.push( [] );

  // row
  for (let i = 0; i < rows; i ++) {
    theBoardList[theBoardList.length - 1].push( [] );

    // cell
    for (let j = 0; j < columns; j ++) {
      theBoardList[theBoardList.length - 1][i].push( [] );

      // property
      let theCell = theBoard[i][j];
      theBoardList[theBoardList.length - 1][i][j] = new Cell(theCell.i, theCell.j, theCell.colour, theCell.piece, theCell.selected, theCell.available);
    }
  }
}
 
function takeBack() {
  let takeBackBtn = new Button(boardSize + buttonWidth, boardSize / 2 - buttonHeight, buttonWidth, buttonHeight, 'black', 'Take Back', 'white', 20);
  takeBackBtn.showButton();
  takeBackBtn.showHover();
  takeBackBtn.showText();

  takeBackBtn.buttonClicked(() => {
    if (theBoardList.length - 2 >= 0) {
      theBoard = theBoardList[theBoardList.length - 2];
      // after the take back, the turn should also be given back to the previous player
      whoseTurn = whoseTurn === 'white' ? 'black' : 'white';
    }
  })
}

// function used to display the time used by each player
function timer() {
  // display the date of day
  textAlign(CENTER);
  textFont(myFont);
  textSize(20);
  fill("black");
  text("Game played on", boardSize + buttonWidth * 1.5, boardSize / 2 + boardSize / (rows * 3) * 1);
  text(YEAR + ' ' + MONTH + ' ' + DAY, boardSize + buttonWidth * 1.5, boardSize / 2 + boardSize / (rows * 3) * 2);

  blackSecondTimer = blackTimer % 60; // counts how many seconds
  blackMinuteTimer = floor(blackTimer / 60); // counts how many minutes

  whiteSecondTimer = whiteTimer % 60; // counts how many seconds
  whiteMinuteTimer = floor(whiteTimer / 60); // counts how many minutes

  textAlign(CENTER);
  textFont(myFont);
  textSize(40);
  fill("black");
  text(blackMinuteTimer + ' : ' + blackSecondTimer, boardSize + buttonWidth * 1.5, boardSize / rows * 3  );
  text(whiteMinuteTimer + ' : ' + whiteSecondTimer, boardSize + buttonWidth * 1.5, boardSize / rows * 5.5);
  
  if (whoseTurn === 'black' && frameCount % 60 === 0) {
    blackTimer ++;
  }
  if (whoseTurn === 'white' && frameCount % 60 === 0) {
    whiteTimer ++;
  }
}

let checkWinner = () => {
  // checking the pieces that has been taken and pushed them into the array, if it was a king, on of the player has lost
  let winnerColour;

  if (pieceTaken[pieceTaken.length - 1][1] === 'king') {
    if (pieceTaken[pieceTaken.length - 1][0] === 'white') {
      winnerColour = 'BLACK';
      gameOver(winnerColour);
    }
    if (pieceTaken[pieceTaken.length - 1][0] === 'black') {
      winnerColour = 'WHITE';
      gameOver(winnerColour);
    }
  }
}

function displayTakenPiece() {
  let whiteTaken = [];
  let blackTaken = [];

  // used to sort the taken pieces
  for (let i = 0; i < pieceTaken.length; i ++) {
    // check the colour of the taken piece
    if (pieceTaken[i][0] === 'white') {
      whiteTaken.push(pieceTaken[i]);
    }
    else if (pieceTaken[i][0] === 'black') {
      blackTaken.push(pieceTaken[i]);
    }
  }

  let whitePawnCount = 0;
  let whiteOtherCount = 0;
  for (let i = 0; i < whiteTaken.length; i ++) {
    // check the type of the taken piece
    if (whiteTaken[i][1] === 'pawn') {
      image(whitePawnImg, boardSize + takenPieceSize * whitePawnCount + 20, takenPieceSize, takenPieceSize, takenPieceSize);
      whitePawnCount ++;
    }

    if (whiteTaken[i][1] === 'knight') {
      image(whiteKnightImg, boardSize + takenPieceSize * whiteOtherCount + 20, takenPieceSize + boardSize / rows, takenPieceSize, takenPieceSize);
      whiteOtherCount ++;
    }
    if (whiteTaken[i][1] === 'bishop') {
      image(whiteBishopImg, boardSize + takenPieceSize * whiteOtherCount + 20, takenPieceSize + boardSize / rows, takenPieceSize, takenPieceSize);
      whiteOtherCount ++;
    }
    if (whiteTaken[i][1] === 'rook') {
      image(whiteRookImg, boardSize + takenPieceSize * whiteOtherCount + 20, takenPieceSize + boardSize / rows, takenPieceSize, takenPieceSize);
      whiteOtherCount ++;
    }
    if (whiteTaken[i][1] === 'queen') {
      image(whiteQueenImg, boardSize + takenPieceSize * whiteOtherCount + 20, takenPieceSize + boardSize / rows, takenPieceSize, takenPieceSize);
      whiteOtherCount ++;
    }
  }
    
  let blackPawnCount = 0;
  let blackOtherCount = 0;
  for (let i = 0; i < blackTaken.length; i ++) {
    // check the type of the taken piece
    if (blackTaken[i][1] === 'pawn') {
      image(blackPawnImg, boardSize + takenPieceSize * blackPawnCount + 20, takenPieceSize + boardSize / rows * 6, takenPieceSize, takenPieceSize);
      blackPawnCount ++;
    }

    if (blackTaken[i][1] === 'knight') {
      image(blackKnightImg, boardSize + takenPieceSize * blackOtherCount + 20, takenPieceSize + boardSize / rows * 7, takenPieceSize, takenPieceSize);
      blackOtherCount ++;
    }
    if (blackTaken[i][1] === 'bishop') {
      image(blackBishopImg, boardSize + takenPieceSize * blackOtherCount + 20, takenPieceSize + boardSize / rows * 7, takenPieceSize, takenPieceSize);
      blackOtherCount ++;
    }
    if (blackTaken[i][1] === 'rook') {
      image(blackRookImg, boardSize + takenPieceSize * blackOtherCount + 20, takenPieceSize + boardSize / rows * 7, takenPieceSize, takenPieceSize);
      blackOtherCount ++;
    }
    if (blackTaken[i][1] === 'queen') {
      image(blackQueenImg, boardSize + takenPieceSize * blackOtherCount + 20, takenPieceSize + boardSize / rows * 7, takenPieceSize, takenPieceSize);
      blackOtherCount ++;
    }
  }
}

function gameOver(object) {
  if (gameOverSound) {
    gameOverSound.play();
    gameOverSound = false;
  }

  background('black');
  textAlign(CENTER);
  textFont(myFont);
  textSize(60);
  fill("white");
  text("Game Over", windowWidth / 2, windowHeight / 3);
  text ("The Winner Was " + object + "!", windowWidth / 2, windowHeight / 2);

  let restartBtn = new Button(windowWidth / 2 - 120, windowHeight / 3 * 2 - 60, 240, 90, 'black', 'Restart', 'white', 60);
  stroke(255);
  restartBtn.showButton();
  restartBtn.showText();
  
  restartBtn.buttonClicked(() => { // is the restart button is clicked, initializing the declarations
    theBoard = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ];

    // it is important to reset the array used for checking the winner
    pieceTaken = [
      ['none', 'none']
    ];

    theBoardList = [];

    whiteCastleKingSide  = true;
    whiteCastleQueenSide = true;
    blackCastleKingSide  = true;
    blackCastleQueenSide = true;
    gameOverSound = true;
    pawnPromotionBtn = false;

    whiteSecondTimer = 0;
    whiteMinuteTimer = 0;
    whiteTimer = 0;
    blackSecondTimer = 0;
    blackMinuteTimer = 0;
    blackTimer = 0;

    setup();
  });
}

function initializingAvailability() {
  // function being called everytime a cell has been selected
  // to avoid error happen as a not selected piece move to another spot
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      theBoard[y][x].available = false;
    }
  }
}

function pawnPromotion(j, i) {
  let inputPiece = prompt('WHAT PIECE WOULD YOU LIKE ? (queen / rook / bishop / knight)');

  try {
    if (inputPiece !== 'queen' && inputPiece !== 'rook' && inputPiece !== 'bishop' && inputPiece !== 'knight') {
      throw 'error';
    }

    theBoard[j][i].piece = inputPiece;
  } catch(e) {
      inputPiece = prompt('COULD NOT RECOGNIZE THE INPUT ... (queen / rook / bishop / knight)');
      theBoard[j][i].piece = inputPiece;
  }
}


