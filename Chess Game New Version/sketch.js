let rows = 8;
let columns = 8;
let boardSize = 720;
let buttonWidth = 100;
let buttonHeight = 80;

let whoseTurn = 'white';

let theBoard = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  []
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

  myFont = loadFont('gameFont.ttf');
}



function setup() {
  fill(0);
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.position((windowWidth - boardSize - buttonWidth * 2) / 2, (windowHeight - boardSize) / 2)
  boardSetUp();
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
  checkWinner();
}



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
      pieceTaken.push( [theBoard[j][i].colour, theBoard[j][i].piece] );

      // the cell our selected pieve has left from is empty now
      pieceColour = theBoard[pos[pos.length - 1][0]][pos[pos.length - 1][1]].colour;
      pieceType = theBoard[pos[pos.length - 1][0]][pos[pos.length - 1][1]].piece;

      // if a rook or a king has been moved, castle status should be changed
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

      addToBoardList();
    }
  }
}

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
  fill("black");
  rect(boardSize + buttonWidth, (boardSize - buttonHeight) / 2, buttonWidth, buttonHeight)

  textAlign(CENTER);
  textFont(myFont);
  textSize(20);
  fill("white");
  text("Take Back", boardSize + buttonWidth * 1.5, boardSize / 2);

  if (mouseX >= boardSize + buttonWidth && mouseX <= boardSize + buttonWidth + buttonWidth) {
    if (mouseY >= (boardSize - buttonHeight) / 2 && mouseY <= (boardSize - buttonHeight) / 2 + buttonHeight) {
      if (mouseIsPressed && theBoardList.length - 2 >= 0) {
        theBoard = theBoardList[theBoardList.length - 2];
        whoseTurn = whoseTurn === 'white' ? 'black' : 'white';
      }
    }
  }
}

function checkWinner() {
  let winnerColour;

  // checking the pieces that has been taken and pushed them into the array, if it was a king, on of the player has lost
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

function gameOver(object) {
  background('black')
  textAlign(CENTER);
  textFont(myFont);
  textSize(60);
  fill("white");
  text("Game Over", boardSize / 2, boardSize / 3);

  text ("The Winner Was " + object + "!", boardSize / 2, boardSize / 2);

  text("Restart", boardSize / 2, boardSize / 3 * 2)

  stroke(255);
  line(boardSize / 2 - 120, boardSize / 3 * 2 - 60, boardSize / 2 + 120, boardSize / 3 * 2 - 60);
  line(boardSize / 2 - 120, boardSize / 3 * 2 + 30, boardSize / 2 + 120, boardSize / 3 * 2 + 30 );
  line(boardSize / 2 - 120, boardSize / 3 * 2 - 60, boardSize / 2 - 120, boardSize / 3 * 2 + 30 );
  line(boardSize / 2 + 120, boardSize / 3 * 2 + 30, boardSize / 2 + 120, boardSize / 3 * 2 - 60 );
  
  if (mouseX > boardSize / 2 - 120 && mouseX < boardSize / 2 + 120) {
    if (mouseY > boardSize / 3 * 2 - 60 && mouseY < boardSize / 3 * 2 + 30) {
      if (mouseIsPressed) {
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

        setup();
      }
    }
  }
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
  theBoard[j][i].piece = 'queen';
}



class Cell{
  constructor(i, j, colour, piece, selected, available) {
    this.i = i;
    this.j = j;
    this.colour = colour;
    this.piece = piece;
    this.selected = selected;
    this.available = available;



    this.showCell = function() {
      let x = this.j * (boardSize / rows);
      let y = this.i * (boardSize / columns);

      fill((i + j) % 2 === 0 ? 'white' : 'black');
      rect(x, y, boardSize / columns, boardSize / rows);
    }

    this.showPiece = function() {
      let x = this.j * (boardSize / rows);
      let y = this.i * (boardSize / columns);

      switch (this.colour) {
        case 'black':
          switch (this.piece) {
            case 'rook':
              if (this.selected) {
                fill('yellow');
                rect(x, y, boardSize / columns, boardSize / rows);
              }
              image(blackRookImg, x, y, boardSize / columns, boardSize / rows);
              break;
            case 'knight':
              if (this.selected) {
                fill('yellow');
                rect(x, y, boardSize / columns, boardSize / rows);
              }
              image(blackKnightImg, x, y, boardSize / columns, boardSize / rows);
              break;
            case 'bishop':
              if (this.selected) {
                fill('yellow');
                rect(x, y, boardSize / columns, boardSize / rows);
              }
              image(blackBishopImg, x, y, boardSize / columns, boardSize / rows);
              break;
            case 'queen':
              if (this.selected) {
                fill('yellow');
                rect(x, y, boardSize / columns, boardSize / rows);
              }
              image(blackQueenImg, x, y, boardSize / columns, boardSize / rows);
              break;
            case 'king':
              if (this.selected) {
                fill('yellow');
                rect(x, y, boardSize / columns, boardSize / rows);
              }
              image(blackKingImg, x, y, boardSize / columns, boardSize / rows);
              break;
            case 'pawn':
              if (this.selected) {
                fill('yellow');
                rect(x, y, boardSize / columns, boardSize / rows);
              }
              image(blackPawnImg, x, y, boardSize / columns, boardSize / rows);
              break;
            }
          break;
        case 'white':
          switch (this.piece) {
            case 'rook':
              if (this.selected) {
                fill('yellow');
                rect(x, y, boardSize / columns, boardSize / rows);
              }
              image(whiteRookImg, x, y, boardSize / columns, boardSize / rows);
              break;
            case 'knight':
              if (this.selected) {
                fill('yellow');
                rect(x, y, boardSize / columns, boardSize / rows);
              }
              image(whiteKnightImg, x, y, boardSize / columns, boardSize / rows);
              break;
            case 'bishop':
              if (this.selected) {
                fill('yellow');
                rect(x, y, boardSize / columns, boardSize / rows);
              }
              image(whiteBishopImg, x, y, boardSize / columns, boardSize / rows);
              break;
            case 'queen':
              if (this.selected) {
                fill('yellow');
                rect(x, y, boardSize / columns, boardSize / rows);
              }
              image(whiteQueenImg, x, y, boardSize / columns, boardSize / rows);
              break;
            case 'king':
              if (this.selected) {
                fill('yellow');
                rect(x, y, boardSize / columns, boardSize / rows);
              }
              image(whiteKingImg, x, y, boardSize / columns, boardSize / rows);
              break;
            case 'pawn':
              if (this.selected) {
                fill('yellow');
                rect(x, y, boardSize / columns, boardSize / rows);
              }
              image(whitePawnImg, x, y, boardSize / columns, boardSize / rows);
              break;
            }
          break;
      }
    }
  }
}



function movePawn() {
  selectPiece();

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      // white pawn
      if (y === 6 && theBoard[y][x].colour === 'white' && theBoard[y][x].piece === 'pawn' && theBoard[y][x].selected) {
        initializingAvailability();
        fill(25, 255, 25, 125);
        if (y - 1 >= 0 && theBoard[y-1][x].piece === 'none') {
          rect(x * (boardSize / columns), (y-1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          if (y-2 > 0 && theBoard[y-2][x].piece === 'none') {
            rect(x * (boardSize / columns), (y-2) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y-2][x].available = true;
          }
          theBoard[y-1][x].available = true;
        }
        if (y - 1 >= 0 && x - 1 >= 0 && theBoard[y-1][x-1].colour === 'black') {
          fill(255, 25, 25, 125);
          rect((x-1) * (boardSize / columns), (y-1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y-1][x-1].available = true;
        }
        if (y - 1 >= 0 && x + 1 < columns && theBoard[y-1][x+1].colour === 'black') {
          fill(255, 25, 25, 125);
          rect((x+1) * (boardSize / columns), (y-1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y-1][x+1].available = true;
        }
      }
      if (y !== 6 && theBoard[y][x].colour === 'white' && theBoard[y][x].piece === 'pawn' && theBoard[y][x].selected) {
        initializingAvailability();
        fill(25, 255, 25, 125);
        if (y - 1 >= 0 && theBoard[y-1][x].piece === 'none') {
          rect(x * (boardSize / columns), (y-1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y-1][x].available = true;
        }
        if (y - 1 >= 0 && x - 1 >= 0 && theBoard[y-1][x-1].colour === 'black') {
          fill(255, 25, 25, 125);
          rect((x-1) * (boardSize / columns), (y-1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y-1][x-1].available = true;
        }
        if (y - 1 >= 0 && x + 1 < columns && theBoard[y-1][x+1].colour === 'black') {
          fill(255, 25, 25, 125);
          rect((x+1) * (boardSize / columns), (y-1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y-1][x+1].available = true;
        }
      }

      // black pawn
      if (y === 1 && theBoard[y][x].colour === 'black' && theBoard[y][x].piece === 'pawn' && theBoard[y][x].selected) {
        initializingAvailability();
        fill(25, 255, 25, 125);
        if (y + 1 < rows && theBoard[y+1][x].piece === 'none') {
          rect(x * (boardSize / columns), (y+1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          if (y+2 < rows && theBoard[y+2][x].piece === 'none') {
            rect(x * (boardSize / columns), (y+2) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y+2][x].available = true;
          }
          theBoard[y+1][x].available = true;
        }
        if (y + 1 >= 0 && x - 1 >= 0 && theBoard[y+1][x-1].colour === 'white') {
          fill(255, 25, 25, 125);
          rect((x-1) * (boardSize / columns), (y+1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y+1][x-1].available = true;
        }
        if (y + 1 >= 0 && x + 1 < columns && theBoard[y+1][x+1].colour === 'white') {
          fill(255, 25, 25, 125);
          rect((x+1) * (boardSize / columns), (y+1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y+1][x+1].available = true;
        }
      }
      if (y !== 1 && theBoard[y][x].colour === 'black' && theBoard[y][x].piece === 'pawn' && theBoard[y][x].selected) {
        initializingAvailability();
        fill(25, 255, 25, 125);
        if (y + 1 < rows && theBoard[y+1][x].piece === 'none') {
          rect(x * (boardSize / columns), (y+1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y+1][x].available = true;
        }
        if (y + 1 < rows && x - 1 >= 0 && theBoard[y+1][x-1].colour === 'white') {
          fill(255, 25, 25, 125);
          rect((x-1) * (boardSize / columns), (y+1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y+1][x-1].available = true;
        }
        if (y + 1 < rows && x + 1 < columns && theBoard[y+1][x+1].colour === 'white') {
          fill(255, 25, 25, 125);
          rect((x+1) * (boardSize / columns), (y+1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y+1][x+1].available = true;
        }
      }
    }
  }

  movePiece();
}

function moveKnight() {
  selectPiece();

  let colourList = ['black', 'white'];

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      for (let counter = 0; counter < colourList.length; counter++) {
        let selectedColour = colourList[counter % 2];
        let opponentColour = colourList[(counter + 1) % 2];

        if (theBoard[y][x].piece === 'knight' && theBoard[y][x].selected && theBoard[y][x].colour === selectedColour) {
          initializingAvailability();
          if (y - 1 >= 0 && x + 2 < columns && theBoard[y - 1][x + 2].piece === 'none') {
            fill(25, 255, 25, 125);
            rect((x + 2) * (boardSize / columns), (y - 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y - 1][x + 2].available = true;
          }
          if (y - 1 >= 0 && x + 2 < columns && theBoard[y - 1][x + 2].colour === opponentColour) {
            fill(255, 25, 25, 125);
            rect((x + 2) * (boardSize / columns), (y - 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y - 1][x + 2].available = true;
          }

          if (y - 1 >= 0 && x - 2 >= 0 && theBoard[y - 1][x - 2].piece === 'none') {
            fill(25, 255, 25, 125);
            rect((x - 2) * (boardSize / columns), (y - 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y - 1][x - 2].available = true;
          }
          if (y - 1 >= 0 && x - 2 >= 0 && theBoard[y - 1][x - 2].colour === opponentColour) {
            fill(255, 25, 25, 125);
            rect((x - 2) * (boardSize / columns), (y - 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y - 1][x - 2].available = true;
          }

          if (y + 1 < rows && x + 2 < columns && theBoard[y + 1][x + 2].piece === 'none') {
            fill(25, 255, 25, 125);
            rect((x + 2) * (boardSize / columns), (y + 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y + 1][x + 2].available = true;
          }
          if (y + 1 < rows && x + 2 < columns && theBoard[y + 1][x + 2].colour === opponentColour) {
            fill(255, 25, 25, 125);
            rect((x + 2) * (boardSize / columns), (y + 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y + 1][x + 2].available = true;
          }

          if (y + 1 < rows && x - 2 >= 0 && theBoard[y + 1][x - 2].piece === 'none') {
            fill(25, 255, 25, 125);
            rect((x - 2) * (boardSize / columns), (y + 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y + 1][x - 2].available = true;
          }
          if (y + 1 < rows && x - 2 >= 0 && theBoard[y + 1][x - 2].colour === opponentColour) {
            fill(255, 25, 25, 125);
            rect((x - 2) * (boardSize / columns), (y + 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y + 1][x - 2].available = true;
          }

          if (y - 2 >= 0 && x + 1 < columns && theBoard[y - 2][x + 1].piece === 'none') {
            fill(25, 255, 25, 125);
            rect((x + 1) * (boardSize / columns), (y - 2) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y - 2][x + 1].available = true;
          }
          if (y - 2 >= 0 && x + 1 < columns && theBoard[y - 2][x + 1].colour === opponentColour) {
            fill(255, 25, 25, 125);
            rect((x + 1) * (boardSize / columns), (y - 2) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y - 2][x + 1].available = true;
          }

          if (y - 2 >= 0 && x - 1 >= 0 && theBoard[y - 2][x - 1].piece === 'none') {
            fill(25, 255, 25, 125);
            rect((x - 1) * (boardSize / columns), (y - 2) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y - 2][x - 1].available = true;
          }
          if (y - 2 >= 0 && x - 1 >= 0 && theBoard[y - 2][x - 1].colour === opponentColour) {
            fill(255, 25, 25, 125);
            rect((x - 1) * (boardSize / columns), (y - 2) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y - 2][x - 1].available = true;
          }

          if (y + 2 < rows && x + 1 < columns && theBoard[y + 2][x + 1].piece === 'none') {
            fill(25, 255, 25, 125);
            rect((x + 1) * (boardSize / columns), (y + 2) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y + 2][x + 1].available = true;
          }
          if (y + 2 < rows && x + 1 < columns && theBoard[y + 2][x + 1].colour === opponentColour) {
            fill(255, 25, 25, 125);
            rect((x + 1) * (boardSize / columns), (y + 2) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y + 2][x + 1].available = true;
          }

          if (y + 2 < rows && x - 1 >= 0 && theBoard[y + 2][x - 1].piece === 'none') {
            fill(25, 255, 25, 125);
            rect((x - 1) * (boardSize / columns), (y + 2) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y + 2][x - 1].available = true;
          }
          if (y + 2 < rows && x - 1 >= 0 && theBoard[y + 2][x - 1].colour === opponentColour) {
            fill(255, 25, 25, 125);
            rect((x - 1) * (boardSize / columns), (y + 2) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y + 2][x - 1].available = true;
          }
        }
      }
    }
  }

  movePiece();
}

function moveBishop() {
  selectPiece();

  let checkList = [
    [-1, -1], // stands for the diagonal line at the bottom left
    [-1, +1], // stands for the diagonal line at the top    left
    [+1, +1], // stands for the diagonal line at the top    right
    [+1, -1], // stands for the diagonal line at the bottom right
  ];
  let colourList = ['black', 'white'];

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      for (let counter = 0; counter < colourList.length; counter++) {
        let selectedColour = colourList[counter % 2];
        let opponentColour = colourList[(counter + 1) % 2];

        if (theBoard[y][x].piece === 'bishop' && theBoard[y][x].selected && theBoard[y][x].colour === selectedColour) {
          initializingAvailability();

          for (let i = 0; i < checkList.length; i++) {
            let a = 1;
            while (y + checkList[i][0]*a >= 0 && y + checkList[i][0]*a < rows &&
              x + checkList[i][1]*a >= 0 && x + checkList[i][1]*a < columns &&
              theBoard[y + checkList[i][0]*a][x + checkList[i][1]*a].piece === 'none') {
                fill(25, 255, 25, 125);
                rect((x + checkList[i][1]*a) * (boardSize / columns), (y + checkList[i][0]*a) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y + checkList[i][0]*a][x + checkList[i][1]*a].available = true;
                a ++;
            }

            // if the while stops at some spot, we will check if the spot is taken by any opponent pieces
            if (y + checkList[i][0]*a >= 0 && y + checkList[i][0]*a < rows &&
              x + checkList[i][1]*a >= 0 && x + checkList[i][1]*a < columns &&
              theBoard[y + checkList[i][0]*a][x + checkList[i][1]*a].colour === opponentColour) {
                fill(255, 25, 25, 125);
                rect((x + checkList[i][1]*a) * (boardSize / columns), (y + checkList[i][0]*a) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y + checkList[i][0]*a][x + checkList[i][1]*a].available = true;
            }
          }
        }
      }
    }
  }

  movePiece();
}

function moveRook() {
  selectPiece();

  let checkList = [-1, 1];
  let colourList = ['black', 'white'];

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      for (let counter = 0; counter < colourList.length; counter++) {
        let selectedColour = colourList[counter % 2];
        let opponentColour = colourList[(counter + 1) % 2];

        if (theBoard[y][x].piece === 'rook' && theBoard[y][x].selected && theBoard[y][x].colour === selectedColour) {
          initializingAvailability();

          // check the horizontal line
          for (let i = 0; i < checkList.length; i ++) {
            let a = 1;

            while (x + checkList[i]*a >= 0 && x + checkList[i]*a < columns && theBoard[y][x + checkList[i]*a].piece === 'none') {
              fill(25, 255, 25, 125);
              rect((x + checkList[i]*a) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
              theBoard[y][x + checkList[i]*a].available = true;
              a ++;
            }

            if (x + checkList[i]*a >= 0 && x + checkList[i]*a < columns && theBoard[y][x + checkList[i]*a].colour === opponentColour) {
              fill(255, 25, 25, 125);
              rect((x + checkList[i]*a) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
              theBoard[y][x + checkList[i]*a].available = true;
            }
          }

          // check the vertical line
          for (let i = 0; i < checkList.length; i ++) {
            let b = 1;

            while (y + checkList[i]*b >= 0 && y + checkList[i]*b < rows && theBoard[y + checkList[i]*b][x].piece === 'none') {
              fill(25, 255, 25, 125);
              rect(x * (boardSize / rows), (y + checkList[i]*b) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
              theBoard[y + checkList[i]*b][x].available = true;
              b ++;
            }
            
            if (y + checkList[i]*b >= 0 && y + checkList[i]*b < rows && theBoard[y + checkList[i]*b][x].colour === opponentColour) {
              fill(255, 25, 25, 125);
              rect((x) * (boardSize / columns), (y + checkList[i]*b) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
              theBoard[y + checkList[i]*b][x].available = true;
            }
          }
        }
      }
    }
  }

  movePiece();
}

function moveQueen() {
  selectPiece();

  let checkList1 = [
    [-1, -1],
    [-1, +1],
    [+1, +1],
    [+1, -1],
  ];

  let checkList2 = [-1, 1];

  let colourList = ['black', 'white'];

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      for (let counter = 0; counter < colourList.length; counter++) {
        let selectedColour = colourList[counter % 2];
        let opponentColour = colourList[(counter + 1) % 2];

        if (theBoard[y][x].piece === 'queen' && theBoard[y][x].selected && theBoard[y][x].colour === selectedColour) {
          initializingAvailability();

          for (let i = 0; i < checkList1.length; i++) {
            let a = 1;
            while (y + checkList1[i][0]*a >= 0 && y + checkList1[i][0]*a < rows &&
              x + checkList1[i][1]*a >= 0 && x + checkList1[i][1]*a < columns &&
              theBoard[y + checkList1[i][0]*a][x + checkList1[i][1]*a].piece === 'none') {
                fill(25, 255, 25, 125);
                rect((x + checkList1[i][1]*a) * (boardSize / columns), (y + checkList1[i][0]*a) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y + checkList1[i][0]*a][x + checkList1[i][1]*a].available = true;
                a ++;
            }
            
            if (y + checkList1[i][0]*a >= 0 && y + checkList1[i][0]*a < rows &&
              x + checkList1[i][1]*a >= 0 && x + checkList1[i][1]*a < columns &&
              theBoard[y + checkList1[i][0]*a][x + checkList1[i][1]*a].colour === opponentColour) {
                fill(255, 25, 25, 125);
                rect((x + checkList1[i][1]*a) * (boardSize / columns), (y + checkList1[i][0]*a) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y + checkList1[i][0]*a][x + checkList1[i][1]*a].available = true;
            }
          }

          for (let i = 0; i < checkList2.length; i ++) {
            let a = 1;

            while (x + checkList2[i]*a >= 0 && x + checkList2[i]*a < columns && theBoard[y][x + checkList2[i]*a].piece === 'none') {
              fill(25, 255, 25, 125);
              rect((x + checkList2[i]*a) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
              theBoard[y][x + checkList2[i]*a].available = true;
              a ++;
            }

            if (x + checkList2[i]*a >= 0 && x + checkList2[i]*a < columns && theBoard[y][x + checkList2[i]*a].colour === opponentColour) {
              fill(255, 25, 25, 125);
              rect((x + checkList2[i]*a) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
              theBoard[y][x + checkList2[i]*a].available = true;
            }
          }

          for (let i = 0; i < checkList2.length; i ++) {
            let b = 1;

            while (y + checkList2[i]*b >= 0 && y + checkList2[i]*b < rows && theBoard[y + checkList2[i]*b][x].piece === 'none') {
              fill(25, 255, 25, 125);
              rect(x * (boardSize / rows), (y + checkList2[i]*b) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
              theBoard[y + checkList2[i]*b][x].available = true;
              b ++;
            }
            
            if (y + checkList2[i]*b >= 0 && y + checkList2[i]*b < rows && theBoard[y + checkList2[i]*b][x].colour === opponentColour) {
              fill(255, 25, 25, 125);
              rect((x) * (boardSize / columns), (y + checkList2[i]*b) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
              theBoard[y + checkList2[i]*b][x].available = true;
            }
          }
        }
      }
    }
  }

  movePiece();
}

function moveKing() {
  selectPiece();

  let colourList = ['black', 'white'];

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      for (let counter = 0; counter < colourList.length; counter++) {
        let selectedColour = colourList[counter % 2];
        let opponentColour = colourList[(counter + 1) % 2];

        if (theBoard[y][x].piece === 'king' && theBoard[y][x].selected && theBoard[y][x].colour === selectedColour) {
          initializingAvailability();

          for (let i = -1; i <= 1; i ++) {
            for (let j = -1; j <= 1; j ++) {
              if (rows > y + i && y + i >= 0 && columns > x + j && x + j >= 0 && theBoard[y + i][x + j].piece === 'none') {
                fill(25, 255, 25, 125);
                rect((x + j) * (boardSize / columns), (y + i) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y + i][x + j].available = true;
              }
              if (rows > y + i && y + i >= 0 && columns > x + j && x + j >= 0 && theBoard[y + i][x + j].colour === opponentColour) {
                fill(255, 25, 25, 125);
                rect((x + j) * (boardSize / columns), (y + i) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y + i][x + j].available = true;
              }
            }
          }

          // if king is selected, we should detect whether it can castle
          if (theBoard[y][x].colour === 'white' && whiteCastleKingSide && theBoard[y][x + 1].colour === 'none' && theBoard[y][x + 2].colour === 'none') {
            fill(25, 255, 25, 125);
            circle((x + 2.5) * (boardSize / columns), (y + 0.5) * (boardSize / rows), 25, 25);
            theBoard[y][x + 2].available = true;
          }
          if (theBoard[y][x].colour === 'white' && whiteCastleQueenSide && theBoard[y][x - 1].colour === 'none' && theBoard[y][x - 2].colour === 'none' && theBoard[y][x - 3].colour === 'none') {
            fill(25, 255, 25, 125);
            circle((x - 1.5) * (boardSize / columns), (y + 0.5) * (boardSize / rows), 25, 25);
            theBoard[y][x - 2].available = true;
          }
          if (theBoard[y][x].colour === 'black' && blackCastleKingSide && theBoard[y][x + 1].colour === 'none' && theBoard[y][x + 2].colour === 'none') {
            fill(25, 255, 25, 125);
            circle((x + 2.5) * (boardSize / columns), (y + 0.5) * (boardSize / rows), 25, 25);
            theBoard[y][x + 2].available = true;
          }
          if (theBoard[y][x].colour === 'black' && blackCastleQueenSide && theBoard[y][x - 1].colour === 'none' && theBoard[y][x - 2].colour === 'none' && theBoard[y][x - 3].colour === 'none') {
            fill(25, 255, 25, 125);
            circle((x - 1.5) * (boardSize / columns), (y + 0.5) * (boardSize / rows), 25, 25);
            theBoard[y][x - 2].available = true;
          }
        }
      }
    }
  }

  movePiece();
}
