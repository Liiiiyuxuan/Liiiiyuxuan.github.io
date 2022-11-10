function moveKing() {
    selectPiece();
  
    let colourList = ['black', 'white'];
  
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        for (let counter = 0; counter < colourList.length; counter++) {
          // iterate through: white piece taking black piece and black piece taking white piece
          let selectedColour = colourList[counter % 2];
          let opponentColour = colourList[(counter + 1) % 2];
  
          if (theBoard[y][x].piece === 'king' && theBoard[y][x].selected && theBoard[y][x].colour === selectedColour) {
            initializingAvailability();
  
            // iterate through all the cells around the king
            for (let i = -1; i <= 1; i ++) {
              for (let j = -1; j <= 1; j ++) {
                if (rows > y + i && y + i >= 0 && columns > x + j && x + j >= 0 && theBoard[y + i][x + j].piece === 'none') {
                  fill(moveColour);
                  rect((x + j) * (boardSize / columns), (y + i) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                  theBoard[y + i][x + j].available = true;
                }
                if (rows > y + i && y + i >= 0 && columns > x + j && x + j >= 0 && theBoard[y + i][x + j].colour === opponentColour) {
                  fill(takeColour);
                  rect((x + j) * (boardSize / columns), (y + i) * (boardSize / rows), (boardSize / columns), (boardSize / rows));
                  theBoard[y + i][x + j].available = true;
                }
              }
            }
  
            // if king is selected, we should detect whether it can castle
            if (theBoard[y][x].colour === 'white' && whiteCastleKingSide && theBoard[y][x + 1].colour === 'none' && theBoard[y][x + 2].colour === 'none' && theBoard[y][x + 3].colour === 'white') {
              fill(moveColour);
              circle((x + 2.5) * (boardSize / columns), (y + 0.5) * (boardSize / rows), 25, 25);
              theBoard[y][x + 2].available = true;
            }
            if (theBoard[y][x].colour === 'white' && whiteCastleQueenSide && theBoard[y][x - 1].colour === 'none' && theBoard[y][x - 2].colour === 'none' && theBoard[y][x - 3].colour === 'none' && theBoard[y][x - 4].colour === 'white') {
              fill(moveColour);
              circle((x - 1.5) * (boardSize / columns), (y + 0.5) * (boardSize / rows), 25, 25);
              theBoard[y][x - 2].available = true;
            }
            if (theBoard[y][x].colour === 'black' && blackCastleKingSide && theBoard[y][x + 1].colour === 'none' && theBoard[y][x + 2].colour === 'none' && theBoard[y][x + 3].colour === 'black') {
              fill(moveColour);
              circle((x + 2.5) * (boardSize / columns), (y + 0.5) * (boardSize / rows), 25, 25);
              theBoard[y][x + 2].available = true;
            }
            if (theBoard[y][x].colour === 'black' && blackCastleQueenSide && theBoard[y][x - 1].colour === 'none' && theBoard[y][x - 2].colour === 'none' && theBoard[y][x - 3].colour === 'none' && theBoard[y][x - 4].colour === 'black') {
              fill(moveColour);
              circle((x - 1.5) * (boardSize / columns), (y + 0.5) * (boardSize / rows), 25, 25);
              theBoard[y][x - 2].available = true;
            }
          }
        }
      }
    }
  
    movePiece();
  }