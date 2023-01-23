// @ts-check
"use strict";

/** @typedef {import("../../../@types/p5/index").Color} Color */
/** @typedef {{x: number; y: number; r: number; color: string | Color; image: Image; scale: number; [key: string]: any}} PlayerAttributes */

class Player extends Ball {
  static THRESHOLD_POSITION = 10;
  static THRESHOLD_ANGLE = 0.5;
  static THRESHOLD_VELOCITY = 10;
  static THRESHOLD_TIMER_PERCENT = 5.044000000059605;
  static LABEL = "Wollknäuel";

  /**
   *
   * @param {number} value
   */
  static setVectorThreshold(value) {
    Player.THRESHOLD_POSITION = value;
  }

  /**
   *
   * @param {number} value
   */
  static setAngleThreshold(value) {
    Player.THRESHOLD_ANGLE = value;
  }

  /**
   *
   * @param {number} value
   */
  static setVelocityThreshold(value) {
    Player.THRESHOLD_VELOCITY = value;
  }

  /**
   * ...
   * @param {Player} player
   * @param {boolean} trigger
   * @param {(...args: any[]) => boolean} ifTrue
   */
  static savePositionsOf(player, trigger, ifTrue) {
    if (trigger) {
      const { x: x0, y: y0 } = player.body.position;
      const vec = { x: x0, y: y0 };

      if (
        ifTrue(
          player.positions.length
            ? player.positions[player.positions.length - 1]
            : player.startPosition,
          vec,
          Player.THRESHOLD_POSITION
        )
      ) {
        player.positions.push(vec);
      }
    }
  }

  /**
   * ...
   * @param {Player} player
   * @param {boolean} trigger
   * @param {(...args: any[]) => boolean} ifTrue
   */
  static saveAnglesOf(player, trigger, ifTrue) {
    if (trigger) {
      let angle = player.body.angle;

      if (
        ifTrue(
          player.angles.length
            ? player.angles[player.angles.length - 1]
            : player.startAngle,
          angle,
          Player.THRESHOLD_ANGLE
        )
      )
        player.angles.push(player.body.angle);
    }
  }

  /**
   * ...
   * @param {Player} player
   * @param {boolean} trigger
   * @param {(...args: any[]) => boolean} ifTrue
   */
  static saveVelocityOf(player, trigger, ifTrue) {
    if (trigger) {
      let velocity = player.body.velocity;

      if (
        ifTrue(
          player.velocities.length
            ? player.velocities[player.velocities.length - 1]
            : player.startVelocity,
          velocity,
          Player.THRESHOLD_VELOCITY
        )
      )
        player.velocities.push(player.body.velocity);
    }
  }

  // ##################################################

  /** @type {Matter.Vector[]} */ positions;
  /** @type {number[]} */ angles;
  /** @type {Matter.Vector[]} */ velocities;
  /** @type {boolean} */ isOnGround;
  /** @type {boolean} */ hasJumped;
  /** @type {number} */ direction;
  /** @type {ProgressTimer} */ timer;

  /**
   * Specifies the state at which the rewind effect actually takes place
   */
  isReversing;
  /**
   * Specifies the state at which the rewind has beein initialized
   */
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

    this.startPosition = { x: attributes.x, y: attributes.y };
    this.positions = [];
    this.positionsLengthMax = this.positions.length;
    this.startAngle = options.angle;
    this.angles = [];
    this.velocities = [];
    this.startVelocity = this.body.velocity;

    this.isReversing = false;
    this.hasRewindStarted = false;
    this.hasJumped = false;

    this.timer = new ProgressTimer();

    this.i = 0;
    this.jumpCount = 0;
    this.direction = 1;

    this.isOnGround = false;
  }

  // ##################################################
  jump() {
    if (!this.hasJumped) {
      Matter.Body.applyForce(this.body, this.body.position, {
        x: 0,
        y: -0.2,
      });
    }
  }

  rewind() {
    // #################### Zeit anhalten: Matter.Runner.stop(runner);
    // #################### Super Slow Mo: Matter.Sleeping.set(body, true);

    if (this.positions.length) {
      Matter.Body.setPosition(
        this.body,
        this.positions[this.positions.length - 1]
      );
      this.positions.pop();
    }

    if (this.angles.length) {
      Matter.Body.setAngle(this.body, this.angles[this.angles.length - 1]);
      this.angles.pop();
    }

    if (this.velocities.length) {
      Matter.Body.setVelocity(
        this.body,
        this.velocities[this.velocities.length - 1]
      );
      this.velocities.pop();
    }
  }

  /**
   *
   * @param {boolean} bool
   * @returns {Player}
   */
  showBar(bool) {
    if (bool) {
      once(() => {
        if (!this.positions.length) {
          let offset = !(frameCount % 30) ? -5 : 5;

          if (this.i <= 1) this.i += 0.5;
          else this.i = 0;

          fill(color(255, 255, 255, 150));
          // w: 196
          rectMode(CORNER);
          rect(
            width / 2 - 200 / 2 + 2 + offset * this.i,
            height * 0.9 - 10 / 2 + 2,
            196 * (this.positions.length / player.positionsLengthMax),
            6
          );
          noFill();
          stroke(color(255, 255, 255, 150));
          rectMode(CENTER);
          rect(width / 2 + offset * this.i, height * 0.9, 200, 10);
        } else {
          fill(color(255, 255, 255, 150));
          // w: 196
          rectMode(CORNER);
          rect(
            width / 2 - 200 / 2 + 2,
            height * 0.9 - 10 / 2 + 2,
            196 * (this.positions.length / player.positionsLengthMax),
            6
          );
          noFill();
          stroke(color(255, 255, 255, 150));
          rectMode(CENTER);
          rect(width / 2, height * 0.9, 200, 10);
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
   * @param {boolean} bool
   * @param {number} [velocity]
   */
  setAutoMove(bool, velocity = 0.01) {
    if (bool) {
      if (
        !mouseIsDragged &&
        this.body.velocity.x < 0.02 &&
        this.body.velocity.x > -0.02
      ) {
        Matter.Body.setAngularVelocity(player.body, velocity);
      }
    }
  }
}
