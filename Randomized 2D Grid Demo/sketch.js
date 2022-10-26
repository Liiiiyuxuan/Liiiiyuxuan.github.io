let rows = 100;
let cols = 100;
let grid;
let cellWidth, cellHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width / cols;
  cellHeight = height / rows
  grid = createRandomArray(cols, rows)
}

function draw() {
  background(220);
  displayGrid(grid);
}

function displayGrid(grid) {
  for (let j = 0; j < grid.length; j ++) {
    for (let i = 0; i < grid.length; i ++) {
      fill(grid[j][i] === 0 ? 'white' : 'black');
      rect (i * cellWidth, j * cellHeight, cellWidth, cellHeight);
    }
  }
}

function createRandomArray(cols, rows) {
  let emptyArray = [];

  for (let y = 0; y < rows; y ++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x ++) {
      let number = round(random(0, 1))
      emptyArray[y].push(number);
    }
  }

  return emptyArray;
}

function mousePressed() {
  let xPos = floor(mouseX / cellWidth);
  let yPos = floor(mouseY / cellHeight);

  grid[yPos][xPos] = (grid[yPos][xPos] === 1 ? 0 : 1);
}
