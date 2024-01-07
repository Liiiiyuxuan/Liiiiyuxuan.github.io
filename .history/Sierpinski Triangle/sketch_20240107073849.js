let triangleVertices = [
  {x: 500, y: 50},
  {x: 100, y: 600},
  {x: 900, y: 600},
];

let theDepth = 0;
let theColours = ['blue', 'red', 'green', 'white', 'yellow', 'purple', 'black', 'orange'];

function setup() {
  createCanvas(1000, 700);
}

function draw() {
  background(220);
  sierpinski(triangleVertices, theDepth);
}

function mousePressed() {
  theDepth++;
}

function sierpinski(vertices, depth) {
  fill(theColours[depth % 8]);
  triangle(
    vertices[0].x, vertices[0].y, 
    vertices[1].x, vertices[1].y, 
    vertices[2].x, vertices[2].y);

  if (depth > 0) {
    sierpinski([vertices[0], 
                getMidPt(vertices[0], vertices[1]),
                getMidPt(vertices[0], vertices[2])],
              depth - 1);
    
    sierpinski([vertices[1], 
                getMidPt(vertices[0], vertices[1]),
                getMidPt(vertices[1], vertices[2])],
              depth - 1);

    sierpinski([vertices[2], 
                getMidPt(vertices[0], vertices[2]),
                getMidPt(vertices[1], vertices[2])],
              depth - 1);
  }
}

function getMidPt(point1, point2) {
  let x = 1/2 * (point1.x + point2.x);
  let y = 1/2 * (point1.y + point2.y);
  let MidPt = {x, y}

  return MidPt;
}