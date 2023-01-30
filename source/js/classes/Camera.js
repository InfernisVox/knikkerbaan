class Camera {
  /** @type {Matter.Body} */ ref;
  /** @type {number} */ shiftX;
  /** @type {number} */ shiftY;

  /**
   *
   * @param {Matter.Body} ref The Matter instance that is being followed by the camera
   */
  constructor(ref) {
    this.ref = ref;
    this.i = 0;
    this.shiftX = -this.ref.position.x + width / 3;
    this.shiftY = -this.ref.position.y + height / 3;

    Matter.Events.on(engine, "beforeUpdate", () => {
      this.shiftX = -this.ref.position.x + width / 3;
      this.shiftY = -this.ref.position.y + height / 3;
    });
  }

  /**
   * A function to allow the camera to remain static at the
   * beginning until the condition is met.
   * @param {(...args: any[]) => any} ifTrue
   */
  swivelBehind(ifTrue) {
    if (!marbleRun.hasBeenStarted) {
      if (ifTrue()) {
        marbleRun.hasBeenStarted = true;
        if (this.i !== 1) this.i += 0.01;

        translate(this.i < 1 ? this.shiftX * this.i : this.shiftX, 0);

        once(() => {
          translate(-this.shiftX * 0.4, 0);
          for (let i = 0; i <= 15; i++) {
            image(imgRoom, i * 1280, 0, 1280, 720);
          }
        });

        mouse.setOffset({
          x: this.i < 1 ? this.shiftX * this.i : this.shiftX,
          y: 0,
        });
      }
    } else {
      translate(this.shiftX, 0);

      once(() => {
        translate(-this.shiftX * 0.4, 0);
        for (let i = 0; i <= 15; i++) {
          image(imgRoom, i * 1280, 0, 1280, 720);
        }
      });

      mouse.setOffset({ x: -this.shiftX, y: 0 });

      marbleRun.stats();
    }
  }
}
