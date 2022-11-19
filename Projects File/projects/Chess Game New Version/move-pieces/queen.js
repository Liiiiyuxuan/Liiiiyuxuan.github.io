function moveQueen() {
    selectPiece();
  
    // queen is the combination of  bishop and rook, so we use the checkLists used in both bishop and rook
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
          // iterate through: white piece taking black piece and black piece taking white piece
          let selectedColour = colourList[counter % 2];
          let opponentColour = colourList[(counter + 1) % 2];
  
          if (theBoard[y][x].piece === 'queen' && theBoard[y][x].selected && theBoard[y][x].colour === selectedColour) {
            initializingAvailability();
  
            for (let i = 0; i < checkList1.length; i++) {
              let a = 1;
              while (y + checkList1[i][0] * a >= 0 && y + checkList1[i][0] * a < rows &&
                x + checkList1[i][1] * a >= 0 && x + checkList1[i][1] * a < columns &&
                theBoard[y + checkList1[i][0] * a][x + checkList1[i][1] * a].piece === 'none') {
                  fill(moveColour);
                  rect((x + checkList1[i][1] * a) * (boardSize / columns), (y + checkList1[i][0] * a) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                  theBoard[y + checkList1[i][0] * a][x + checkList1[i][1]*a].available = true;
                  a ++;
              }
              
              if (y + checkList1[i][0] * a >= 0 && y + checkList1[i][0] * a < rows &&
                x + checkList1[i][1] * a >= 0 && x + checkList1[i][1] * a < columns &&
                theBoard[y + checkList1[i][0] * a][x + checkList1[i][1] * a].colour === opponentColour) {
                  fill(takeColour);
                  rect((x + checkList1[i][1] * a) * (boardSize / columns), (y + checkList1[i][0] * a) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                  theBoard[y + checkList1[i][0] * a][x + checkList1[i][1] * a].available = true;
              }
            }
  
            for (let i = 0; i < checkList2.length; i ++) {
              let a = 1;
  
              while (x + checkList2[i] * a >= 0 && x + checkList2[i] * a < columns && theBoard[y][x + checkList2[i] * a].piece === 'none') {
                fill(moveColour);
                rect((x + checkList2[i] * a) * (boardSize / columns), y * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y][x + checkList2[i] * a].available = true;
                a ++;
              }
  
              if (x + checkList2[i]*a >= 0 && x + checkList2[i] * a < columns && theBoard[y][x + checkList2[i] * a].colour === opponentColour) {
                fill(takeColour);
                rect((x + checkList2[i] * a) * (boardSize / columns), y * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y][x + checkList2[i] * a].available = true;
              }
            }
  
            for (let i = 0; i < checkList2.length; i ++) {
              let b = 1;
  
              while (y + checkList2[i] * b >= 0 && y + checkList2[i] * b < rows && theBoard[y + checkList2[i] * b][x].piece === 'none') {
                fill(moveColour);
                rect(x * (boardSize / rows), (y + checkList2[i] * b) * (boardSize / rows), (boardSize / rows), (boardSize / rows));
                theBoard[y + checkList2[i] * b][x].available = true;
                b ++;
              }
              
              if (y + checkList2[i] * b >= 0 && y + checkList2[i] * b < rows && theBoard[y + checkList2[i] * b][x].colour === opponentColour) {
                fill(takeColour);
                rect(x * (boardSize / columns), (y + checkList2[i] * b) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y + checkList2[i] * b][x].available = true;
              }
            }
          }
        }
      }
    }
  
    movePiece();
  }