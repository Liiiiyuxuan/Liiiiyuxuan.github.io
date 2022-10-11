// 

let columns, rows;
let sizeOfCell = 80; // change this value to change the number of cells drawn
let ValueForFrameRate = 60; // change this value to change the speed the maze generated
let grid = [];
let current; // current cell 

// the stack is used to trace back to the cell (visited) with !visited neighbour 
let stack = [];
let generationComplete;

let array = [];

let listofColour = ["maroon", "red", "purple", "fuchsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua"];
let chosenColour = listofColour[round(random(0, listofColour.length - 1))];

let xValue = 0;
let yValue = 0;



function setup() {
  createCanvas(windowWidth, windowHeight);
  columns = floor(windowWidth / sizeOfCell);
  rows = floor(windowHeight / sizeOfCell);
  // lowering the frame rate to see the process of generating a maze
  frameRate(ValueForFrameRate);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
      // create all the cells and put them in the array created
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  // the current cell starts at the top left cell
  current = grid[0];

}

function draw() {
  background(51);

  // the show() function is defined in the Cell class, which is used to draw the walls of the cells
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;

  // show us the "current" cell
  current.highlight();

  let next = current.checkNeighbours();
  // let the neightbour chosen to be current cell and hence be visited
  if (next) {
    next.visited = true;

    // push the current cell into the stack to be traced back in the future
    stack.push(current);

    // remove the walls between the current cell and the chosen neighbour cell
    removeWalls(current, next);

    // mark the neighbour cell to be the new current cell
    current = next;
  }  else if (stack.length > 0) { // we will use the stack.pop() to select a cell visited to access more neighbours 
    current = stack.pop();
  }

  if (stack.length === 0) {
    // console.log(array); //Used for the purpose of debugging/////////////////////////////////////////////////////

    noStroke();
    fill(chosenColour);

    // make sure the square drawn is not attached to the walls of the cells
    rect(xValue * sizeOfCell + 2, yValue * sizeOfCell + 2, sizeOfCell - 4, sizeOfCell - 4);

  

  }
}

function keyPressed() {
  moveObject();
}

function mousePressed() {
  if (mouseX >= xValue * sizeOfCell + 2 && mouseX <= (xValue + 1) * sizeOfCell - 2 && 
  mouseY >= yValue * sizeOfCell + 2 && mouseY <= (yValue + 1) * sizeOfCell - 2) {
        chosenColour =  listofColour[Math.round(random(0, listofColour.length - 1))];
      }
}



function moveObject() {
  let counter;
  let constant;

  for (counter = 0; counter < array.length; counter++) {
    
    // the array constains all the cells with their coordinates and their wall lists (four booleans inside)
    if (array[counter].i === xValue && array[counter].j === yValue) {
      // the constant will not change, so the following codes can be operated peoperly
      constant = counter;

      if (keyCode === UP_ARROW && array[constant].walls[0] === false && yValue >= 1) {
        yValue -= 1;
        return;
      }
    
      if (keyCode === RIGHT_ARROW && array[constant].walls[1] === false && xValue <= columns - 1) {
        xValue += 1;
        return;
      }
    
      if (keyCode === DOWN_ARROW && array[constant].walls[2] === false && yValue <= rows - 1) {
        yValue += 1;
        return;
      }
    
      if (keyCode === LEFT_ARROW && array[constant].walls[3] === false && xValue >= 1) {
        xValue -= 1;
        return;
      }
    }
  }
}

// function calculates the index used to help us access(check) the neighbouring cells if they have been visited
function calculateIndex(i, j) {
  // make sure the index of accessing a neighbouring cell is valid 
  if (i < 0 || j < 0 || i > columns - 1 || j > rows - 1) {
    return "";
  }

  else {
    index = i + j * columns;
    return index;
  }
}

function removeWalls(a, b) {
  array.push(a);///////////////////////////////////////////////////////////////////////////////////////////////
  array.push(b);///////////////////////////////////////////////////////////////////////////////////////////////
  let xDifference = a.i - b.i;
  // remove the right/left walls of the two adjacent cells according to the difference between their x-coordinates
  if (xDifference === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (xDifference === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  let yDifference = a.j - b.j;
  // remove the top/bottom walls of the two adjacent cells according to the difference between their y-coordinates
  if (yDifference === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (yDifference === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}



class Cell{
  constructor(i, j) {
    this.i = i;
    this.j = j;

    // four trues by default indicates that all four walls exist for a cell
    this.walls = [true, true, true, true];

    this.visited = false;

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

      this.checkNeighbours = function() {
        // array that contains unvisited cells
        let neighbours = [];

        // if any one of received a -1, it will be undefined
        let topNeighbour    = grid[calculateIndex(i    , j - 1)];
        let rightNeighbour  = grid[calculateIndex(i + 1, j    )];
        let bottomNeighbour = grid[calculateIndex(i    , j + 1)];
        let leftNeighbour   = grid[calculateIndex(i - 1, j    )];

        if (topNeighbour && !topNeighbour.visited) {
          neighbours.push(topNeighbour);
        }
        if (rightNeighbour && !rightNeighbour.visited) {
          neighbours.push(rightNeighbour);
        }
        if (bottomNeighbour && !bottomNeighbour.visited) {
          neighbours.push(bottomNeighbour);
        }
        if (leftNeighbour && !leftNeighbour.visited) {
          neighbours.push(leftNeighbour);
        }

        // randomly choose the neighbour that hasn't been visited
        if (neighbours.length > 0) {
          let randomValue = floor(random(0, neighbours.length));
          return neighbours[randomValue];
        } else {
          return undefined;
        }

      };

      if (this.visited) {
        noStroke();
        fill("black");
        rect(x, y, sizeOfCell, sizeOfCell);
      }

    };

    this.highlight = function() {
      let x = this.i * sizeOfCell;
      let y = this.j * sizeOfCell;
      if (x != 0 || y != 0) {
        noStroke();
        fill(0, 255, 0);
        rect(x, y, sizeOfCell, sizeOfCell);
      }
    };
  }
}

