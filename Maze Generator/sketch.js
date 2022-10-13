// basic: Randomly generated maze using the methods of class and array. Sound effect is also added in the maze game. 
//        Player can move the object in the maze (after the maze is completely generated) by using WASD or the arrows.
//        Player is able to change the colour of the object by clicking the object itself. (Still works after it has been moved)
//        The size of the maze is depending on the size of the window, which means player can adjust the size of the maze prior to creating it.
//        (However, the size of the maze is fixed after it statrs generating)      

// class: Class method is been used to create each cell in the maze for convenience becuase all the cell "behave" in the same way.
//        I have used the constructor method defined in a class, and I have also defined functions in the class. 
//        Now, I have a better understanding of how a class work in javascript

// array: Arrays are frequently used in the code below because they have been used for the resurcing method in the maze generation.
//        Arrays are also used for cheking the wall status while moving the objected created
//        Array.push()  /  Array.pop()  /  Array.length  /  Array[num] are the basic methods used

// sound: Sound effect can be discovered in two ways in the assignment:
//        1. As the player click the square to change its colour, sound can be found
//        2. As the player moves the object in the maze, sound can also be found


let columns, rows;
let sizeOfCell; // change this value to change the number of cells drawn
let ValueForFrameRate = 60; // change this value to change the speed the maze generated
let grid = [];
let current; // current cell 

// the stack is used to trace back to the cell (visited) with !visited neighbour 
let stack = [];

// array is used to store all the cells created with their coordinates and wall status
let array = []; 

let listOfColour = ["maroon", "red", "purple", "fuchsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua"];
let chosenColour;

let xValue = 0; // used in the moveObject() function indicates that we start from the top left cell
let yValue = 0;

let startScreenOn = true;

let retroClick;

function preload() {
  soundFormats('mp3', 'wav', 'ogg');
  retroClick = loadSound('retro-click.wav');
  bling = loadSound('bling.wav');

  myFont = loadFont('gameFont.ttf');
}

function playRetroClick() {
  retroClick.play();
}

function playBling() {
  bling.play();
}




function setup() {
  createCanvas(windowWidth, windowHeight);
  columns = floor(windowWidth / sizeOfCell);
  rows = floor(windowHeight / sizeOfCell);
  // lowering the frame rate to see the process of generating a maze
  frameRate(ValueForFrameRate);
  chosenColour = listOfColour[floor(random(0, listOfColour.length - 1))];

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
  if (startScreenOn === true) {
    let rectWidth = windowWidth / 4;
    let rectHeight = windowHeight / 12;
    let cornerRadius = 10;

    background("black");
    rect((windowWidth - rectWidth) / 2 , rectHeight * 5, rectWidth, rectHeight, cornerRadius);
    rect((windowWidth - rectWidth) / 2 , rectHeight * 7, rectWidth, rectHeight, cornerRadius);
    rect((windowWidth - rectWidth) / 2 , rectHeight * 9, rectWidth, rectHeight, cornerRadius);

    textAlign(CENTER);
    textFont(myFont);
    textSize(40);
    fill("black");
    text("Easy Level",      (windowWidth - rectWidth) / 2 + rectWidth / 2, rectHeight * 5 + rectHeight / 2);
    text("Medium Level",    (windowWidth - rectWidth) / 2 + rectWidth / 2, rectHeight * 7 + rectHeight / 2);
    text("Difficult Level", (windowWidth - rectWidth) / 2 + rectWidth / 2, rectHeight * 9 + rectHeight / 2);

    textAlign(CENTER);
    textFont(myFont);
    textSize(60);
    fill("white");
    text("Maze Generator Game", windowWidth / 2, rectHeight * 3);

    if (mouseX >= (windowWidth - rectWidth) / 2 && mouseX <= (windowWidth - rectWidth) / 2 + rectWidth) {
      if (mouseY >= rectHeight * 5 && mouseY <= rectHeight * 5 + rectHeight) {
        if (mouseIsPressed) {
          sizeOfCell = 80;
          startScreenOn = false;
        }
      } else if (mouseY >= rectHeight * 7 && mouseY <= rectHeight * 7 + rectHeight) {
        if (mouseIsPressed) {
          sizeOfCell = 40;
          startScreenOn = false;
        }
      } else if (mouseY >= rectHeight * 9 && mouseY <= rectHeight * 9 + rectHeight) {
        if (mouseIsPressed) {
          sizeOfCell = 20;
          startScreenOn = false;
        }
      }
    }
  }

  else if (startScreenOn === false) {
    background("gray");
  
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
      // colour of the object
      fill(chosenColour);
  
      // make sure the square drawn is not attached to the walls of the cells
      rect(xValue * sizeOfCell + 2, yValue * sizeOfCell + 2, sizeOfCell - 4, sizeOfCell - 4);
    }
  }
}



function keyPressed() {
  moveObject();
}

function mousePressed() {
  if (mouseX >= xValue * sizeOfCell + 2 && mouseX <= (xValue + 1) * sizeOfCell - 2 && 
  mouseY >= yValue * sizeOfCell + 2 && mouseY <= (yValue + 1) * sizeOfCell - 2) {
    playBling();
    chosenColour =  listOfColour[floor(random(0, listOfColour.length - 1))];
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

      if ((keyCode === UP_ARROW || keyCode === 87) && array[constant].walls[0] === false && yValue >= 1) {
        playRetroClick();
        yValue -= 1;
        return;
      }
    
      if ((keyCode === RIGHT_ARROW || keyCode === 68) && array[constant].walls[1] === false && xValue <= columns - 1) {
        playRetroClick();
        xValue += 1;
        return;
      }
    
      if ((keyCode === DOWN_ARROW || keyCode === 83) && array[constant].walls[2] === false && yValue <= rows - 1) {
        playRetroClick();
        yValue += 1;
        return;
      }
    
      if ((keyCode === LEFT_ARROW || keyCode === 65) && array[constant].walls[3] === false && xValue >= 1) {
        playRetroClick();
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

      // draw the visited cells
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

