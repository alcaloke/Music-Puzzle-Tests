let stars = [];

function preload() {
  sound = loadSound('A08 - 113 - iMaschine mixdown.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(color('black'));

  for (s of stars) {
    s.fusion();
    s.glow();
    s.orbit();
  }

  if (stars.length > 10) {
    stars.splice(0, 1);
  }


  if (bool) {
    for (let i = 0; i < stars.length; i++) {
			distance = dist(mx, my, stars[i].origin_x, stars[i].origin_y);
      if (distance < 0.1) {
        sound.playMode('restart');
				sound.rate(1);
        sound.play();
				ellipse(mx, my, 150);
      }
    }
  }

	ellipse(mx, my, 15);

}

let bool = false;
let mx, my, distance;

function mousePressed() {
  mx = mouseX;
  my = mouseY;

  stars.push(new Star(mouseX, mouseY, 100));

  if (!bool) {
    bool = true;
  }
}
