export default class Marble {
  constructor(world, { x, y, r }, options = {}) {
    this.radius = r;
    this.diameter = this.radius * 2;

    this.body = Matter.Bodies.circle(x, y, r, {
      friction: 0,
      restitution: 0.25,
      ...options,
    });
    Matter.Composite.add(world, this.body);
  }

  isOffScreen(p5) {
    const { position } = this.body;
    return (
      position.x <= -this.diameter * 2 ||
      position.x >= p5.width + this.diameter ||
      position.y <= -this.diameter * 2 ||
      position.y >= p5.height + this.diameter
    );
  }

  removeItselfFrom(world) {
    Matter.Composite.remove(world, this.body);
  }

  show(p5) {
    const { position, angle } = this.body;
    p5.push();

    p5.translate(position.x, position.y);
    p5.rotate(angle);

    p5.strokeWeight(1);
    p5.stroke(255);
    p5.fill(64);

    p5.rectMode(p5.CENTER);
    p5.ellipseMode(p5.CENTER);
    p5.ellipse(0, 0, this.diameter);
    p5.pop();
  }
}
