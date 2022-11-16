let gunX;
let gunY;

let bulletArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  gunX = width / 2;
  gunY = height / 2; 
}

function draw() {
  background(220);
  
  for (let i = 0; i < bulletArray.length; i++) {
    bulletArray[i].move();
    bulletArray[i].display();
  }
}

function mousePressed() {
  bulletArray.push(new Bullet(mouseX, mouseY));
}



class Bullet {
  constructor(clickX, clickY) {
    this.startX = gunX;
    this.startY = gunY;
    this.clickX = clickX;
    this.clickY = clickY;
    this.dx = (this.clickX - this.startX) / 10;
    this.dy = (this.clickY - this.startY) / 10;
  }

  move() {
    this.startX += this.dx;
    this.startY += this.dy;
  }

  display() {
    fill('black');
    noStroke();
    circle(this.startX, this.startY, 5);
  }
}
