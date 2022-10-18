// Array Demo

let theCircles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  displayCircles();
}

function mousePressed() {
  spawnCircle();
}

function spawnCircle() {
  let thisCircle = {
    x: mouseX,
    y: mouseY,
    radius: random(25, 100),
  };
  theCircles.push(thisCircle);
}

function displayCircles() {
  for (let i = 0; i < theCircles.length; i++) {
    fill('red');
    circle(theCircles[i].x, theCircles[i].y, theCircles[i].radius);
  }
}
