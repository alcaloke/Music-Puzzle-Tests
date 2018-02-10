function setup() {
  createCanvas(windowWidth, windowHeight);
  setInterval(setNewShape, 1000);
	angleMode(DEGREES);
	colorMode(HSB, 1000);
}

let h = 0;
let circle =[];
let radius = 200;
let division = 16;

function draw() {
  background(0);

	division = map(mouseY, height, 0, 0, 16);
	radius = map(mouseY, height, 0, 50, 400);

  beginShape();
  // stroke(255);
	noStroke();
  fill(h, 1000, 500);
  vertex(rpoint1, 0);
  vertex(rpoint2, height / 2);
  vertex(rpoint3, height);
	vertex(mpoint1, mpoint2);
	vertex(mouseX, mouseY);
  endShape();

	h += 10;
	if (h > 1000) {
		h = 0;
	}

	mpoint1 += 5;
	if (mpoint1 > width) {
		mpoint1 = 0;
	}
	mpoint2 = map(sin(i), -1, 1, 0, height);
	i += 1;
	// print(mpoint2);

	for (let i = 0; i < division; i++) {
		dx = radius * cos(i*360/division);
		dy = radius * sin(i*360/division);
		let vect = createVector(dx, dy);
		circle.push(vect);
	}

	beginShape()
	noFill();
	stroke(color('white'));
	for (let i = 0; i < circle.length; i++) {
		let x = width/2 + circle[i].x;
		let y = height/2 + circle[i].y;
		vertex(x, y);
	}
	endShape(CLOSE);
}

let rpoint1, rpoint2, rpoint3;
let mpoint1 = 0;
let mpoint2 = 0;
let i = 0;

function setNewShape() {
  rpoint1 = random(0, width);
  rpoint2 = random(0, width);
  rpoint3 = random(0, width);
	circle = [];
}
