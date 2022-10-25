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

    // collision check
    for (let j = 0; j < theCircles.length; j++) {
      if(i !== j && checkCollision(theCircles[i], theCircles[j])) {
        let tempDx = theCircles[i].dx;
        let tempDy = theCircles[i].dy;

        theCircles[i].dx = theCircles[j].dx;
        theCircles[i].dy = theCircles[j].dy;
        theCircles[j].dx = tempDx;
        theCircles[j].dy = tempDy;
      }
    }

    // left-right edges
    if (theCircles[i].x > width - theCircles[i].radius || theCircles[i].x < 0 + theCircles[i].radius) {
      theCircles[i].dx *= -1;
    }

    // top-bottom edge
    if (theCircles[i].y > height - theCircles[i].radius || theCircles[i].y < 0 + theCircles[i].radius) {
      theCircles[i].dy *= -1;
    }
  }

  // display
  for (let thisCircle of theCircles) {
    fill(thisCircle.theColour);
    noStroke();
    circle(thisCircle.x, thisCircle.y, thisCircle.radius * 2);
  }
}

function checkCollision(ball1, ball2) {
  let distanceBetween = dist(ball1.x, ball1.y, ball2.x, ball2.y);
  let radiiSum = ball1.radius + ball2.radius;

  if (distanceBetween > radiiSum) {
    return false;
  }
  else {
    return true;
  }
}

function mousePressed() {
  theCircles.push(spawnBall(mouseX, mouseY));
}

function spawnBall(tempX, tempY) {
  let newBall = {
    x: tempX,
    y: tempY,
    radius: random(25, 50),
    dx: random(-5, 5),
    dy: random(-5, 5),
    theColour: color(random(255), random(255), random(255), random(255)),
  };
  return newBall;
}