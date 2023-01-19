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
   *
   * @param {(...args: any[]) => any} func
   */
  delay(func) {
    if (!marbleRun.hasBeenStarted) {
      if (func()) {
        marbleRun.hasBeenStarted = true;
        if (this.i !== 1) this.i += 0.01;
        translate(this.i < 1 ? this.shiftX * this.i : this.shiftX, 0);
      }
    } else {
      translate(this.shiftX, 0);
    }
  }
}
