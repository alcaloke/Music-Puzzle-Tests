function preload() {
  a07 = loadSound('A07 - 113 - iMaschine mixdown.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1000);
  strokeWeight(0.2);

  a07.loop();

  amp = new p5.Amplitude;
}

let h;
let h_base = 450;
let divider;

function draw() {
  level = amp.getLevel();
  print(level);
  divider = map(mouseX, 0, width, 40, 40 * 3) * level * 2;

  for (let i = 0; i < divider; i++) {
    // h = mouseX + h_base + i * 10;
    h = h_base + i * 400 / divider;
    fill(h, 1000, 1000);
    if (level > 0.25) {
      rect(0, i * height / divider, width, i + 1 * height / divider)
    } else {
      rect(i * width / divider, 0, i + 1 * width / divider, height);
    }

  }

}
