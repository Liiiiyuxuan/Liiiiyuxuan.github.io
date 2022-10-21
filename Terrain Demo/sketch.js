let theHeights = [];
let startingLocation = 10000;


function setup() {
  createCanvas(windowWidth, windowHeight);

  theHeights = generateHeights(startingLocation * 2);
}

function draw() {
  background(220);

  for (let i = startingLocation; i < startingLocation + width; i++ ) {
    displayRect(i - startingLocation, theHeights[i], 1);
  }

  if (keyCode === RIGHT_ARROW) {
    startingLocation ++;
  } else if (keyCode === LEFT_ARROW) {
    startingLocation --;
  }
}

function displayRect(x, rectHeight, rectWidth) {
  let y = height - rectHeight;
  rect(x, y, rectWidth, rectHeight);
}

function generateHeights(howMany) {
  let tempArray = [];
  let time = random(10000);

  for (let i = 0; i < howMany; i++) {
    tempArray.push(noise(time) * height / 2);
    time += 0.0035;
  }

  return tempArray;
}