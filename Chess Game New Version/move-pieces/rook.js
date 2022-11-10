function moveRook() {
    selectPiece();
  
    let checkList = [-1, 1];
    let colourList = ['black', 'white'];
  
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        for (let counter = 0; counter < colourList.length; counter++) {
          // iterate through: white piece taking black piece and black piece taking white piece
          let selectedColour = colourList[counter % 2];
          let opponentColour = colourList[(counter + 1) % 2];
  
          if (theBoard[y][x].piece === 'rook' && theBoard[y][x].selected && theBoard[y][x].colour === selectedColour) {
            initializingAvailability();
  
            // check the horizontal line
            for (let i = 0; i < checkList.length; i ++) {
              let a = 1;
  
              while (x + checkList[i] * a >= 0 && x + checkList[i] * a < columns && theBoard[y][x + checkList[i] * a].piece === 'none') {
                fill(moveColour);
                rect((x + checkList[i] * a) * (boardSize / columns), y * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y][x + checkList[i] * a].available = true;
                a ++;
              }
  
              // if the while loop terminates, we check whether the spot it stops has an opponent's piece
              if (x + checkList[i] * a >= 0 && x + checkList[i] * a < columns && theBoard[y][x + checkList[i] * a].colour === opponentColour) {
                fill(takeColour);
                rect((x + checkList[i] * a) * (boardSize / columns), y * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y][x + checkList[i] * a].available = true;
              }
            }
  
            // check the vertical line
            for (let i = 0; i < checkList.length; i ++) {
              let b = 1;
  
              while (y + checkList[i] * b >= 0 && y + checkList[i] * b < rows && theBoard[y + checkList[i] * b][x].piece === 'none') {
                fill(moveColour);
                rect(x * (boardSize / rows), (y + checkList[i] * b) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                theBoard[y + checkList[i] * b][x].available = true;
                b ++;
              }
              
              // if the while loop terminates, we check whether the spot it stops has an opponent's piece
              if (y + checkList[i] * b >= 0 && y + checkList[i] * b < rows && theBoard[y + checkList[i] * b][x].colour === opponentColour) {
                fill(255, 25, 25, 125);
                rect(x * (boardSize / columns), (y + checkList[i] * b) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y + checkList[i] * b][x].available = true;
              }
            }
          }
        }
      }
    }
  
    movePiece();
  }