function preload() {
	loop = loadSound('D94 - 96.wav');
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	amplitude = new p5.Amplitude();
	filter = new p5.LowPass();

	loop.disconnect();
	loop.connect(filter);
	loop.loop();
}

let r = 150;
let dr = 0.25;

let radius = 50;
let dradius = 1.75;

let filter, freq, res;
let amplitude, level;

let xoff = 0.0;
let blue = 0;
let blueOff;

function draw() {
	background(255);
	noStroke();

	// fill(color('aliceblue'));
	// rect(0, 0, width, height);
	//
	// fill(255);
	// rect(5, 5, width-10, height-10);

	let circles = 15;
	for (let i = 0; i < circles; i++) {
		fill(r - i*10, 255, blue, 55);
		ellipse(width/2, height/2, radius - i*radius/circles);
	}

	r += dr;
	if (r >= 255 || r <= 150) {
		dr *= -1;
	}

	radius += dradius;
	if (radius >= 150 || radius <= 50) {
		dradius *= -1;
	}

	level = amplitude.getLevel();
	xoff += 0.25 * level;
	blueOff = noise(xoff);
	blue = 255 * blueOff;
	// print(blue);

	freq = map(radius, 50, 150, 10, 12000);
	filter.freq(freq);
	res = 12;
	filter.res(res);

}

function mousePressed() {
	let fs = fullscreen();
	if (!fs) {
		fullscreen(true);
	}
}

function windowResized() {
	resizeCanvas(windowHeight*4/5, windowHeight)
}
