// @ts-check
"use strict";

/**
 *
 * @param {unknown} arg
 */
const isNull = (arg) => {
  return typeof arg === "object" && !arg && arg === arg;
};

/**
 * `loadingMessage` is an auxiliary function. It is going to be used for
 * printing synchronous logs in the console when `preload` loads new media files.
 *
 * @param {number} currentAsset The number which associates the loaded media asset with an integer
 * @param {string} [assetName] The name of the loaded media asset
 */
function loadingMessage(currentAsset, assetName) {
  assetName = assetName || "Unknown";
  assetName = assetName.split("/").pop();

  console.log(
    `%cLoading asset ${currentAsset}: %c${assetName}`,
    "color: #7289DA; font-weight: bold;"
  );
}

/**
 * `once` function is an auxiliary function whenever `push()` and `pop()`
 * are called. The more conversions using `push` and `pop`, the more line saving
 * the wide application of this function.
 *
 * @param {() => void} callback The function with statements
 * that are to be executed synchronously right after `push` and before `pop`.
 *
 * @example
 *  once(() => {
 *      const {position: pos, angle} = player.body;
 *
 *      translate(pos.x, pos.y);
 *      rotate(angle);
 *      // ...
 *  });
 */
function once(callback) {
  push();
  callback();
  pop();
}

// Initializations ##########################################################
/**
 * `initCanvas` is responsible for initializing the entire project including both
 * the canvas itself and additional properties relevant to p5 and matter.js.
 */
function initCanvas() {
  canvas = createCanvas(Canvas.WIDTH, Canvas.HEIGHT);
  canvas.parent("canvas");

  colorMode(RGB);
  rectMode(CENTER);
  ellipseMode(CENTER);
  angleMode(RADIANS);

  engine = Engine.create();
  world = engine.world;

  runner = Runner.create();
  Runner.run(runner, engine);
}

// Player ##########################################################
/**
 * `initPlayer` creates a unique instance of the class `Ball` and stores
 * it in the `player` variable. It is going to be accessible to the world scope
 * as specified in the class definition of `Ball`.
 */
function initPlayer() {
  const wrap = {
    min: { x: 0, y: 0 },
    max: { x: width, y: height },
  };

  player = new Player(
    world,
    {
      x: 135,
      y: 110,
      r: 30,
      color: "red",
      image: playerImage,
      scale: 0.4,
    },
    {
      label: "Wollknäuel",
      isStatic: false,
      density: 0.001,
      restitution: 0.9,
      friction: 0.01,
      frictionAir: 0.009,
      angle: 0,
      // plugin: { wrap: wrap },
    }
  );
}

/**
 * `setPlayerBoundaries` is a function which specifies edge cases when
 * the player might leave the visible canvas. Every time the player leaves
 * the defined bounds, the position and the angle of the player will
 * be both recorded and modified according to the conditional statements.
 */
function setPlayerBoundaries() {
  if (player.body.position.x > 1280) {
    /*ö*/
  }

  if (player.body.position.y > 750 || player.body.position.x < 0) {
    playerPositions = [{ x: 0, y: 0 }];
    playerRotations = [0];
    Body.setPosition(player.body, { x: 300, y: 80 });
  }
}

/**
 * `savePlayerProperties` updates the player's body properties called
 * position and angle. It temporarily monitors their current values and pushes
 * them into the respective arrays for later access. They are needed for applying
 * the *rewind* effect when the user presses the spacebar.
 */
function savePlayerProperties() {
  if (!isReversing) Body.setStatic(player.body, false);

  playerPosition_New = player.body.position;
  const { x: ballX, y: ballY } = playerPosition_New;

  playerRotation_New = player.body.angle;

  if (
    (ballX >= playerPositions[playerPositions.length - 1].x + 0.25 ||
      ballY >= playerPositions[playerPositions.length - 1].y + 0.25 ||
      ballX <= playerPositions[playerPositions.length - 1].x - 0.25 ||
      ballY <= playerPositions[playerPositions.length - 1].y - 0.25) &&
    !isReversing
  ) {
    playerPositions.push({ x: ballX, y: ballY });
  }

  if (
    (playerRotation_New <= playerRotations[playerRotations.length - 1] - 0.1 ||
      playerRotation_New >=
        playerRotations[playerRotations.length - 1] + 0.1) &&
    !isReversing
  ) {
    playerRotations.push(playerRotation_New);
  }
}

function getCanvasContent() {
  // Function will consume lots of memory
  // Only call for flex.

  /** @type {HTMLCanvasElement} */ let c = canvas.elt;
  let ctx = /** @type {CanvasRenderingContext2D} */ c.getContext("2d");
  let chunkSize = 4;

  // Start function which reduces load on device
  if (count > 10) {
    canvasContent = ctx.getImageData(
      width / 2,
      height / 2,
      width / 2,
      height / 2
    );

    // TODO: Please verify type compatibility of the following variables checked by ts
    canvasContent = canvasContent.data;

    const canvasFilter = [];
    for (let i = 0; i < canvasContent.length; i += chunkSize) {
      const chunk = canvasContent.slice(i, i + chunkSize);
      canvasFilter.push(chunk);
    }
    canvasContent = canvasFilter;

    canvasContent.forEach((element) => {
      rAvg += element[0];
      gAvg += element[1];
      bAvg += element[2];
      aAvg += element[3];
    });

    rAvg = rAvg / canvasContent.length;
    gAvg = gAvg / canvasContent.length;
    bAvg = bAvg / canvasContent.length;
    aAvg = aAvg / canvasContent.length;

    document.body.style.background = `rgba(${rAvg}, ${gAvg}, ${bAvg}, ${aAvg})`;

    count = 0;
  }
  count++;
}

function rayCasting() {
  console.log("1");
  blocks.forEach((block) => {
    console.log(block + "2");
    let wall = new Boundary(
      block.body.position.x,
      block.body.position.y,
      // TODO: block.body does not provide its dimensions. Please elaborate on other solutions
      block.body.width,
      block.body.height
    );
    console.log("3");
    console.log(wall);
    walls.push(wall);
  });
  // TODO: Please complete the constructor of this class
  particle = new Particle(player.body.position.x, player.body.position.y);
}

// ###########################################################################
/**
 *
 * @param {Matter.Vector} vector1
 * @param {Matter.Vector} vector2
 * @param {number} value
 */
function vectorDiffersFromBy({ x: x1, y: y1 }, { x: x2, y: y2 }, value) {
  return Math.abs(x1 - x2) >= value || Math.abs(y1 - y2) >= value;
}

/**
 * ...
 * @param {number} angle1
 * @param {number} angle2
 * @param {number} value
 */
function angleDiffersFromBy(angle1, angle2, value) {
  return Math.abs(angle1 - angle2) >= value;
}

/**
 * ...
 * @param {Matter.Body} body
 * @param {boolean} trigger
 * @param {(...args: any[]) => boolean} ifTrue
 */
function savePositionsOf(body, trigger, ifTrue) {
  /* if (trigger) {
    if (
      ifTrue(
        positions.length
          ? positions[positions.length - 1]
          : PLAYER_START_VECTOR,
        body.position,
        DIFFER_THRESHOLD_VECTOR
      )
    )
      // @ts-ignore
      positions.push(body.position);
  } */

  if (trigger) {
    const { x: x0, y: y0 } = body.position;
    const vec = { x: x0, y: y0 };

    if (
      ifTrue(
        positions.length
          ? positions[positions.length - 1]
          : PLAYER_START_VECTOR,
        vec,
        DIFFER_THRESHOLD_VECTOR
      )
    ) {
      // @ts-ignore
      positions.push(vec);
    }
  }
}

/**
 * ...
 * @param {Matter.Body} body
 * @param {boolean} trigger
 * @param {(...args: any[]) => boolean} ifTrue
 */
function saveAnglesOf(body, trigger, ifTrue) {
  if (trigger) {
    /** @type {number} */
    let angle = angles.length ? angles[angles.length - 1] : PLAYER_START_ANGLE;

    if (ifTrue(angle, body.angle, DIFFER_THRESHOLD_ANGLE))
      angles.push(body.angle);
  }
}

/**
 *
 * @param {Matter.Body} body
 * @param {boolean} bool
 */
function setAutoMove(body, bool) {
  if (bool) Matter.Body.setAngularVelocity(body, 0.01);
}

function showRewindBar() {
  once(() => {
    fill("gray");
    // w: 196
    rectMode(CORNER);
    rect(
      width / 2 - 200 / 2 + 2,
      height * 0.9 - 10 / 2 + 2,
      196 * (positions.length / maxCount),
      6
    );
    noFill();
    stroke("gray");
    rectMode(CENTER);

    if (!positions.length) {
      let offset = !(frameCount % 30) ? -5 : 5;

      if (i <= 1) i += 0.5;
      else i = 0;

      rect(width / 2 + offset * i, height * 0.9, 200, 10);
    } else {
      rect(width / 2, height * 0.9, 200, 10);
    }
  });
}

/**
 * ...
 * @param {Matter.Body} body
 */
function rewind(body) {
  // #################### Zeit anhalten: Matter.Runner.stop(runner);
  // #################### Super Slow Mo: Matter.Sleeping.set(body, true);

  if (positions.length) {
    Matter.Body.setPosition(body, positions[positions.length - 1]);
    positions.pop();
  } /* #################### ohne Matter.Body.setStatic: else {
    Matter.Body.setPosition(body, PLAYER_START_VECTOR);
  } */

  if (angles.length) {
    Matter.Body.setAngle(body, angles[angles.length - 1]);
    angles.pop();
  } /* #################### ohne Matter.Body.setStatic: else {
    Matter.Body.setAngle(body, PLAYER_START_ANGLE);
  } */
}

/**
 * ...
 * @param {Matter.Body} body
 */
function drawAngleLine(body) {
  const { position: pos, angle, render } = body;

  once(() => {
    translate(pos.x, pos.y);
    rotate(angle);
    strokeWeight(2);
    stroke("white");
    line(0, 0, 30, 0);
  });
}

/**
 *
 * @param {Matter.Body} body
 * @param {number} [xFactor]
 * @param {boolean} [directionAware]
 */
function jump(body, xFactor = 0.01, directionAware = false) {
  if (directionAware) {
    // @ts-ignore
    if (body.position.x - body.positionPrev.x < 0) direction = -1;
    else direction = 1;
  }

  Matter.Body.applyForce(
    body,
    { x: body.position.x, y: body.position.y },
    { x: xFactor * direction + body.velocity.x / 100, y: -0.1 }
  );
}
