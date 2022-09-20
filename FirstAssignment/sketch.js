let indexLength = round(random(6, 12));
let indexHeight = round(random(6, 12));
let wallEliminator = 0.4;
let cellSideLength = 40;

function setup() {
  createCanvas(indexLength * cellSideLength, indexHeight * cellSideLength);
}

function draw() {
  background(220);
  drawGrid();
}

function drawGrid() {
  let isWhite = true;

  for (let i = 0; i < indexLength; i++) {
    for (let j = 0; j < indexHeight; j++) {
      rect(i*cellSideLength, j*cellSideLength, cellSideLength, cellSideLength);
    }
  }    
}

function windoResized() {
  setup();
}
