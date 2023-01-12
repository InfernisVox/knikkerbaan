// @ts-check
"use strict";

/** @typedef {import("../../../@types/p5/index").Color} Color */
/** @typedef {{x: number; y: number; r: number; color: string | Color; image: Image; scale: number; [key: string]: any}} PlayerAttributes */

class Player extends Ball {
  static DIFFER_THRESHOLD_VECTOR = 10;
  static DIFFER_THRESHOLD_ANGLE = 0.5;

  /**
   *
   * @param {number} value
   */
  static setVectorThreshold(value) {
    Player.DIFFER_THRESHOLD_VECTOR = value;
  }

  /**
   *
   * @param {number} value
   */
  static setAngleThreshold(value) {
    Player.DIFFER_THRESHOLD_ANGLE = value;
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
          player.#positions.length
            ? player.#positions[player.#positions.length - 1]
            : player.startPosition,
          vec,
          Player.DIFFER_THRESHOLD_VECTOR
        )
      ) {
        player.#positions.push(vec);
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
          player.#angles.length
            ? player.#angles[player.#angles.length - 1]
            : player.startAngle,
          angle,
          Player.DIFFER_THRESHOLD_ANGLE
        )
      )
        player.#angles.push(player.body.angle);
    }
  }

  // ##################################################

  /** @type {Matter.Vector[]} */ #positions;
  /** @type {number[]} */ #angles;
  /** @type {boolean} */ #isOnGround;
  /** @type {number} */ #direction;

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
    this.height = this.width;

    this.startPosition = { x: attributes.x, y: attributes.y };
    this.#positions = [];
    this.startAngle = options.angle;
    this.#angles = [];

    this.#direction = 1;

    this.#isOnGround = false;
  }

  // ##################################################
  /**
   *
   * @param {number} [xFactor]
   * @param {boolean} [directionAware]
   */
  #_jump(xFactor = 0.01, directionAware = false) {
    if (directionAware) {
      // @ts-ignore
      if (this.body.position.x - this.body.positionPrev.x < 0)
        this.#direction = -1;
      else this.#direction = 1;
    }

    Matter.Body.applyForce(
      this.body,
      { x: this.body.position.x, y: this.body.position.y },
      { x: xFactor * this.#direction + this.body.velocity.x / 100, y: -0.1 }
    );
  }

  rewind() {
    // #################### Zeit anhalten: Matter.Runner.stop(runner);
    // #################### Super Slow Mo: Matter.Sleeping.set(body, true);

    if (this.#positions.length) {
      Matter.Body.setPosition(
        this.body,
        this.#positions[this.#positions.length - 1]
      );
      this.#positions.pop();
    }

    if (this.#angles.length) {
      Matter.Body.setAngle(this.body, this.#angles[this.#angles.length - 1]);
      this.#angles.pop();
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
        fill("white");
        // w: 196
        rectMode(CORNER);
        rect(
          width / 2 - 200 / 2 + 2,
          height * 0.9 - 10 / 2 + 2,
          196 * (this.#positions.length / maxCount),
          6
        );
        noFill();
        stroke("white");
        rectMode(CENTER);

        if (!this.#positions.length) {
          let offset = !(frameCount % 30) ? -5 : 5;

          if (i <= 1) i += 0.5;
          else i = 0;

          rect(width / 2 + offset * i, height * 0.9, 200, 10);
        } else {
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
      const { position: pos, angle, render } = this.body;
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
      Matter.Body.setAngularVelocity(player.body, velocity);
    }
  }

  /**
   *
   * @param {number} [style]
   */
  jumpWith(style) {
    switch (style) {
      case Jump.SINGLE_IMMEDIATE: {
      }
      case Jump.SINGLE_DELAYED: {
      }
      case Jump.DOUBLE_IMMEDIATE: {
      }
      case Jump.DOUBLE_DELAYED: {
      }
      default: {
        if (progress < PLAYER_REWIND_THRESHOLD && this.isOnGround) {
          player.#_jump(0.18);
          jumpCount = 1;
        } else if (
          progress < PLAYER_REWIND_THRESHOLD &&
          !this.isOnGround &&
          jumpCount
        ) {
          player.#_jump(0.018);
          jumpCount = 0;
        }
        break;
      }
    }
  }

  // ##################################################

  get positions() {
    return this.#positions;
  }

  get angles() {
    return this.#angles;
  }

  get isOnGround() {
    return this.#isOnGround;
  }

  set isOnGround(value) {
    this.#isOnGround = value;
  }

  get direction() {
    return this.#direction;
  }

  set direction(value) {
    this.#direction = value;
  }
}
