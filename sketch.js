let canvas;
let curve;
let points = [];

function setup() {
  // create the canvas and set the initial curve points
  canvas = createCanvas(600, 400);
  curve = new Bezier(100, 200, 200, 100, 300, 300, 400, 200);

  // create a point for each control point on the curve
  for (let i = 0; i < curve.points.length; i++) {
    points[i] = new ControlPoint(curve.points[i].x, curve.points[i].y);
  }
}

function draw() {
  background("200");

  // draw the curve and its control points
  curve.draw();
  for (let i = 0; i < points.length; i++) {
    points[i].draw();
  }
}

function mouseDragged() {
  // if a control point is being dragged, move it with the mouse
  for (let i = 0; i < points.length; i++) {
    if (points[i].dragging) {
      points[i].move(mouseX, mouseY);
      curve.points[i].x = points[i].x;
      curve.points[i].y = points[i].y;
    }
  }
}

function mouseReleased() {
  // stop dragging any control points when the mouse is released
  for (let i = 0; i < points.length; i++) {
    points[i].dragging = false;
  }
}

// define a class for the Bezier curve
class Bezier {
  constructor(x1, y1, x2, y2, x3, y3, x4, y4) {
    this.points = [new p5.Vector(x1, y1), new p5.Vector(x2, y2), new p5.Vector(x3, y3), new p5.Vector(x4, y4)];
  }

  draw() {
    strokeWeight(1);
    noFill();
    bezier(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y);
  }
}

// define a class for the control points on the curve
class ControlPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dragging = false;
    this.r = 8;
  }

  draw() {
    strokeWeight(1);
    noFill();
    ellipse(this.x, this.y, this.r * 2);

    if (this.dragging) {
      fill(50);
    } else {
      fill(100);
    }
    ellipse(this.x, this.y, this.r * 2);
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  // check if the mouse was pressed on this control point
  pressed(px, py) {
    return dist(px, py, this.x, this.y) < this.r;
  }
}

function mousePressed() {
  // check if the mouse was pressed on a control point
  for (let i = 0; i < points.length; i++) {
    if (points[i].pressed(mouseX, mouseY)) {
      points[i].dragging = true;
    }
  }
}

