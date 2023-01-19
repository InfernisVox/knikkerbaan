//@ts-check
"use strict";

/**
 * @see https://stackoverflow.com/questions/69524578/measuring-how-long-a-key-is-pressed-using-p5-js-and-javascript
 */
class ProgressTimer {
  constructor(pickUp = 5000) {
    this.timeToPickUp = pickUp;
    this.startOfPickUp = 0;
    this.progress = 0;
  }

  start() {
    this.startOfPickUp = millis();
  }

  run() {
    if (this.startOfPickUp > 0 && this.progress < 100) {
      this.progress =
        ((millis() - this.startOfPickUp) / this.timeToPickUp) * 100;
    }
  }

  log() {
    console.log(this.progress);
  }

  reset() {
    this.startOfPickUp = 0;
    this.progress = 0;
  }
}
