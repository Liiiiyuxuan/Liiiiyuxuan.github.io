let index = 8;

function setup() {
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
}

function draw() {
  background(220);
  drawChessboard();
}

function drawChessboard() {
  let cellSideLength = min(windowWidth, windowHeight) / index;
  let isWhite = true;

  for (let i = 0; i < index; i++) {
    for (let j = 0; j < index; j++) {
      if (isWhite === true) {
        fill("white");
      }
      else {
        fill("black");
      }

      noStroke();
      rect(i*cellSideLength, j*cellSideLength, cellSideLength, cellSideLength);

      isWhite = !isWhite;
    }

    isWhite = !isWhite;
  }    
}

function windoResized() {
  setup();
}
