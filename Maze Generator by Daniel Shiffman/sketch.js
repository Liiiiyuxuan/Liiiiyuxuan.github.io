let columns, rows;
let sizeOfCell = 40;
let grid = [];


function setup() {
  createCanvas(400, 400);
  columns = floor(width / sizeOfCell);
  rows = floor(height / sizeOfCell);

for (let j = 0; j < rows; j++) {
  for (let i = 0; i < columns; i++) {
    // create all the cells and put them in the array created
    let cell = new Cell(i, j);
    grid.push(cell);
  }
}

}

function draw() {
  background(51);

  // the show() function is defined in the Cell class, which is used to draw the walls of the cells
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
}

class Cell{
  constructor(i, j) {
    this.i = i;
    this.j = j;

    // four trues by default indicates that all four walls exist for a cell
    this.walls = [true, true, true, true];

    this.show = function() {
      let x = this.i * sizeOfCell;
      let y = this.j * sizeOfCell;
      stroke(255);

      //draw the top wall of a cell
      if (this.walls[0]) {
        line(x, y, x + sizeOfCell, y);
      }
      // draw the right wall of a cell
      if (this.walls[1]) {
        line(x + sizeOfCell, y, x + sizeOfCell, y + sizeOfCell);
      }
      // draw the bottom wall of a cell
      if (this.walls[2]) {
        line(x + sizeOfCell, y + sizeOfCell, x, y + sizeOfCell);
      }
      // draw the left wall of a cell
      if (this.walls[3]) {
        line(x, y + sizeOfCell, x, y);
      }
      // noFill();
      // rect(x, y, sizeOfCell, sizeOfCell);

    };
  }
}