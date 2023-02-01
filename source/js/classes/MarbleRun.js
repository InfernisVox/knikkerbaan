class MarbleRun {
  static #empty = function () {
    return null;
  };
  static #singleJump = function () {
    if (!player.spaceHasBeenPressed) {
      Matter.Body.applyForce(
        player.body,
        { x: player.body.position.x, y: player.body.position.y },
        !playerIsMovingUpward
          ? {
              x: 0.065,
              y: -0.075,
            }
          : {
              x: -0.065,
              y: -0.075,
            }
      );
      player.spaceHasBeenPressed = true;
    }
  };
  static #cannonFire = function () {
    if (player.body.isStatic) Matter.Body.setStatic(player.body, false);

    if (cannonHasBeenLoaded) {
      Matter.Body.applyForce(
        player.body,
        { x: player.body.position.x, y: player.body.position.y },
        cannonAngle < 0
          ? {
              x: 0.275,
              y: -0.1,
            }
          : !cannonAngle
          ? {
              x: 0.275,
              y: 0,
            }
          : {
              x: 0.275,
              y: 0.1,
            }
      );
    }

    cannonHasBeenFired = true;

    soundCanonshoot.play();
    setTimeout(() => {
      soundCanonshoot.stop();
    }, 1000);
  };
  /**
   *
   * @param  {(() => boolean)[]} exitConditions
   * @returns {Player | undefined}
   */
  static #playerRewind = function (...exitConditions) {
    // #################### Zeit anhalten: Matter.Runner.stop(runner);
    // #################### Super Slow Mo: Matter.Sleeping.set(body, true);

    const lastData = player.recordedData.shift();

    if (lastData) {
      Matter.Body.setPosition(player.body, lastData.p);
      Matter.Body.setAngle(player.body, lastData.a);
      Matter.Body.setVelocity(player.body, lastData.v);
    }

    for (let exitCondition of exitConditions) {
      if (exitCondition()) return player;
    }

    return player;
  };
  static #carRewind = function () {
    const offset = map(carProgressValue, 0, 1, 0, 100);

    if (isNull(carBodyPositionX)) carBodyPositionX = carBody.body.position.x;

    if (carProgressValue >= 0.99999) {
      Matter.Body.setPosition(carBody.body, {
        x: carBodyPositionX,
        y: 630.77351582555,
      });
    } else {
      Matter.Body.setPosition(carBody.body, {
        x: carBodyPositionX - offset,
        y: 630.77351582555,
      });
    }
  };

  /**
   * The factory that returns the function that will be mapped onto single mouse buttons
   * @param {number} factoryFlag
   * @returns {() => any}
   */
  static mapSpacePressTo(factoryFlag) {
    switch (factoryFlag) {
      case SpaceMapping.EMPTY: {
        playerCurrentMapping.press = SpaceMapping.EMPTY;
        return MarbleRun.#empty;
      }
      case SpaceMapping.SINGLE_JUMP: {
        playerCurrentMapping.press = SpaceMapping.SINGLE_JUMP;
        return MarbleRun.#singleJump;
      }
      case SpaceMapping.CANNON_FIRE: {
        playerCurrentMapping.press = SpaceMapping.CANNON_FIRE;
        return MarbleRun.#cannonFire;
      }
      default: {
        playerCurrentMapping.press = SpaceMapping.EMPTY;
        return MarbleRun.#empty;
      }
    }
  }

  /**
   * The factory that returns the function that will be mapped onto single mouse buttons
   * @param {number} factoryFlag
   * @returns {() => any}
   */
  static mapSpaceHoldTo(factoryFlag) {
    switch (factoryFlag) {
      case SpaceMapping.EMPTY: {
        playerCurrentMapping.hold = SpaceMapping.EMPTY;
        return MarbleRun.#empty;
      }
      case SpaceMapping.PLAYER_REWIND: {
        playerCurrentMapping.hold = SpaceMapping.PLAYER_REWIND;
        return MarbleRun.#playerRewind;
      }
      case SpaceMapping.CAR_REWIND: {
        playerCurrentMapping.hold = SpaceMapping.CAR_REWIND;
        return MarbleRun.#carRewind;
      }
      default: {
        playerCurrentMapping.press = SpaceMapping.EMPTY;
        return MarbleRun.#empty;
      }
    }
  }

  constructor() {
    this.hasBeenStarted = false;
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  stats(x = 10, y = 15) {
    if (frameCount) {
      stroke("black");
      text(
        `t = ${getTime(millis())} | fr = ${frameCount} | fps = ${round(
          frameRate()
        )}`,
        x,
        y
      );
    }
  }

  // Cycle #################################

  static Cycle = class Cycle {
    static #milliSecondsStart = null;
    static #milliSecondsEnd = null;
    static #hasBeenTriggered = false;

    /**
     *
     * @param {number} frame The exact frame from which the callback shall be called
     * @param {() => void} callback
     * @returns {Cycle}
     */
    static at(frame, callback) {
      if (frame === frameCount) callback();
      return this;
    }

    /**
     *
     * @param {number} milliSeconds
     * @param {() => void} callback
     * @returns {Cycle}
     */
    static under(milliSeconds, callback) {
      let now = millis();
      if (now <= milliSeconds) callback();
      return this;
    }

    /**
     *
     * @param {number} milliSeconds
     * @param {() => void} callback
     * @returns {Cycle}
     */
    static over(milliSeconds, callback) {
      let now = millis();
      if (now >= milliSeconds) callback();
      return this;
    }

    /**
     *
     * @param {number} milliSecondsStart
     * @param {number} milliSecondsEnd
     * @param {() => void} callback
     * @returns {Cycle}
     */
    static between(milliSecondsStart, milliSecondsEnd, callback) {
      let now = millis();
      if (now >= milliSecondsStart && now <= milliSecondsEnd) {
        callback();
      }
      return this;
    }

    /**
     *
     * This function can only work properly if it is executed within `draw`.
     * Outside this context it can be triggered but not run completely since the callbacks
     * rely on the loop functionality of `draw`.
     *
     * @param {number} milliSeconds The total duration for which `forNext` will run
     * @param {boolean | (...args: any[]) => boolean} trigger The trigger for calling `forNext`
     * @param {() => void} callback The callback to be called during `forNext`
     * @param {() => void} [callbackEnd] The callback that is called when `forNext` has terminated
     */
    static forNext(milliSeconds, trigger, callback, callbackEnd) {
      if (!Cycle.#hasBeenTriggered && typeof trigger === "function") {
        if (trigger()) Cycle.#hasBeenTriggered = true;
      } else if (!Cycle.#hasBeenTriggered && typeof trigger === "boolean") {
        if (trigger) Cycle.#hasBeenTriggered = true;
      }

      if (Cycle.#hasBeenTriggered) {
        let now = millis();

        if (
          isNull(Cycle.#milliSecondsStart) &&
          isNull(Cycle.#milliSecondsEnd)
        ) {
          Cycle.#milliSecondsStart = now;
          Cycle.#milliSecondsEnd = Cycle.#milliSecondsStart + milliSeconds;
        }

        if (now <= Cycle.#milliSecondsEnd) {
          callback();
        } else {
          Cycle.#milliSecondsStart = null;
          Cycle.#milliSecondsEnd = null;
          Cycle.#hasBeenTriggered = null;
          if (callbackEnd) callbackEnd();
          return;
        }
      }
    }
  };
}
