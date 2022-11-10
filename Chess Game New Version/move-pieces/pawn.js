function movePawn() {
    selectPiece();
  
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        // white pawn
        if (y === 6 && theBoard[y][x].colour === 'white' && theBoard[y][x].piece === 'pawn' && theBoard[y][x].selected) {
          initializingAvailability();
          fill(moveColour);
          // going forward
          if (y - 1 >= 0 && theBoard[y - 1][x].piece === 'none') {
            rect(x * (boardSize / columns), (y - 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            if (y - 2 > 0 && theBoard[y - 2][x].piece === 'none') {
              rect(x * (boardSize / columns), (y - 2) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
              theBoard[y - 2][x].available = true;
            }
            theBoard[y - 1][x].available = true;
          }
  
          // taking piece diagonally
          if (y - 1 >= 0 && x - 1 >= 0 && theBoard[y - 1][x - 1].colour === 'black') {
            fill(takeColour);
            rect((x - 1) * (boardSize / columns), (y - 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y - 1][x - 1].available = true;
          }
          if (y - 1 >= 0 && x + 1 < columns && theBoard[y-1][x+1].colour === 'black') {
            fill(takeColour);
            rect((x + 1) * (boardSize / columns), (y - 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y-1][x+1].available = true;
          }
        }
  
        if (y !== 6 && theBoard[y][x].colour === 'white' && theBoard[y][x].piece === 'pawn' && theBoard[y][x].selected) {
          initializingAvailability();
          fill(moveColour);
          // going forward
          if (y - 1 >= 0 && theBoard[y-1][x].piece === 'none') {
            rect(x * (boardSize / columns), (y - 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y - 1][x].available = true;
          }
  
          // taking pieces diagonally
          if (y - 1 >= 0 && x - 1 >= 0 && theBoard[y - 1][x - 1].colour === 'black') {
            fill(takeColour);
            rect((x - 1) * (boardSize / columns), (y - 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y - 1][x - 1].available = true;
          }
          if (y - 1 >= 0 && x + 1 < columns && theBoard[y - 1][x+1].colour === 'black') {
            fill(takeColour);
            rect((x + 1) * (boardSize / columns), (y - 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y - 1][x + 1].available = true;
          }
        }
  
        // black pawn
        if (y === 1 && theBoard[y][x].colour === 'black' && theBoard[y][x].piece === 'pawn' && theBoard[y][x].selected) {
          initializingAvailability();
          fill(25, 255, 25, 125);
          if (y + 1 < rows && theBoard[y + 1][x].piece === 'none') {
            rect(x * (boardSize / columns), (y + 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            if (y + 2 < rows && theBoard[y + 2][x].piece === 'none') {
              rect(x * (boardSize / columns), (y + 2) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
              theBoard[y + 2][x].available = true;
            }
            theBoard[y + 1][x].available = true;
          }
          if (y + 1 >= 0 && x - 1 >= 0 && theBoard[y + 1][x - 1].colour === 'white') {
            fill(takeColour);
            rect((x - 1) * (boardSize / columns), (y + 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y + 1][x - 1].available = true;
          }
          if (y + 1 >= 0 && x + 1 < columns && theBoard[y + 1][x + 1].colour === 'white') {
            fill(takeColour);
            rect((x + 1) * (boardSize / columns), (y + 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y + 1][x + 1].available = true;
          }
        }
        if (y !== 1 && theBoard[y][x].colour === 'black' && theBoard[y][x].piece === 'pawn' && theBoard[y][x].selected) {
          initializingAvailability();
          fill(25, 255, 25, 125);
          if (y + 1 < rows && theBoard[y + 1][x].piece === 'none') {
            rect(x * (boardSize / columns), (y + 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y + 1][x].available = true;
          }
          if (y + 1 < rows && x - 1 >= 0 && theBoard[y + 1][x - 1].colour === 'white') {
            fill(takeColour);
            rect((x - 1) * (boardSize / columns), (y + 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y + 1][x - 1].available = true;
          }
          if (y + 1 < rows && x + 1 < columns && theBoard[y + 1][x + 1].colour === 'white') {
            fill(takeColour);
            rect((x + 1) * (boardSize / columns), (y + 1) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
            theBoard[y + 1][x + 1].available = true;
          }
        }
      }
    }
  
    movePiece();
  }