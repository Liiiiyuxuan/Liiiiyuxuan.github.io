let listOfBalls = [];

function keyPressed() {
  let theBall = {
    x:        random(width),
    y:        random(height),
    diametre: random(50, 100),
    time:     random(5000),
    colour:   color(random(225), random(225), random(225), random(225)),
  };

  listOfBalls.push(theBall);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  
  for (let i = 0; i < listOfBalls.length; i++) {
    listOfBalls[i].x = noise(listOfBalls[i].time) * width;
    listOfBalls[i].y = noise(listOfBalls[i].time + 100) * height;
    
    // iincrease time along noise
    listOfBalls[i].time += 0.01;
    fill(listOfBalls[i].colour);
    circle(listOfBalls[i].x, listOfBalls[i].y, listOfBalls[i].diametre);
  }
  
}


