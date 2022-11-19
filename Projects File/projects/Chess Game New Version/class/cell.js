class Cell{
    constructor(i, j, colour, piece, selected, available) {
      this.i = i;
      this.j = j;
      this.colour = colour;
      this.piece = piece;
      this.selected = selected;
      this.available = available;
    }
  
  
    showCell = function() {
      let x = this.j * (boardSize / rows);
      let y = this.i * (boardSize / columns);

      fill((this.i + this.j) % 2 === 0 ? 'white' : 'black');
      rect(x, y, boardSize / columns, boardSize / rows);
    }
  
    showPiece = function() {
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