// @ts-check
"use strict";

class Particle {
  /**
   * A `p5` vector holding the x and y coordinates
   * @type {Vector}
   */
  pos;

  /**
   * An array holding the rays
   * @type {Ray[]}
   */
  rays;

  /** TODO: Please add a description and / or explanation */
  /**
   * ...
   */
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    let rays = 300;
    for (let a = 0; a < 359.9; a += 360 / rays) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  /**
   * This function is a setter function for updating the position of the particle
   * @param {number} x A new x value for the `pos` attribute
   * @param {number} y A new y value for the `pos` attribute
   */
  update(x, y) {
    this.pos.set(x, y);
  }

  /** TODO: Please add a description and / or explanation */
  /**
   * ...
   * @param {Boundary[]} walls An array holding all boundaries
   */
  look(walls) {
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;

      for (let wall of walls) {
        let pt = ray.cast(wall);
        if (pt) {
          // @ts-ignore
          const d = p5.Vector.dist(this.pos, pt);
          if (d < record) {
            closest = pt;
            record = d;
          }
        }
      }

      if (closest) {
        stroke(255, 100);
        strokeWeight(4);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }

  /** Draw the particle using `fill` and `ellipse` */
  show() {
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, 16);

    // for (const ray of this.rays) {
    //   ray.show()
    // }
  }
}
