let theCircles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  theCircles.push(spawnBall(windowWidth / 2, windowHeight / 2));
}

function draw() {
  background(220);

  // move
  for (let i = 0; i < theCircles.length; i++) {
    theCircles[i].x += theCircles[i].dx;
    theCircles[i].y += theCircles[i].dy;

    // left-right edges
    if (theCircles[i].x > width - theCircles[i].diametre / 2 || theCircles[i].x < 0 + theCircles[i].diametre / 2) {
      theCircles[i].dx *= -1;
    }

    // top-bottom edge
    if (theCircles[i].y > height - theCircles[i].diametre / 2 || theCircles[i].y < 0 + theCircles[i].diametre / 2) {
      theCircles[i].dy *= -1;
    }
  }

  // display
  for (let thisCircle of theCircles) {
    fill(thisCircle.theColour);
    noStroke();
    circle(thisCircle.x, thisCircle.y, thisCircle.diametre);
  }
}

function mousePressed() {
  theCircles.push(spawnBall(mouseX, mouseY));
}

function spawnBall(tempX, tempY) {
  let newBall = {
    x: tempX,
    y: tempY,
    diametre: random(50, 100),
    dx: random(-5, 5),
    dy: random(-5, 5),
    theColour: color(random(255), random(255), random(255), random(255)),
  };
  return newBall;
}