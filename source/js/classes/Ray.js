// @ts-check
"use strict";

class Ray {
  /**
   * A `p5` vector holding the x and y coordinates
   * @type {Vector}
   */
  pos;

  /**
   * A 2D vector which has been generated using `p5.Vector.fromAngle`
   * @type {Vector}
   */
  dir;

  /**
   * The constructor takes two parameters. The first holds x and y
   * coordinates whereas the last one just stores the angle at which
   * the ray is going to be broadcast.
   * @param {Vector} pos x and y coordinates of the ray within a simple object
   * @param {number} angle angle of the ray
   */
  constructor(pos, angle) {
    this.pos = pos;
    // @ts-ignore
    this.dir = p5.Vector.fromAngle(angle);
  }

  /** Draw the ray using `stroke` and `line` */
  show() {
    stroke(255);
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * 50, this.dir.y * 50);
    pop();
  }

  /** TODO: Please add a description and / or explanation */
  /**
   * ...
   * @param {number} x Value along the x-axis
   * @param {number} y Value along the y-axis
   */
  lookAt(x, y) {
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }

  /** TODO: Please add a description and / or explanation */
  /**
   * ...
   * @param {Boundary} wall The boundary at which the calculation will take place
   * @returns {Vector | null}
   */
  cast(wall) {
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const den1 = (x1 - x2) * (y3 - y4);
    const den2 = (y1 - y2) * (x3 - x4);
    const den = den1 - den2;
    if (den === 0) return null;

    const t1 = (x1 - x3) * (y3 - y4);
    const t2 = (y1 - y3) * (x3 - x4);
    const t = (t1 - t2) / den;

    const u1 = (x1 - x2) * (y1 - y3);
    const u2 = (y1 - y2) * (x1 - x3);
    const u = -(u1 - u2) / den;

    if (t > 0 && t < 1 && u > 0) {
      const pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return null;
    }
  }
}
