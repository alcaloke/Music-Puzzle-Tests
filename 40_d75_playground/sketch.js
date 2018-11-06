let loop;
let amplitude, level;
let filter;

function preload() {
  loop = loadSound('10 D75_Playground.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fullscreen();
  loop.loop();
  loop.disconnect();
  amplitude = new p5.Amplitude;
  filter = new p5.LowPass;
  loop.connect(filter);

  setInterval(genRan, 526 /8 );
}

let hu = 450;
let barHeight = 780 / 4;
let wide = 500;

function draw() {
  background(0);

  level = amplitude.getLevel();

  stroke(color('gray'));
  for (let i = 0; i < 6; i++) {
    line(i*width/6, 0, i* width/6, height);
  }
  line(0, height/2, width, height/2);

  fill(450, 1000, 750);
  rect(0, height/2, 30, barHeight);

  if (mouseIsPressed && mouseX < 30 && mouseY > height/2) {
    barHeight = map(mouseY, height/2, height, 0, height/2);
  }

  wide = map(barHeight, 0, height / 2, 0, 1000);
  print(wide);

  noStroke();
  colorMode(HSB, 1000);
  fill(hu, 1000, 950);

  push();
  translate(-width / 6, 0);
  beginShape();
  x[0] = width / 2 - level * wide;
  y[0] = height / 2;
  vertex(x[0], y[0]);
  x[1] = width / 2;
  y[1] = height / 2 - level * wide;
  vertex(x[1], y[1]);
  x[2] = randomX;
  y[2] = height / 2 - randomY;
  vertex(x[2], y[2]);
  x[3] = width / 2 + level * wide;
  y[3] = height / 2;
  vertex(x[2], y[3]);
  x[4] = width / 2;
  y[4] = height / 2 + level * wide;
  vertex(x[4], y[4]);
  x[5] = randomX;
  y[5] = height / 2 + randomY;
  vertex(x[5], y[5]);
  endShape(CLOSE);

  for (let i = 0; i < x.length; i++) {
    vect[i] = createVector(x[i], y[i]);
  }

  beginShape();
  for (let i = 0; i < shapeHist.length; i++) {
    vertex(shapeHist[i].x + width / 3, shapeHist[i].y);
  }
  endShape();
  pop();

  if (shapeHist.length == 6) {
    // shapeHist.splice(0, 1);
    shapeHist = [];
  }

  hu += 50;
  if (hu > 800) {
    hu = 450;
  }

  let res = map(mouseY, height, 0, 5, 15);
  let freQ = map(mouseX, 0, width, 10, 11025);
  filter.set(freQ, res);

  textAlign(RIGHT);
  textSize(17);
  fill(color('snowhite'));
  text(round(freQ) + " Hz, Res: " + round(res), width, height);
}

let x = [];
let y = [];
let vect = [];
let shapeHist = [];
let vect0, vect1, vect2, vect3, vect4, vect5;
let randomX, randomY;

function genRan() {
  randomX = random(width / 3, width * 2 / 3);
  randomY = random(0, height / 2);

  for (let i = 0; i < vect.length; i++) {
    shapeHist.push(vect[i]);
  }
}
