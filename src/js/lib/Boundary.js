export default class Boundary {
  constructor(world, { x, y, w, h }, options = {}) {
    this.width = w;
    this.height = h;

    this.body = Matter.Bodies.rectangle(x, y, w, h, {
      isStatic: true,
      friction: 0.5,
      restitution: 0,
      ...options,
    });

    Matter.Composite.add(world, this.body);
  }

  show(p5) {
    const { position, angle } = this.body;
    p5.push();

    p5.translate(position.x, position.y);
    p5.rotate(angle);

    p5.strokeWeight(1);
    p5.noStroke();
    p5.fill(0);

    p5.rectMode(p5.CENTER);
    p5.rect(0, 0, this.width, this.height);
    p5.pop();
  }
}
