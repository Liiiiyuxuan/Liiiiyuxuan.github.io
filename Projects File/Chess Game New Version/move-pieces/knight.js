function moveKnight() {
    selectPiece();
  
    let colourList = ['black', 'white'];
  
    let checkList1 = [-1, -1, 1,  1, -2, -2, 2,  2];
    let checkList2 = [ 2, -2, 2, -2,  1, -1, 1, -1];
  
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        for (let counter = 0; counter < colourList.length; counter++) {
          // iterate through: white piece taking black piece and black piece taking white piece
          let selectedColour = colourList[counter % 2];
          let opponentColour = colourList[(counter + 1) % 2];
  
          if (theBoard[y][x].piece === 'knight' && theBoard[y][x].selected && theBoard[y][x].colour === selectedColour) {
            initializingAvailability();
  
            for (let counter = 0; counter < checkList1.length; counter ++) {
              // check every single pair in the checklists
              if (y + checkList1[counter] >= 0 && y + checkList1[counter] < rows && x + checkList2[counter] >= 0 && x + checkList2[counter] < columns 
                && theBoard[y + checkList1[counter]][x + checkList2[counter]].piece === 'none') {
                fill(moveColour);
                rect((x + checkList2[counter]) * (boardSize / columns), (y + checkList1[counter]) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y + checkList1[counter]][x + checkList2[counter]].available = true;
              }
              if (y + checkList1[counter] >= 0 && y + checkList1[counter] < rows && x + checkList2[counter] >= 0 && x + checkList2[counter] < columns 
                && theBoard[y + checkList1[counter]][x + checkList2[counter]].colour === opponentColour) {
                fill(takeColour);
                rect((x + checkList2[counter]) * (boardSize / columns), (y + checkList1[counter]) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                theBoard[y + checkList1[counter]][x + checkList2[counter]].available = true;
              }
            }
          }
        }
      }
    }
  
    movePiece();
  }