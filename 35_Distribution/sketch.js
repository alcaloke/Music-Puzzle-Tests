let click, freQ, feedback, time;

function preload() {
  click = loadSound('ClosedHH 80sElectro.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1000);
  background(0);
  cycle = createP('0');
  cycle.style('font-size', '15pt');

  setInterval(trigger, 85 / 2);

  delay = new p5.Delay;
  delay.amp(2);
  click.disconnect();

  amplitude = new p5.Amplitude;
}

let interval;

let cycle;
let counter = 1;

let x_range;
let x_left;
let x_right;

let xr, yr;
let e;
let dots = [];

let p = [];
let q = [];
let h = 450;

function draw() {
  // background(0);
  x_range = map(mouseX, 0, width, 0, width / 2);
  strokeWeight(0.5);
  boundaries(x_range);

  strokeWeight(0.05 * level * 100);
  // stroke(h, 1000, 1000);
  // h += 0.8;
  // if (h > 550) {h = 450};
  for (let i = 0; i < p.length; i++) {
    stroke(450 + 15 * i, 1000, 1000);
    line(p[i], q[i], p[i + 1], q[i + 1]);
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].show();

    textAlign(CENTER);
    fill(750);
    noStroke();
    textFont('avenir');
    textSize(15);
    text(round(dots[i].x) + " " + round(dots[i].y), dots[i].x, dots[i].y);

    p[i] = dots[i].x;
    q[i] = dots[i].y;
  }

  refresh();

  time = map(mouseX, 0, width, 0.999, 0);
  feedback = map(mouseY, height, 0, 0, 0.999)
  delay.process(click, time, feedback, 2300);

  level = amplitude.getLevel();
}

let level, amplitude;

function refresh() {
  if (i > 8 * 5) {
    i = 0;
    dots = [];

    p = [];
    q = [];
    background(0);

    h = 450;
  }
}

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 7;
  }

  show() {
    noStroke();
    fill(1000);
    ellipse(this.x, this.y, this.radius);
  }

}

function boundaries(x) {
  stroke(750);
  line(width / 2 + x, 0, width / 2 + x, height);
  line(width / 2 - x, 0, width / 2 - x, height);
  x_left = width / 2 - x;
  x_right = width / 2 + x;
}

let i = 0;

function trigger() {
  xr = random(x_left, x_right);
  yr = random(0, height);

  click.playMode('restart');
  click.play();

  dots[i] = new Dot(xr, yr);
  i++;

  cycle.html(counter);
  counter++;
}
