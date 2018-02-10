let loop1, loop2;

function preload() {
  loop2 = loadSound('C04 - 87 2.wav');
  loop1 = loadSound('C04 - 87.wav');
}

let complete = false;
let change_music = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  loop1.loop();
  // loop2.loop();

  amp = new p5.Amplitude;

  angleMode(DEGREES);
  origin_x = width / 2;
  origin_y = height / 2;
  radius = 380;
}

let levels = [];

let origin_x, origin_y, dx, dy, radius;

function draw() {
  background(color('AliceBlue'));
  level = amp.getLevel();

  // AMPLITUDE METER
  // rectMode(CENTER);
  // noStroke();
  // fill(color('magenta'));
  let maxLevel = 0.175 / 2;
  // let y = map(level, 0, maxLevel, 0, height);
  // rect(width / 2, height, 50, y);

  // MID LEVEL INDICATOR
  // textSize(20);
  // fill(color('red'));
  // text(maxLevel / 2, width / 2, height / 2);

  // RED LINE
  stroke(color('red'));
  line(0, height / 2, width, height / 2);

  // THRESHOLD CIRCLE
  let dia = map(mouseY, height, 0, 1, 1000);
  let normalisedLevel = level / 2;
  if (normalisedLevel > maxLevel / 2) {
    fill(color('navy'));
    noStroke();
    ellipse(width / 5, height / 4, dia);
  }

  // AMPLITUDE GRAPH
  levels.push(level);
  beginShape();
  for (let i = 0; i < levels.length; i++) {
    let lvl = map(levels[i], 0, maxLevel, 0, height / 2);
    stroke(color('hotpink'));
    strokeWeight(0.7);
    noFill();
    vertex(i * 4, height - lvl);
  }
  endShape();
  if (levels.length > width / 4 - 10) {
    levels.splice(0, 1);
  }

  // LEVEL (TOP LEFT)
  // textFont('avenir');
  // fill(255);
  // noStroke();
  // text(levels[levels.length - 1], 0, 20);

  // RHYTHM16 CIRCLE
  for (let i = 0; i < 16; i++) {
    dx = origin_x - radius * cos(i * 360 / 16);
    dy = origin_y - radius * sin(i * 360 / 16);
    strokeWeight(0.4);
    stroke(color('pink'));
    line(origin_x, origin_y, dx, dy);

    let v = createVector(dx, dy);
    if (vectors.length < 16) {
      vectors.push(v);
    }
  }

  // RHYTHMIC SHAPE (FORMONY)
  beginShape();
  translate(mouseX - width / 2, 0);
  fill(255, 150 * level * 10, 0);
  vertex(vectors[4].x, vectors[4].y);
  vertex(vectors[7].x, vectors[7].y);
  vertex(vectors[10].x, vectors[10].y);
  vertex(vectors[2].x, vectors[2].y);
  endShape(CLOSE);

  // CHANGE VOLUME
  let vol;
  if (mouseX < width / 2) {
    vol = map(mouseX, 0, width / 2, 0, 1);
  } else if (mouseX > width / 2) {
    vol = map(mouseX, width / 2, width, 1, 0);
  }
  loop1.setVolume(vol);

  // MISSION COMPLETE
  if (mouseX > 710 && mouseX < 730 && mouseY > 5 && mouseY < 25) {
    complete = true;
    change_music();
  }
  // SHOW TEXT MISSION COMPLETE
  if (complete) {
    textAlign(CENTER);
    textSize(145);
    textStyle(BOLD);
    textFont('avenir');
    fill(0, 191, 255, alpha);
    alpha += 5;
    if (alpha > 255) {
      alpha = 0;
    }
    text('MISSION COMPLETE', width / 2, height / 2);
  }
  // CHANGE MUSIC
  function change_music() {
    loop1.stop();
    if (!loop2.isPlaying()) {
      loop2.loop();
    }
  }


}
let alpha = 0;
let vectors = [];
