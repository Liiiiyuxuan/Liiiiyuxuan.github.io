// Start Screen Demo
// Eason Li
// Oct 3rd, 2022



let state = "start";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  if (state === "start") {
    startScreen();
  }
}


function mousePressed() {
  if (state === "start" && buttonIsClicked(400, 700, 400, 550)) {
    state === "main";
  }
}

function buttonIsClicked(left, right, top, bottom) {
  return mouseX >= left && mouseX <= right &&
          mouseY >= top && mouseY <= botoom 
}

function startScreen() {
  fill("black");
  rect(400, 400, 300, 150);
}
