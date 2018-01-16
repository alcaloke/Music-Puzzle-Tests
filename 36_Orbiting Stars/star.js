class Star {
  constructor(origin_x, origin_y, radius) {
    this.origin_x = origin_x;
    this.origin_y = origin_y;
    this.radius = radius;

    this.density = 90;
    this.dx = 0;
    this.dy = 0;

    this.h = 50;

    this.hist = [];

    this.angle = 0;
  }

  fusion() {
    angleMode(DEGREES);

    for (let i = 0; i < this.hist.length; i++) {
      let pos = this.hist[i];
      for (let i = 0; i < this.density; i++) {
        this.dx = this.radius * cos(i*360/this.density);
        this.dy = this.radius * sin(i*360/this.density);
        line(pos.x, pos.y, pos.x + this.dx, pos.y - this.dy);
      }
    }

    for (let i = 0; i < this.density; i++) {
      this.dx = this.radius * cos(i*360/this.density);
      this.dy = this.radius * sin(i*360/this.density);

      line(this.origin_x, this.origin_y, this.origin_x + this.dx, this.origin_y - this.dy);
    }
  }

  glow() {
    colorMode(HSB, 1000);
    this.h += 0.5;
    strokeWeight(0.06);
    stroke(this.h, 1000, 1000);
    if (this.h > 150) {
      this.h = 50;
    }
  }

  orbit() {
    this.origin_x += 40*cos(this.angle);
    this.origin_y -= 5*sin(this.angle);
    this.angle += 4;

    let vector = createVector(this.origin_x, this.origin_y);
    this.hist.push(vector);

    if (this.hist.length > 2) {
      this.hist.splice(0, 1);
    }
  }
}
