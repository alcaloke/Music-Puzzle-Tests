let loop1, loop2;

function preload() {
  loop1 = loadSound('0D1b.wav');
	loop2 = loadSound('0D1a.wav');
}

let loop2on = false;
let e = 1;

function mousePressed() {
	if (loop1.isPlaying()) {
		loop1.stop();
		loop2.loop();
	} else if (loop2.isPlaying()) {
		loop1.loop();
		loop2.stop();
	}

  loop2on = !loop2on;

  if (loop2on) {
    e = 3;
  } else {
    e = 1;
  }
}

function changeBG() {
  background(color('navy'));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  angleMode(DEGREES);
  colorMode(HSB, 1000);
  loop1.loop();
  amp = new p5.Amplitude;
  let t = loop1.duration() * 1000;
  print(t);
  setInterval(trigger, t / 40);
}

// trigger function
function trigger() {
  if (loop2on) {
    for (let i = 0; i < points; i++) {
      let rX = random(0, width);
      let rY = random(0, height);
      randomX.push(rX);
      randomY.push(rY);
    }
  }

  if (randomX.length > points) {
    randomX = [];
    randomY = [];
  }
}

let randomX = [];
let randomY = [];
let points = 5;

let amp, level;

let a = 0;
let hu = 450;

function draw() {
  background(0);
  if (loop2on) {
    changeBG();
  }

  // Background shapes
  fill(hu, 1000, 1000);
  hu += 10;
  if (hu > 850) {
    hu = 450;
  }
  beginShape();
  for (let i = 0; i < points; i++) {
  	vertex(randomX[i], randomY[i]);
  }
  endShape(CLOSE);

  level = amp.getLevel();

  // Controllers
	let c = map(mouseX, 0, width, -3 * e, 3 * e); // rotation speed
  let b = map(level, 0, 0.2, 1.7, 1.7 * 10); //particle size
  let d = map(mouseY, height, 0, 0, 70); // shape

  // Text
  fill(color('white'));
  text(d, 10, 20);
  textSize(20);

  // spiral shapes
  push();
  translate(width / 2, height / 2);
  rotate(a);
  beginShape();
  for (let i = 0; i < 360; i += 1) {
    let r = map(tan(i * d) * sin(i * d), -1, 1, 0, 150);
    let x = r * cos(i);
    let y = r * sin(i);
    point(x, y);
    stroke(450 + i, 1000, 1000);
    strokeWeight(b * i / 70);
  }
  endShape();
  pop();
  a += 1 * c;

}
