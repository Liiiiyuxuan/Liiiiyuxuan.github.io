// Local Storage Demo

let numberOfClicks = 0;
let highestEver = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  highestEver = getItem('highscore') !== null ? getItem('highscore') : storeItem('highscore, 0');
}

function draw() {
  background(220);

  textSize(50);
  text(numberOfClicks, width / 2, height / 2);

  text(highestEver, 50, height - 100);
}

function mousePressed() {
  numberOfClicks ++;

  let number = numberOfClicks > highestEver ? numberOfClicks : highestEver;
  storeItem('highscore', number);
  highestEver = number
}