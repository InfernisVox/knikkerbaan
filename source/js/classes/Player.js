// @ts-check
"use strict";

/** @typedef {import("../../../@types/p5/index").Color} Color */
/** @typedef {{x: number; y: number; r: number; color: string | Color; image: Image; scale: number; [key: string]: any}} PlayerAttributes */
/** @typedef {{p: Matter.Vector; a: number; v: Matter.Vector}} Data */

class Player extends Ball {
  static THRESHOLD_TIMER_PERCENT = 5.044000000059605;
  static RECORDING_LENGTH_MAX = 5_000;
  static LABEL = "Wollknäuel";
  static AUTO_MOVE = 0.02;

  /**
   * ...
   * @param {Player} player
   * @param {boolean} trigger
   */
  static recordDataOf(player, trigger) {
    if (trigger) {
      const p = player.body.position;
      const a = player.body.angle;
      const v = player.body.velocity;

      player.recordedData.unshift({
        p: {
          x: p.x,
          y: p.y,
        },
        a,
        v: {
          x: v.x,
          y: v.y,
        },
      });

      if (player.recordedData.length > Player.RECORDING_LENGTH_MAX) {
        player.recordedData.pop();
      }
    }
  }

  // ##################################################

  /** @type {boolean} */ isOnGround;
  /** @type {boolean} */ spaceHasBeenPressed;
  /** @type {ProgressTimer} */ timer;

  /** @type {() => void} */ onSpacePress;

  /** @type {Data[]} */ recordedData;

  isReversing;
  hasRewindStarted;

  /**
   *
   * @param {Matter.World} world
   * @param {PlayerAttributes} attributes
   * @param {Matter.IBodyDefinition} options
   */
  constructor(world, attributes, options) {
    super(world, attributes, options);

    this.r = attributes.r;
    this.width = 2 * this.r;
    this.height = 2 * this.r;

    this.isReversing = false;
    this.hasRewindStarted = false;
    this.spaceHasBeenPressed = false;

    this.recordedData = [];
    this.recordedDataLength = this.recordedData.length;

    this.onSpacePress = MarbleRun.mapSpaceKeyOfTo(
      this,
      FactoryFlag.SINGLE_JUMP
    );

    this.timer = new ProgressTimer();

    this.i = 0;
    this.jumpCount = 0;

    this.isOnGround = false;
  }

  // ##################################################
  initCollisions() {
    Matter.Events.on(engine, "collisionStart", function (event) {
      const pairs = event.pairs[0];
      const bodyA = pairs.bodyA;
      const bodyB = pairs.bodyB;
      if (bodyA.label === Player.LABEL || bodyB.label === Player.LABEL) {
        player.isOnGround = true;
        player.spaceHasBeenPressed = !player.isOnGround;
      }
    });

    Matter.Events.on(engine, "collisionEnd", function (event) {
      const pairs = event.pairs[0];
      const bodyA = pairs.bodyA;
      const bodyB = pairs.bodyB;
      if (bodyA.label === Player.LABEL || bodyB.label === Player.LABEL) {
        player.isOnGround = false;
        player.spaceHasBeenPressed = !player.isOnGround;
      }
    });
  }

  /**
   * @returns {Player}
   */
  rewind() {
    // #################### Zeit anhalten: Matter.Runner.stop(runner);
    // #################### Super Slow Mo: Matter.Sleeping.set(body, true);

    const lastData = this.recordedData.shift();

    if (lastData) {
      Matter.Body.setPosition(this.body, lastData.p);
      Matter.Body.setAngle(this.body, lastData.a);
      Matter.Body.setVelocity(this.body, lastData.v);
    }

    return this;
  }

  /**
   *
   * @param {boolean} bool
   * @returns {Player}
   */
  showBar(bool) {
    if (bool) {
      once(() => {
        if (!this.recordedData.length) {
          let offset = !(frameCount % 30) ? -5 : 5;

          if (this.i <= 1) this.i += 0.5;
          else this.i = 0;

          bar(player, color(0, 0, 0, 150), offset, this.i);
        } else {
          bar(player, color(0, 0, 0, 150));
        }
      });
    }

    return this;
  }

  /**
   *
   * @param {boolean} bool
   * @returns {Player}
   */
  showGlitch(bool) {
    if (bool) image(gifRewind, 0, 0, width, height);
    return this;
  }

  /**
   *
   * @param {boolean} bool
   * @returns {Player}
   */
  showAngle(bool) {
    if (bool) {
      const { position: pos, angle } = this.body;
      once(() => {
        translate(pos.x, pos.y);
        rotate(angle);
        strokeWeight(2);
        stroke("white");
        line(0, 0, this.r, 0);
      });
    }
    return this;
  }

  /**
   *
   * @param {boolean} [bool]
   * @param {number} [velocity]
   */
  setAutoMove(bool = true, velocity = 0.02) {
    if (bool) {
      if (!mouseIsDragged && this.body.velocity.x < 0.02) {
        Matter.Body.setAngularVelocity(player.body, velocity);
      }
    }
    return this;
  }

  resetBooleans() {
    this.isReversing = false;
    this.hasRewindStarted = false;
  }
}
