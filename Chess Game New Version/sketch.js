let rows = 8;
let columns = 8;
let boardSize = 720;

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

let pos = [
  ['none', 'none'],
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
  fill(0)
  createCanvas(boardSize, boardSize);

  boardSetUp();
}

function draw() {
  background('black');

  for (let i = 0; i < theBoard.length; i++) {
    for (let j = 0; j < theBoard[i].length; j++) {
      theBoard[i][j].showCell();
      theBoard[i][j].showPiece();
    }
  };

  movePawn();
  moveKnight();
  moveBishop();
  moveRook();
  moveQueen();
  moveKing();
}



function boardSetUp() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let cell = new Cell(i, j, 'none', 'none', false, false);
      theBoard[i].push(cell);
    }
  };

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
}

function selectPiece() {
  
  if (mouseIsPressed) {
    let j = floor(mouseY / (boardSize / columns));
    let i = floor(mouseX / (boardSize / rows));

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        if (y !== j || x !== i) {
          theBoard[y][x].selected = false;
        }
      }
    }

    if (theBoard[j][i].piece !== 'none' && !theBoard[j][i].available) {
      theBoard[j][i].selected = true;
    } 
    else if (theBoard[j][i].piece === 'none') {
      for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
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

  for (let counter = 0; counter < theBoard.length; counter++) {
    for (let secondCounter = 0; secondCounter < theBoard[counter].length; secondCounter++) {
      if (theBoard[counter][secondCounter].selected) {
        if (pos[pos.length - 1][0] !== theBoard[counter][secondCounter].i || pos[pos.length - 1][1] !== theBoard[counter][secondCounter].j)
        pos.push([counter, secondCounter]);
      }
    }
  }


  if (mouseIsPressed) {
    let j = floor(mouseY / (boardSize / columns));
    let i = floor(mouseX / (boardSize / rows));

    if (theBoard[j][i].available) {
      pieceColour = theBoard[pos[pos.length - 1][0]][pos[pos.length - 1][1]].colour;
      pieceType = theBoard[pos[pos.length - 1][0]][pos[pos.length - 1][1]].piece;
      theBoard[pos[pos.length - 1][0]][pos[pos.length - 1][1]].colour = 'none';
      theBoard[pos[pos.length - 1][0]][pos[pos.length - 1][1]].piece = 'none';

      theBoard[j][i].colour = pieceColour;
      theBoard[j][i].piece = pieceType;
      theBoard[j][i].available = false;

    }
  }
}

function initializingAvailability() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      theBoard[y][x].available = false;
    }
  }
}



function movePawn() {
  selectPiece();

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
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
    [-1, -1],
    [-1, +1],
    [+1, +1],
    [+1, -1],
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
            if (y + checkList[i][0]*1 >= 0 && y + checkList[i][0]*1 < rows &&
            x + checkList[i][1]*1 >= 0 && x + checkList[i][1]*1 < columns &&
            theBoard[y + checkList[i][0]*1][x + checkList[i][1]*1].piece === 'none') {
              fill(25, 255, 25, 125);
              rect((x + checkList[i][1]*1) * (boardSize / columns), (y + checkList[i][0]*1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
              if (y + checkList[i][0]*2 >= 0 && y + checkList[i][0]*2 < rows &&
              x + checkList[i][1]*2 >= 0 && x + checkList[i][1]*2 < columns &&
              theBoard[y + checkList[i][0]*2][x + checkList[i][1]*2].piece === 'none') {
                fill(25, 255, 25, 125);
                rect((x + checkList[i][1]*2) * (boardSize / columns), (y + checkList[i][0]*2) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                if (y + checkList[i][0]*3 >= 0 && y + checkList[i][0]*3 < rows &&
                x + checkList[i][1]*3 >= 0 && x + checkList[i][1]*3 < columns &&
                theBoard[y + checkList[i][0]*3][x + checkList[i][1]*3].piece === 'none') {
                  fill(25, 255, 25, 125);
                  rect((x + checkList[i][1]*3) * (boardSize / columns), (y + checkList[i][0]*3) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                  if (y + checkList[i][0]*4 >= 0 && y + checkList[i][0]*4 < rows &&
                  x + checkList[i][1]*4 >= 0 && x + checkList[i][1]*4 < columns &&
                  theBoard[y + checkList[i][0]*4][x + checkList[i][1]*4].piece === 'none') {
                    fill(25, 255, 25, 125);
                    rect((x + checkList[i][1]*4) * (boardSize / columns), (y + checkList[i][0]*4) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                    if (y + checkList[i][0]*5 >= 0 && y + checkList[i][0]*5 < rows &&
                    x + checkList[i][1]*5 >= 0 && x + checkList[i][1]*5 < columns &&
                    theBoard[y + checkList[i][0]*5][x + checkList[i][1]*5].piece === 'none') {
                      fill(25, 255, 25, 125);
                      rect((x + checkList[i][1]*5) * (boardSize / columns), (y + checkList[i][0]*5) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                      if (y + checkList[i][0]*6 >= 0 && y + checkList[i][0]*6 < rows &&
                      x + checkList[i][1]*6 >= 0 && x + checkList[i][1]*6 < columns &&
                      theBoard[y + checkList[i][0]*6][x + checkList[i][1]*6].piece === 'none') {
                        fill(25, 255, 25, 125);
                        rect((x + checkList[i][1]*6) * (boardSize / columns), (y + checkList[i][0]*6) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                        if (y + checkList[i][0]*7 >= 0 && y + checkList[i][0]*7 < rows &&
                        x + checkList[i][1]*7 >= 0 && x + checkList[i][1]*7 < columns &&
                        theBoard[y + checkList[i][0]*7][x + checkList[i][1]*7].piece === 'none') {
                          fill(25, 255, 25, 125);
                          rect((x + checkList[i][1]*7) * (boardSize / columns), (y + checkList[i][0]*7) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                          theBoard[y + checkList[i][0]*7][x + checkList[i][1]*7].available = true;
                        }
                        if (y + checkList[i][0]*7 >= 0 && y + checkList[i][0]*7 < rows &&
                          x + checkList[i][1]*7 >= 0 && x + checkList[i][1]*7 < columns &&
                          theBoard[y + checkList[i][0]*7][x + checkList[i][1]*7].colour === opponentColour) {
                          fill(255, 25, 25, 125);
                          rect((x + checkList[i][1]*7) * (boardSize / columns), (y + checkList[i][0]*7) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                          theBoard[y + checkList[i][0]*7][x + checkList[i][1]*7].available = true;
                        }
                        theBoard[y + checkList[i][0]*6][x + checkList[i][1]*6].available = true;
                      }
                      if (y + checkList[i][0]*6 >= 0 && y + checkList[i][0]*6 < rows &&
                        x + checkList[i][1]*6 >= 0 && x + checkList[i][1]*6 < columns &&
                        theBoard[y + checkList[i][0]*6][x + checkList[i][1]*6].colour === opponentColour) {
                        fill(255, 25, 25, 125);
                        rect((x + checkList[i][1]*6) * (boardSize / columns), (y + checkList[i][0]*6) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                        theBoard[y + checkList[i][0]*6][x + checkList[i][1]*6].available = true;
                      }
                      theBoard[y + checkList[i][0]*5][x + checkList[i][1]*5].available = true;
                    }
                    if (y + checkList[i][0]*5 >= 0 && y + checkList[i][0]*5 < rows &&
                      x + checkList[i][1]*5 >= 0 && x + checkList[i][1]*5 < columns &&
                      theBoard[y + checkList[i][0]*5][x + checkList[i][1]*5].colour === opponentColour) {
                      fill(255, 25, 25, 125);
                      rect((x + checkList[i][1]*5) * (boardSize / columns), (y + checkList[i][0]*5) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                      theBoard[y + checkList[i][0]*5][x + checkList[i][1]*5].available = true;
                    }
                    theBoard[y + checkList[i][0]*4][x + checkList[i][1]*4].available = true;
                  }
                  if (y + checkList[i][0]*4 >= 0 && y + checkList[i][0]*4 < rows &&
                    x + checkList[i][1]*4 >= 0 && x + checkList[i][1]*4 < columns &&
                    theBoard[y + checkList[i][0]*4][x + checkList[i][1]*4].colour === opponentColour) {
                    fill(255, 25, 25, 125);
                    rect((x + checkList[i][1]*4) * (boardSize / columns), (y + checkList[i][0]*4) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                    theBoard[y + checkList[i][0]*4][x + checkList[i][1]*4].available = true;
                  }
                  theBoard[y + checkList[i][0]*3][x + checkList[i][1]*3].available = true;
                }
                if (y + checkList[i][0]*3 >= 0 && y + checkList[i][0]*3 < rows &&
                  x + checkList[i][1]*3 >= 0 && x + checkList[i][1]*3 < columns &&
                  theBoard[y + checkList[i][0]*3][x + checkList[i][1]*3].colour === opponentColour) {
                  fill(255, 25, 25, 125);
                  rect((x + checkList[i][1]*3) * (boardSize / columns), (y + checkList[i][0]*3) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                  theBoard[y + checkList[i][0]*3][x + checkList[i][1]*3].available = true;
                }
                theBoard[y + checkList[i][0]*2][x + checkList[i][1]*2].available = true;
              }
              if (y + checkList[i][0]*2 >= 0 && y + checkList[i][0]*2 < rows &&
                x + checkList[i][1]*2 >= 0 && x + checkList[i][1]*2 < columns &&
                theBoard[y + checkList[i][0]*2][x + checkList[i][1]*2].colour === opponentColour) {
                fill(255, 25, 25, 125);
                rect((x + checkList[i][1]*2) * (boardSize / columns), (y + checkList[i][0]*2) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y + checkList[i][0]*2][x + checkList[i][1]*2].available = true;
              }
              theBoard[y + checkList[i][0]*1][x + checkList[i][1]*1].available = true;
            }
            if (y + checkList[i][0]*1 >= 0 && y + checkList[i][0]*1 < rows &&
              x + checkList[i][1]*1 >= 0 && x + checkList[i][1]*1 < columns &&
              theBoard[y + checkList[i][0]*1][x + checkList[i][1]*1].colour === opponentColour) {
              fill(255, 25, 25, 125);
              rect((x + checkList[i][1]*1) * (boardSize / columns), (y + checkList[i][0]*1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
              theBoard[y + checkList[i][0]*1][x + checkList[i][1]*1].available = true;
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

          for (let i = 0; i < checkList.length; i ++) {
            if (x + checkList[i]*1 >= 0 && x + checkList[i]*1 < columns && theBoard[y][x + checkList[i]*1].piece === 'none') {
              fill(25, 255, 25, 125);
              rect((x + checkList[i]*1) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
              if (x + checkList[i]*2 >= 0 && x + checkList[i]*2 < columns && theBoard[y][x + checkList[i]*2].piece === 'none') {
                fill(25, 255, 25, 125);
                rect((x + checkList[i]*2) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                if (x + checkList[i]*3 >= 0 && x + checkList[i]*3 < columns && theBoard[y][x + checkList[i]*3].piece === 'none') {
                  fill(25, 255, 25, 125);
                  rect((x + checkList[i]*3) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                  if (x + checkList[i]*4 >= 0 && x + checkList[i]*4 < columns && theBoard[y][x + checkList[i]*4].piece === 'none') {
                    fill(25, 255, 25, 125);
                    rect((x + checkList[i]*4) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                    if (x + checkList[i]*5 >= 0 && x + checkList[i]*5 < columns && theBoard[y][x + checkList[i]*5].piece === 'none') {
                      fill(25, 255, 25, 125);
                      rect((x + checkList[i]*5) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                      if (x + checkList[i]*6 >= 0 && x + checkList[i]*6 < columns && theBoard[y][x + checkList[i]*6].piece === 'none') {
                        fill(25, 255, 25, 125);
                        rect((x + checkList[i]*6) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                        if (x + checkList[i]*7 >= 0 && x + checkList[i]*7 < columns && theBoard[y][x + checkList[i]*7].piece === 'none') {
                          fill(25, 255, 25, 125);
                          rect((x + checkList[i]*7) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                          theBoard[y][x + checkList[i]*7].available = true;
                        }
                        if (x + checkList[i]*7 >= 0 && x + checkList[i]*7 < columns && theBoard[y][x + checkList[i]*7].colour === opponentColour) {
                          fill(255, 25, 25, 125);
                          rect((x + checkList[i]*7) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                          theBoard[y][x + checkList[i]*7].available = true;
                        }
                        theBoard[y][x + checkList[i]*6].available = true;
                      }
                      if (x + checkList[i]*6 >= 0 && x + checkList[i]*6 < columns && theBoard[y][x + checkList[i]*6].colour === opponentColour) {
                        fill(255, 25, 25, 125);
                        rect((x + checkList[i]*6) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                        theBoard[y][x + checkList[i]*6].available = true;
                      }
                      theBoard[y][x + checkList[i]*5].available = true;
                    }
                    if (x + checkList[i]*5 >= 0 && x + checkList[i]*5 < columns && theBoard[y][x + checkList[i]*5].colour === opponentColour) {
                      fill(255, 25, 25, 125);
                      rect((x + checkList[i]*5) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                      theBoard[y][x + checkList[i]*5].available = true;
                    }
                    theBoard[y][x + checkList[i]*4].available = true;
                  }
                  if (x + checkList[i]*4 >= 0 && x + checkList[i]*4 < columns && theBoard[y][x + checkList[i]*4].colour === opponentColour) {
                    fill(255, 25, 25, 125);
                    rect((x + checkList[i]*4) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                    theBoard[y][x + checkList[i]*4].available = true;
                  }
                  theBoard[y][x + checkList[i]*3].available = true;
                }
                if (x + checkList[i]*3 >= 0 && x + checkList[i]*3 < columns && theBoard[y][x + checkList[i]*3].colour === opponentColour) {
                  fill(255, 25, 25, 125);
                  rect((x + checkList[i]*3) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                  theBoard[y][x + checkList[i]*3].available = true;
                }
                theBoard[y][x + checkList[i]*2].available = true;
              }
              if (x + checkList[i]*2 >= 0 && x + checkList[i]*2 < columns && theBoard[y][x + checkList[i]*2].colour === opponentColour) {
                fill(255, 25, 25, 125);
                rect((x + checkList[i]*2) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y][x + checkList[i]*2].available = true;
              }
              theBoard[y][x + checkList[i]*1].available = true;
            }
            if (x + checkList[i]*1 >= 0 && x + checkList[i]*1 < columns && theBoard[y][x + checkList[i]*1].colour === opponentColour) {
              fill(255, 25, 25, 125);
              rect((x + checkList[i]*1) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
              theBoard[y][x + checkList[i]*1].available = true;
            }
          }

          for (let i = 0; i < checkList.length; i ++) {
            if (y + checkList[i]*1 >= 0 && y + checkList[i]*1 < rows && theBoard[y + checkList[i]*1][x].piece === 'none') {
              fill(25, 255, 25, 125);
              rect(x * (boardSize / rows), (y + checkList[i]*1) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
              if (y + checkList[i]*2 >= 0 && y + checkList[i]*2 < rows && theBoard[y + checkList[i]*2][x].piece === 'none') {
                fill(25, 255, 25, 125);
                rect(x * (boardSize / rows), (y + checkList[i]*2) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                if (y + checkList[i]*3 >= 0 && y + checkList[i]*3 < rows && theBoard[y + checkList[i]*3][x].piece === 'none') {
                  fill(25, 255, 25, 125);
                  rect(x * (boardSize / rows), (y + checkList[i]*3) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                  if (y + checkList[i]*4 >= 0 && y + checkList[i]*4 < rows && theBoard[y + checkList[i]*4][x].piece === 'none') {
                    fill(25, 255, 25, 125);
                    rect(x * (boardSize / rows), (y + checkList[i]*4) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                    if (y + checkList[i]*5 >= 0 && y + checkList[i]*5 < rows && theBoard[y + checkList[i]*5][x].piece === 'none') {
                      fill(25, 255, 25, 125);
                      rect(x * (boardSize / rows), (y + checkList[i]*5) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                      if (y + checkList[i]*6 >= 0 && y + checkList[i]*6 < rows && theBoard[y + checkList[i]*6][x].piece === 'none') {
                        fill(25, 255, 25, 125);
                        rect(x * (boardSize / rows), (y + checkList[i]*6) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                        if (y + checkList[i]*7 >= 0 && y + checkList[i]*7 < rows && theBoard[y + checkList[i]*7][x].piece === 'none') {
                          fill(25, 255, 25, 125);
                          rect(x * (boardSize / rows), (y + checkList[i]*7) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                          theBoard[y + checkList[i]*7][x].available = true;
                        }
                        if (y + checkList[i]*7 >= 0 && y + checkList[i]*7 < rows && theBoard[y + checkList[i]*7][x].colour === opponentColour) {
                          fill(255, 25, 25, 125);
                          rect(x * (boardSize / rows), (y + checkList[i]*7) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                          theBoard[y + checkList[i]*7][x].available = true;
                        }
                        theBoard[y + checkList[i]*6][x].available = true;
                      }
                      if (y + checkList[i]*6 >= 0 && y + checkList[i]*6 < rows && theBoard[y + checkList[i]*6][x].colour === opponentColour) {
                        fill(255, 25, 25, 125);
                        rect(x * (boardSize / rows), (y + checkList[i]*6) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                        theBoard[y + checkList[i]*6][x].available = true;
                      }
                      theBoard[y + checkList[i]*5][x].available = true;
                    }
                    if (y + checkList[i]*5 >= 0 && y + checkList[i]*5 < rows && theBoard[y + checkList[i]*5][x].colour === opponentColour) {
                      fill(255, 25, 25, 125);
                      rect(x * (boardSize / rows), (y + checkList[i]*5) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                      theBoard[y + checkList[i]*5][x].available = true;
                    }
                    theBoard[y + checkList[i]*4][x].available = true;
                  }
                  if (y + checkList[i]*4 >= 0 && y + checkList[i]*4 < rows && theBoard[y + checkList[i]*4][x].colour === opponentColour) {
                    fill(255, 25, 25, 125);
                    rect(x * (boardSize / rows), (y + checkList[i]*4) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                    theBoard[y + checkList[i]*4][x].available = true;
                  }
                  theBoard[y + checkList[i]*3][x].available = true;
                }
                if (y + checkList[i]*3 >= 0 && y + checkList[i]*3 < rows && theBoard[y + checkList[i]*3][x].colour === opponentColour) {
                  fill(255, 25, 25, 125);
                  rect(x * (boardSize / rows), (y + checkList[i]*3) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                  theBoard[y + checkList[i]*3][x].available = true;
                }
                theBoard[y + checkList[i]*2][x].available = true;
              }
              if (y + checkList[i]*2 >= 0 && y + checkList[i]*2 < rows && theBoard[y + checkList[i]*2][x].colour === opponentColour) {
                fill(255, 25, 25, 125);
                rect(x * (boardSize / rows), (y + checkList[i]*2) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                theBoard[y + checkList[i]*2][x].available = true;
              }
              theBoard[y + checkList[i]*1][x].available = true;
            }
            if (y + checkList[i]*1 >= 0 && y + checkList[i]*1 < rows && theBoard[y + checkList[i]*1][x].colour === opponentColour) {
              fill(255, 25, 25, 125);
              rect(x * (boardSize / rows), (y + checkList[i]*1) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
              theBoard[y + checkList[i]*1][x].available = true;
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
            if (y + checkList1[i][0]*1 >= 0 && y + checkList1[i][0]*1 < rows &&
            x + checkList1[i][1]*1 >= 0 && x + checkList1[i][1]*1 < columns &&
            theBoard[y + checkList1[i][0]*1][x + checkList1[i][1]*1].piece === 'none') {
              fill(25, 255, 25, 125);
              rect((x + checkList1[i][1]*1) * (boardSize / columns), (y + checkList1[i][0]*1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
              if (y + checkList1[i][0]*2 >= 0 && y + checkList1[i][0]*2 < rows &&
              x + checkList1[i][1]*2 >= 0 && x + checkList1[i][1]*2 < columns &&
              theBoard[y + checkList1[i][0]*2][x + checkList1[i][1]*2].piece === 'none') {
                fill(25, 255, 25, 125);
                rect((x + checkList1[i][1]*2) * (boardSize / columns), (y + checkList1[i][0]*2) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                if (y + checkList1[i][0]*3 >= 0 && y + checkList1[i][0]*3 < rows &&
                x + checkList1[i][1]*3 >= 0 && x + checkList1[i][1]*3 < columns &&
                theBoard[y + checkList1[i][0]*3][x + checkList1[i][1]*3].piece === 'none') {
                  fill(25, 255, 25, 125);
                  rect((x + checkList1[i][1]*3) * (boardSize / columns), (y + checkList1[i][0]*3) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                  if (y + checkList1[i][0]*4 >= 0 && y + checkList1[i][0]*4 < rows &&
                  x + checkList1[i][1]*4 >= 0 && x + checkList1[i][1]*4 < columns &&
                  theBoard[y + checkList1[i][0]*4][x + checkList1[i][1]*4].piece === 'none') {
                    fill(25, 255, 25, 125);
                    rect((x + checkList1[i][1]*4) * (boardSize / columns), (y + checkList1[i][0]*4) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                    if (y + checkList1[i][0]*5 >= 0 && y + checkList1[i][0]*5 < rows &&
                    x + checkList1[i][1]*5 >= 0 && x + checkList1[i][1]*5 < columns &&
                    theBoard[y + checkList1[i][0]*5][x + checkList1[i][1]*5].piece === 'none') {
                      fill(25, 255, 25, 125);
                      rect((x + checkList1[i][1]*5) * (boardSize / columns), (y + checkList1[i][0]*5) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                      if (y + checkList1[i][0]*6 >= 0 && y + checkList1[i][0]*6 < rows &&
                      x + checkList1[i][1]*6 >= 0 && x + checkList1[i][1]*6 < columns &&
                      theBoard[y + checkList1[i][0]*6][x + checkList1[i][1]*6].piece === 'none') {
                        fill(25, 255, 25, 125);
                        rect((x + checkList1[i][1]*6) * (boardSize / columns), (y + checkList1[i][0]*6) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                        if (y + checkList1[i][0]*7 >= 0 && y + checkList1[i][0]*7 < rows &&
                        x + checkList1[i][1]*7 >= 0 && x + checkList1[i][1]*7 < columns &&
                        theBoard[y + checkList1[i][0]*7][x + checkList1[i][1]*7].piece === 'none') {
                          fill(25, 255, 25, 125);
                          rect((x + checkList1[i][1]*7) * (boardSize / columns), (y + checkList1[i][0]*7) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                          theBoard[y + checkList1[i][0]*7][x + checkList1[i][1]*7].available = true;
                        }
                        if (y + checkList1[i][0]*7 >= 0 && y + checkList1[i][0]*7 < rows &&
                          x + checkList1[i][1]*7 >= 0 && x + checkList1[i][1]*7 < columns &&
                          theBoard[y + checkList1[i][0]*7][x + checkList1[i][1]*7].colour === opponentColour) {
                          fill(255, 25, 25, 125);
                          rect((x + checkList1[i][1]*7) * (boardSize / columns), (y + checkList1[i][0]*7) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                          theBoard[y + checkList1[i][0]*7][x + checkList1[i][1]*7].available = true;
                        }
                        theBoard[y + checkList1[i][0]*6][x + checkList1[i][1]*6].available = true;
                      }
                      if (y + checkList1[i][0]*6 >= 0 && y + checkList1[i][0]*6 < rows &&
                        x + checkList1[i][1]*6 >= 0 && x + checkList1[i][1]*6 < columns &&
                        theBoard[y + checkList1[i][0]*6][x + checkList1[i][1]*6].colour === opponentColour) {
                        fill(255, 25, 25, 125);
                        rect((x + checkList1[i][1]*6) * (boardSize / columns), (y + checkList1[i][0]*6) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                        theBoard[y + checkList1[i][0]*6][x + checkList1[i][1]*6].available = true;
                      }
                      theBoard[y + checkList1[i][0]*5][x + checkList1[i][1]*5].available = true;
                    }
                    if (y + checkList1[i][0]*5 >= 0 && y + checkList1[i][0]*5 < rows &&
                      x + checkList1[i][1]*5 >= 0 && x + checkList1[i][1]*5 < columns &&
                      theBoard[y + checkList1[i][0]*5][x + checkList1[i][1]*5].colour === opponentColour) {
                      fill(255, 25, 25, 125);
                      rect((x + checkList1[i][1]*5) * (boardSize / columns), (y + checkList1[i][0]*5) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                      theBoard[y + checkList1[i][0]*5][x + checkList1[i][1]*5].available = true;
                    }
                    theBoard[y + checkList1[i][0]*4][x + checkList1[i][1]*4].available = true;
                  }
                  if (y + checkList1[i][0]*4 >= 0 && y + checkList1[i][0]*4 < rows &&
                    x + checkList1[i][1]*4 >= 0 && x + checkList1[i][1]*4 < columns &&
                    theBoard[y + checkList1[i][0]*4][x + checkList1[i][1]*4].colour === opponentColour) {
                    fill(255, 25, 25, 125);
                    rect((x + checkList1[i][1]*4) * (boardSize / columns), (y + checkList1[i][0]*4) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                    theBoard[y + checkList1[i][0]*4][x + checkList1[i][1]*4].available = true;
                  }
                  theBoard[y + checkList1[i][0]*3][x + checkList1[i][1]*3].available = true;
                }
                if (y + checkList1[i][0]*3 >= 0 && y + checkList1[i][0]*3 < rows &&
                  x + checkList1[i][1]*3 >= 0 && x + checkList1[i][1]*3 < columns &&
                  theBoard[y + checkList1[i][0]*3][x + checkList1[i][1]*3].colour === opponentColour) {
                  fill(255, 25, 25, 125);
                  rect((x + checkList1[i][1]*3) * (boardSize / columns), (y + checkList1[i][0]*3) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                  theBoard[y + checkList1[i][0]*3][x + checkList1[i][1]*3].available = true;
                }
                theBoard[y + checkList1[i][0]*2][x + checkList1[i][1]*2].available = true;
              }
              if (y + checkList1[i][0]*2 >= 0 && y + checkList1[i][0]*2 < rows &&
                x + checkList1[i][1]*2 >= 0 && x + checkList1[i][1]*2 < columns &&
                theBoard[y + checkList1[i][0]*2][x + checkList1[i][1]*2].colour === opponentColour) {
                fill(255, 25, 25, 125);
                rect((x + checkList1[i][1]*2) * (boardSize / columns), (y + checkList1[i][0]*2) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y + checkList1[i][0]*2][x + checkList1[i][1]*2].available = true;
              }
              theBoard[y + checkList1[i][0]*1][x + checkList1[i][1]*1].available = true;
            }
            if (y + checkList1[i][0]*1 >= 0 && y + checkList1[i][0]*1 < rows &&
              x + checkList1[i][1]*1 >= 0 && x + checkList1[i][1]*1 < columns &&
              theBoard[y + checkList1[i][0]*1][x + checkList1[i][1]*1].colour === opponentColour) {
              fill(255, 25, 25, 125);
              rect((x + checkList1[i][1]*1) * (boardSize / columns), (y + checkList1[i][0]*1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
              theBoard[y + checkList1[i][0]*1][x + checkList1[i][1]*1].available = true;
            }
          }

          for (let i = 0; i < checkList2.length; i ++) {
            if (x + checkList2[i]*1 >= 0 && x + checkList2[i]*1 < columns && theBoard[y][x + checkList2[i]*1].piece === 'none') {
              fill(25, 255, 25, 125);
              rect((x + checkList2[i]*1) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
              if (x + checkList2[i]*2 >= 0 && x + checkList2[i]*2 < columns && theBoard[y][x + checkList2[i]*2].piece === 'none') {
                fill(25, 255, 25, 125);
                rect((x + checkList2[i]*2) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                if (x + checkList2[i]*3 >= 0 && x + checkList2[i]*3 < columns && theBoard[y][x + checkList2[i]*3].piece === 'none') {
                  fill(25, 255, 25, 125);
                  rect((x + checkList2[i]*3) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                  if (x + checkList2[i]*4 >= 0 && x + checkList2[i]*4 < columns && theBoard[y][x + checkList2[i]*4].piece === 'none') {
                    fill(25, 255, 25, 125);
                    rect((x + checkList2[i]*4) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                    if (x + checkList2[i]*5 >= 0 && x + checkList2[i]*5 < columns && theBoard[y][x + checkList2[i]*5].piece === 'none') {
                      fill(25, 255, 25, 125);
                      rect((x + checkList2[i]*5) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                      if (x + checkList2[i]*6 >= 0 && x + checkList2[i]*6 < columns && theBoard[y][x + checkList2[i]*6].piece === 'none') {
                        fill(25, 255, 25, 125);
                        rect((x + checkList2[i]*6) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                        if (x + checkList2[i]*7 >= 0 && x + checkList2[i]*7 < columns && theBoard[y][x + checkList2[i]*7].piece === 'none') {
                          fill(25, 255, 25, 125);
                          rect((x + checkList2[i]*7) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                          theBoard[y][x + checkList2[i]*7].available = true;
                        }
                        if (x + checkList2[i]*7 >= 0 && x + checkList2[i]*7 < columns && theBoard[y][x + checkList2[i]*7].colour === opponentColour) {
                          fill(255, 25, 25, 125);
                          rect((x + checkList2[i]*7) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                          theBoard[y][x + checkList2[i]*7].available = true;
                        }
                        theBoard[y][x + checkList2[i]*6].available = true;
                      }
                      if (x + checkList2[i]*6 >= 0 && x + checkList2[i]*6 < columns && theBoard[y][x + checkList2[i]*6].colour === opponentColour) {
                        fill(255, 25, 25, 125);
                        rect((x + checkList2[i]*6) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                        theBoard[y][x + checkList2[i]*6].available = true;
                      }
                      theBoard[y][x + checkList2[i]*5].available = true;
                    }
                    if (x + checkList2[i]*5 >= 0 && x + checkList2[i]*5 < columns && theBoard[y][x + checkList2[i]*5].colour === opponentColour) {
                      fill(255, 25, 25, 125);
                      rect((x + checkList2[i]*5) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                      theBoard[y][x + checkList2[i]*5].available = true;
                    }
                    theBoard[y][x + checkList2[i]*4].available = true;
                  }
                  if (x + checkList2[i]*4 >= 0 && x + checkList2[i]*4 < columns && theBoard[y][x + checkList2[i]*4].colour === opponentColour) {
                    fill(255, 25, 25, 125);
                    rect((x + checkList2[i]*4) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                    theBoard[y][x + checkList2[i]*4].available = true;
                  }
                  theBoard[y][x + checkList2[i]*3].available = true;
                }
                if (x + checkList2[i]*3 >= 0 && x + checkList2[i]*3 < columns && theBoard[y][x + checkList2[i]*3].colour === opponentColour) {
                  fill(255, 25, 25, 125);
                  rect((x + checkList2[i]*3) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                  theBoard[y][x + checkList2[i]*3].available = true;
                }
                theBoard[y][x + checkList2[i]*2].available = true;
              }
              if (x + checkList2[i]*2 >= 0 && x + checkList2[i]*2 < columns && theBoard[y][x + checkList2[i]*2].colour === opponentColour) {
                fill(255, 25, 25, 125);
                rect((x + checkList2[i]*2) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y][x + checkList2[i]*2].available = true;
              }
              theBoard[y][x + checkList2[i]*1].available = true;
            }
            if (x + checkList2[i]*1 >= 0 && x + checkList2[i]*1 < columns && theBoard[y][x + checkList2[i]*1].colour === opponentColour) {
              fill(255, 25, 25, 125);
              rect((x + checkList2[i]*1) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
              theBoard[y][x + checkList2[i]*1].available = true;
            }
          }

          for (let i = 0; i < checkList2.length; i ++) {
            if (y + checkList2[i]*1 >= 0 && y + checkList2[i]*1 < rows && theBoard[y + checkList2[i]*1][x].piece === 'none') {
              fill(25, 255, 25, 125);
              rect(x * (boardSize / rows), (y + checkList2[i]*1) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
              if (y + checkList2[i]*2 >= 0 && y + checkList2[i]*2 < rows && theBoard[y + checkList2[i]*2][x].piece === 'none') {
                fill(25, 255, 25, 125);
                rect(x * (boardSize / rows), (y + checkList2[i]*2) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                if (y + checkList2[i]*3 >= 0 && y + checkList2[i]*3 < rows && theBoard[y + checkList2[i]*3][x].piece === 'none') {
                  fill(25, 255, 25, 125);
                  rect(x * (boardSize / rows), (y + checkList2[i]*3) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                  if (y + checkList2[i]*4 >= 0 && y + checkList2[i]*4 < rows && theBoard[y + checkList2[i]*4][x].piece === 'none') {
                    fill(25, 255, 25, 125);
                    rect(x * (boardSize / rows), (y + checkList2[i]*4) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                    if (y + checkList2[i]*5 >= 0 && y + checkList2[i]*5 < rows && theBoard[y + checkList2[i]*5][x].piece === 'none') {
                      fill(25, 255, 25, 125);
                      rect(x * (boardSize / rows), (y + checkList2[i]*5) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                      if (y + checkList2[i]*6 >= 0 && y + checkList2[i]*6 < rows && theBoard[y + checkList2[i]*6][x].piece === 'none') {
                        fill(25, 255, 25, 125);
                        rect(x * (boardSize / rows), (y + checkList2[i]*6) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                        if (y + checkList2[i]*7 >= 0 && y + checkList2[i]*7 < rows && theBoard[y + checkList2[i]*7][x].piece === 'none') {
                          fill(25, 255, 25, 125);
                          rect(x * (boardSize / rows), (y + checkList2[i]*7) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                          theBoard[y + checkList2[i]*7][x].available = true;
                        }
                        if (y + checkList2[i]*7 >= 0 && y + checkList2[i]*7 < rows && theBoard[y + checkList2[i]*7][x].colour === opponentColour) {
                          fill(255, 25, 25, 125);
                          rect(x * (boardSize / rows), (y + checkList2[i]*7) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                          theBoard[y + checkList2[i]*7][x].available = true;
                        }
                        theBoard[y + checkList2[i]*6][x].available = true;
                      }
                      if (y + checkList2[i]*6 >= 0 && y + checkList2[i]*6 < rows && theBoard[y + checkList2[i]*6][x].colour === opponentColour) {
                        fill(255, 25, 25, 125);
                        rect(x * (boardSize / rows), (y + checkList2[i]*6) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                        theBoard[y + checkList2[i]*6][x].available = true;
                      }
                      theBoard[y + checkList2[i]*5][x].available = true;
                    }
                    if (y + checkList2[i]*5 >= 0 && y + checkList2[i]*5 < rows && theBoard[y + checkList2[i]*5][x].colour === opponentColour) {
                      fill(255, 25, 25, 125);
                      rect(x * (boardSize / rows), (y + checkList2[i]*5) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                      theBoard[y + checkList2[i]*5][x].available = true;
                    }
                    theBoard[y + checkList2[i]*4][x].available = true;
                  }
                  if (y + checkList2[i]*4 >= 0 && y + checkList2[i]*4 < rows && theBoard[y + checkList2[i]*4][x].colour === opponentColour) {
                    fill(255, 25, 25, 125);
                    rect(x * (boardSize / rows), (y + checkList2[i]*4) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                    theBoard[y + checkList2[i]*4][x].available = true;
                  }
                  theBoard[y + checkList2[i]*3][x].available = true;
                }
                if (y + checkList2[i]*3 >= 0 && y + checkList2[i]*3 < rows && theBoard[y + checkList2[i]*3][x].colour === opponentColour) {
                  fill(255, 25, 25, 125);
                  rect(x * (boardSize / rows), (y + checkList2[i]*3) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                  theBoard[y + checkList2[i]*3][x].available = true;
                }
                theBoard[y + checkList2[i]*2][x].available = true;
              }
              if (y + checkList2[i]*2 >= 0 && y + checkList2[i]*2 < rows && theBoard[y + checkList2[i]*2][x].colour === opponentColour) {
                fill(255, 25, 25, 125);
                rect(x * (boardSize / rows), (y + checkList2[i]*2) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                theBoard[y + checkList2[i]*2][x].available = true;
              }
              theBoard[y + checkList2[i]*1][x].available = true;
            }
            if (y + checkList2[i]*1 >= 0 && y + checkList2[i]*1 < rows && theBoard[y + checkList2[i]*1][x].colour === opponentColour) {
              fill(255, 25, 25, 125);
              rect(x * (boardSize / rows), (y + checkList2[i]*1) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
              theBoard[y + checkList2[i]*1][x].available = true;
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

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      if (theBoard[y][x].piece === 'king' && theBoard[y][x].selected && theBoard[y][x].colour === 'white') {
        initializingAvailability();
        if (y - 1 >= 0 && x - 1 >= 0 && theBoard[y - 1][x - 1].piece === 'none') {
          fill(25, 255, 25, 125);
          rect((x - 1) * (boardSize / columns), (y - 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y - 1][x - 1].available = true;
        }
        if (y - 1 >= 0 && x - 1 >= 0 && theBoard[y - 1][x - 1].colour === 'black') {
          fill(255, 25, 25, 125);
          rect((x - 1) * (boardSize / columns), (y - 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y - 1][x - 1].available = true;
        }

        if (y - 1 >= 0 && theBoard[y - 1][x].piece === 'none') {
          fill(25, 255, 25, 125);
          rect((x) * (boardSize / columns), (y - 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y - 1][x].available = true;
        }
        if (y - 1 >= 0 && theBoard[y - 1][x].colour === 'black') {
          fill(255, 25, 25, 125);
          rect((x) * (boardSize / columns), (y - 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y - 1][x].available = true;
        }

        if (y - 1 >= 0 && x + 1 < columns && theBoard[y - 1][x + 1].piece === 'none') {
          fill(25, 255, 25, 125);
          rect((x + 1) * (boardSize / columns), (y - 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y - 1][x + 1].available = true;
        }
        if (y - 1 >= 0 && x + 1 < columns && theBoard[y - 1][x + 1].colour === 'black') {
          fill(255, 25, 25, 125);
          rect((x + 1) * (boardSize / columns), (y - 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y - 1][x + 1].available = true;
        }

        if (x + 1 < columns && theBoard[y][x + 1].piece === 'none') {
          fill(25, 255, 25, 125);
          rect((x + 1) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y][x + 1].available = true;
        }
        if (x + 1 < columns && theBoard[y][x + 1].colour === 'black') {
          fill(255, 25, 25, 125);
          rect((x + 1) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y][x + 1].available = true;
        }

        if (y + 1 < rows && x + 1 < columns && theBoard[y + 1][x + 1].piece === 'none') {
          fill(25, 255, 25, 125);
          rect((x + 1) * (boardSize / columns), (y + 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y + 1][x + 1].available = true;
        }
        if (y + 1 < rows && x + 1 < columns && theBoard[y + 1][x + 1].colour === 'black') {
          fill(255, 25, 25, 125);
          rect((x + 1) * (boardSize / columns), (y + 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y + 1][x + 1].available = true;
        }

        if (y + 1 < rows && theBoard[y + 1][x].piece === 'none') {
          fill(25, 255, 25, 125);
          rect((x) * (boardSize / columns), (y + 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y + 1][x].available = true;
        }
        if (y + 1 < rows && theBoard[y + 1][x].colour === 'black') {
          fill(255, 25, 25, 125);
          rect((x) * (boardSize / columns), (y + 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y + 1][x].available = true;
        }

        if (y + 1 < rows && x - 1 >= 0 && theBoard[y + 1][x - 1].piece === 'none') {
          fill(25, 255, 25, 125);
          rect((x - 1) * (boardSize / columns), (y + 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y + 1][x - 1].available = true;
        }

        if (x - 1 >= 0 && theBoard[y][x - 1].piece === 'none') {
          fill(25, 255, 25, 125);
          rect((x - 1) * (boardSize / columns), (y) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
          theBoard[y][x - 1].available = true;
        }
      }
    }
  }

  movePiece();
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