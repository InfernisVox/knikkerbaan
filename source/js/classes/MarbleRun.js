class MarbleRun {
  /**
   * The factory that returns the function that will be mapped onto single mouse buttons
   * @param {Player} player
   * @param {number} factoryFlag
   * @returns {() => any}
   */
  static mapSpacePressOfTo(player, factoryFlag) {
    switch (factoryFlag) {
      case FactoryFlag.EMPTY: {
        currentState.press = FactoryFlag.EMPTY;
        return () => null;
      }

      case FactoryFlag.SINGLE_JUMP: {
        currentState.press = FactoryFlag.SINGLE_JUMP;
        return () => {
          if (!player.spaceHasBeenPressed) {
            Matter.Body.applyForce(
              player.body,
              { x: player.body.position.x, y: player.body.position.y },
              {
                x: 0.065,
                y: -0.09,
              }
            );
          }
        };
      }

      case FactoryFlag.CANON_SHOOT: {
        currentState.press = FactoryFlag.CANON_SHOOT;
        return () => {
          if (player.body.isStatic) Matter.Body.setStatic(player.body, false);

          Matter.Body.applyForce(
            player.body,
            { x: player.body.position.x, y: player.body.position.y },
            canonAngle <= 0
              ? {
                  x: -canonAngle / 1.5,
                  y: -0.1,
                }
              : {
                  x: canonAngle / 1.5,
                  y: 0.1,
                }
          );

          soundCanonshoot.play();
          setTimeout(() => {
            soundCanonshoot.stop();
          }, 1000);

          player.onSpacePress = MarbleRun.mapSpacePressOfTo(
            player,
            FactoryFlag.SINGLE_JUMP
          );
        };
      }

      default: {
        return () => {
          console.log("Hello World");
        };
      }
    }
  }

  static mapSpaceHoldOfTo(player, factoryFlag) {
    switch (factoryFlag) {
      case FactoryFlag.EMPTY: {
        currentState.hold = FactoryFlag.EMPTY;
        return () => null;
      }

      case FactoryFlag.PLAYER_REWIND: {
        currentState.hold = FactoryFlag.PLAYER_REWIND;
        /**
         *
         * @param  {(() => boolean)[]} exitConditions
         * @returns {Player | undefined}
         */
        return (...exitConditions) => {
          // #################### Zeit anhalten: Matter.Runner.stop(runner);
          // #################### Super Slow Mo: Matter.Sleeping.set(body, true);

          const lastData = player.recordedData.shift();

          for (let exitCondition of exitConditions) {
            if (exitCondition()) return player;
          }

          if (!player.constraints.length) {
            if (lastData) {
              Matter.Body.setPosition(player.body, lastData.p);
              Matter.Body.setAngle(player.body, lastData.a);
              Matter.Body.setVelocity(player.body, lastData.v);
            }
          }

          // for rewinding player and car ########################################
          if (carHasBeenShot && !player.recordedData.length) {
            // If the player lays on the ground with the car still attached
            if (player.isOnGround) {
              // TODO: Create a new instance of the car body and spawn the player at the end of the first ramp
              Matter.Body.setPosition(player.body, playerPositionOriginal);

              setTimeout(() => {
                Matter.Body.setStatic(carBody.body, true);
              }, 1000);
              return;
            }

            Matter.Body.setPosition(carBody.body, carBodyPositionOriginal);

            if (!carBody.body.isStatic) {
              Matter.Body.setStatic(carBody.body, true);
            }

            setTimeout(() => {
              player.onSpaceHold = MarbleRun.mapSpaceHoldOfTo(
                player,
                FactoryFlag.CAR_REWIND
              );
              carHasBeenShot = false;
            }, 1000);
          }

          return player;
        };
      }

      case FactoryFlag.CAR_REWIND: {
        currentState.hold = FactoryFlag.CAR_REWIND;
        return () => {
          const offset = map(carProgressValue, 0, 1, 0, 100);

          if (isNull(carBodyPositionX))
            carBodyPositionX = carBody.body.position.x;

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
      }

      default: {
        return () => {
          console.log("Hello World");
        };
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
