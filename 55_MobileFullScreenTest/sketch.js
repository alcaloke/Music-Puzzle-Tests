/*
 * ANDROID ONLY
 * as of 03/07/2017
 */

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  rectMode(CENTER);
  rect(width / 2, height / 2, 200, 100);
}

/* fullscreen() must be called in a touch or
 * mouse event to work!
 */
function touchStarted () {
  var fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
}

/* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling
 * the page.
 */
document.ontouchmove = function(event) {
    event.preventDefault();
};
