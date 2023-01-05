// @ts-check
"use strict";

/** @typedef {import("../../../@types/p5/index").Vector} Vector */

class Boundary {
  /**
   * The first 2D vector of the instance
   * @type {Vector}
   */
  a;

  /**
   * The second 2D vector of the instance
   * @type {Vector}
   */
  b;

  /**
   * The constructor which takes four parameters in total two of which
   * are going to be used to create a new `p5` vector using `createVector`
   * @param {number} x1 The x coordinate of the first vector `a`
   * @param {number} y1 The y coordinate of the second vector `b`
   * @param {number} x2 The x coordinate of the first vector `a`
   * @param {number} y2 The y coordinate of the second vector `b`
   */
  constructor(x1, y1, x2, y2) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
  }

  /** Draw the boundary using `stroke` and `line` */
  show() {
    stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
