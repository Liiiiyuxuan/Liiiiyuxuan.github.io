let bulletArray = [];

let gunX;
let gunY;

let bulletImg;

function preload() {
  bulletImg = loadImage('bullet.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gunX = width / 2;
  gunY = height / 2; 
}

function draw() {
  background(215);
  
  for (let bullet of bulletArray) {
    bullet.move();
    bullet.display();
  }
}

function mousePressed() {
  bulletArray.push(new Bullet(mouseX, mouseY, bulletImg));
}



class Bullet {
  constructor(clickX, clickY, theImg) {
    this.startX = gunX;
    this.startY = gunY;
    this.clickX = clickX;
    this.clickY = clickY;
    this.dx = (this.clickX - this.startX) / 10;
    this.dy = (this.clickY - this.startY) / 10;
    this.img = theImg;
  }

  move() {
    if (this.dx > 20 || this.dy > 10 || this.dx < -20 || this.dy < -10) {
      this.dx *= 1/3;
      this.dy *= 1/3;
    }

    this.startX += this.dx;
    this.startY += this.dy;
  }

  display() {
    // fill('black');
    // noStroke();
    // circle(this.startX, this.startY, 5);
    
    image(this.img, this.startX, this.startY, 30, 25)
  }
}
