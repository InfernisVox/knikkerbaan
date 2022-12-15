export default class P5 {
  constructor(w, h, { preload, setup, draw }, elementId = null) {
    this.w = w;
    this.h = h;

    this.p5 = new p5(function (p5) {
      p5.preload = preload;
      p5.setup = setup;
      p5.draw = draw;
    }, document.getElementById(elementId));
  }

  get instance() {
    return this.p5;
  }

  get width() {
    return this.w;
  }

  get height() {
    return this.h;
  }
}
