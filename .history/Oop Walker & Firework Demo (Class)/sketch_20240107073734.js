// walker demo ////////////////////////////////////////////////////////////////////////////////////////////

// let walkerArray = [];

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   spawnWalker(); 
// }

// function draw() {
//   for (i = 0; i < walkerArray.length; i ++) {
//     walkerArray[i].display();
//     walkerArray[i].move();
//   }
// }

// function spawnWalker() {
//   let someColour = color(random(255), random(255), random(255));

//   walkerArray.push(new Walker(mouseX, mouseY, 4, someColour));
// }

// function mousePressed() {
//   spawnWalker();
// }



// class Walker {
//   constructor(x, y, speed, colour) {
//     this.x = x;
//     this.y = y;
//     this.speed = speed
//     this.colour = colour;
//   }

//   move() {
//     let i = random(4);

//     if (i < 1) {
//       this.y -= this.speed;
//     } else if (i < 2) {
//       this.y += this.speed;
//     } else if (i < 3) {
//       this.x -= this.speed;
//     } else {
//       this.x += this.speed;
//     }
//   }

//   display() {
//     stroke(this.colour)
//     fill(this.colour);
//     circle(this.x, this.y, 3);
//   }
// }



// firework demo ////////////////////////////////////////////////////////////////////////////////////////////

let fireworks = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    for (let i = 0; i < fireworks.length; i ++) {
        fireworks[i].move();
        if (!fireworks[i].isDead()) {
            fireworks[i].display();
        }
    }
}

function mousePressed() {
    for (let i = 0; i < 100; i ++) {
        fireworks.push(new Particle(mouseX, mouseY));
    }
}



class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = random(-5, 5);
        this.dy = random(-5, 5);
        this.diametre = 2;
        this.r = random(225)
        this.g = random(225)
        this.b = random(225)
        this.alpha = 255;
        this.colour = color(this.r, this.g, this.b, this.alpha);
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
        this.alpha --;
        this.colour = color(this.r, this.g, this.b, this.alpha);
    }

    display() {
        fill(this.colour);
        stroke(this.colour);
        circle(this.x, this.y, this.diametre);
    }

    isDead() {
        return this.alpha <= 0;
    }
}