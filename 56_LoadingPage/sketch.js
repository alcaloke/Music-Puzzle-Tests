let h = 400;

function setup() {
	createCanvas(windowWidth, windowHeight);
	bauhaus = loadFont('BauhausStd-Medium.otf');
}

let ef = 0;
let efs = 2;
let tf = 255;
let tfs = 1;

function draw() {
	loadingPage();
}

function loadingPage() {
	background(0);
	noStroke();

	fill(tf);
	ellipse(width / 2, height / 2, 150);

	fill(ef);
	ellipse(width / 2, height / 2, 130);

	fill(tf);
	textFont(bauhaus);
	textSize(34);
	textAlign(CENTER);
	text('Loading', width/2, height/2 + 10);

	ef += efs;
	if (ef > 255 | ef < 0) {
		efs *= -1;
	}
	tf -= tfs;
	if (tf > 255 | tf < 0) {
		tfs *= -1;
	}
}
