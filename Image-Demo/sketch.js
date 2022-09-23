// Image Demo
// Eason
// Sept 22, 2022

let fishImage;
let scalar = 1;

function preload() {
  fishImage = loadImage("Fish.webp");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(fishImage, mouseX, mouseY, fishImage.width*scalar, fishImage.height*scalar);

}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    scalar ++;
  }

  if (keyCode === DOWN_ARROW) {
    scalar --;
  }
}
