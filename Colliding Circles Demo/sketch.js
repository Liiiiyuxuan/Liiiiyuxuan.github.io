let theCircles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(100);

  for (let i = 0; i < theCircles.length; i++) {
    theCircles[i].move();
    theCircles[i].display();
    for (let j = 0; j < theCircles.length; j++) {
      theCircles[i].collisionCheck(theCircles[j]);
    }
  }
}

function mousePressed() {
  theCircles.push(new Ball(mouseX, mouseY));
}



class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = random(25, 50);
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.colour = color(random(255), random(255), random(255), random(255));
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    // left-right edges
    if (this.x > width - this.radius || this.x < 0 + this.radius) {
      this.dx *= -1;
    }

    // top-bottom edge
    if (this.y > height - this.radius || this.y < 0 + this.radius) {
      this.dy *= -1;
    }
  }

  display() {
    fill(this.colour);
    noStroke();
    circle(this.x, this.y, this.radius * 2);
  }

  collisionCheck(other) {
    let distanceBetween = dist(this.x, this.y, other.x, other.y);
    let radiiSum = this.radius + other.radius;
  
    if (distanceBetween < radiiSum) {
      let tempDx = this.dx;
      let tempDy = this.dy;

      this.dx = other.dx;
      this.dy = other.dy;
      other.dx = tempDx;
      other.dy = tempDy;
    }
  }
}