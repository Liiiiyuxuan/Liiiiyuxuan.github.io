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
          // iterate through: white piece taking black piece and black piece taking white piece
          let selectedColour = colourList[counter % 2];
          let opponentColour = colourList[(counter + 1) % 2];
  
          if (theBoard[y][x].piece === 'bishop' && theBoard[y][x].selected && theBoard[y][x].colour === selectedColour) {
            initializingAvailability();
  
            for (let i = 0; i < checkList.length; i++) {
              let a = 1;
              while (y + checkList[i][0] * a >= 0 && y + checkList[i][0] * a < rows &&
                x + checkList[i][1] * a >= 0 && x + checkList[i][1] * a < columns &&
                theBoard[y + checkList[i][0]*a][x + checkList[i][1] * a].piece === 'none') {
                  fill(moveColour);
                  rect((x + checkList[i][1] * a) * (boardSize / columns), (y + checkList[i][0] * a) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                  theBoard[y + checkList[i][0] * a][x + checkList[i][1] * a].available = true;
                  a ++;
              }
  
              // if the while stops at some spot, we will check if the spot is taken by any opponent pieces
              if (y + checkList[i][0] * a >= 0 && y + checkList[i][0] * a < rows &&
                x + checkList[i][1] * a >= 0 && x + checkList[i][1] * a < columns &&
                theBoard[y + checkList[i][0] * a][x + checkList[i][1] * a].colour === opponentColour) {
                  fill(takeColour);
                  rect((x + checkList[i][1] * a) * (boardSize / columns), (y + checkList[i][0] * a) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                  theBoard[y + checkList[i][0] * a][x + checkList[i][1] * a].available = true;
              }
            }
          }
        }
      }
    }
  
    movePiece();
  }