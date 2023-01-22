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

// ######################################################
// Miscellaneous
let count = 0;
/** @type {ImageData} */ let canvasContent;
let rAvg = 0;
let gAvg = 0;
let bAvg = 0;
let aAvg = 0;

// function getCanvasContent() {
//   // Function will consume lots of memory
//   // Only call for flex.

//   /** @type {HTMLCanvasElement} */ let c = canvas.elt;
//   let ctx = /** @type {CanvasRenderingContext2D} */ c.getContext("2d");
//   let chunkSize = 4;

//   // Start function which reduces load on device
//   if (count > 10) {
//     canvasContent = ctx.getImageData(
//       width / 2,
//       height / 2,
//       width / 2,
//       height / 2
//     );

//     // TODO: Please verify type compatibility of the following variables checked by ts
//     canvasContent = canvasContent.data;

//     const canvasFilter = [];
//     for (let i = 0; i < canvasContent.length; i += chunkSize) {
//       const chunk = canvasContent.slice(i, i + chunkSize);
//       canvasFilter.push(chunk);
//     }
//     canvasContent = canvasFilter;

//     canvasContent.forEach((element) => {
//       rAvg += element[0];
//       gAvg += element[1];
//       bAvg += element[2];
//       aAvg += element[3];
//     });

//     rAvg = rAvg / canvasContent.length;
//     gAvg = gAvg / canvasContent.length;
//     bAvg = bAvg / canvasContent.length;
//     aAvg = aAvg / canvasContent.length;

//     document.body.style.background = `rgba(${rAvg}, ${gAvg}, ${bAvg}, ${aAvg})`;

//     count = 0;
//   }
//   count++;
// }

// #######
/** @type {Boundary[]} */ let walls = [];
/** @type {Particle} */ let particle;

/* function rayCasting() {
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
} */

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

function drawCanvas() {
  cam.swivelBehind(() => player.body.position.x >= CANVAS_BREAKPOINT);

  if (canCanonRotate) {
    if (canonAngle >= 0.6) {
      isCanonReversing = true;
    } else if (canonAngle <= -0.6) {
      isCanonReversing = false;
    }

    if (isCanonReversing) {
      canonAngle -= 0.005;
    } else {
      canonAngle += 0.005;
    }

    Body.setAngle(canon.body, canonAngle);
  }

  if (isElevatorMoving) {
    if (elevator.body.position.y >= 580) {
      Body.setPosition(elevator.body, {
        x: elevator.body.position.x,
        y: elevator.body.position.y - 0.3,
      });
    } else {
      Body.setPosition(player.body, {
        x: canon.body.position.x,
        y: canon.body.position.y,
      });
      player.jump();
    }
  }

  drawCharacters();

  mouse.setOffset({ x: -cam.shiftX, y: 0 });
  mouse.draw();
}

function drawCharacters() {
  // Body.setAngle(sensors[1].body, 0);
  // Body.setPosition(sensors[1].body, { x: sensors[1].body.position.x, y: 605 });

  if (!marbleRun.hasBeenStarted) player.setAutoMove(true, 0.0075);
  else player.setAutoMove(true);

  sensors.forEach((sensor) => sensor.draw());
  blocks.forEach((block) => block.draw());

  image(gifElGato, -55, 45, 470, 264);
  push();
  rotate(0.01);
  image(imgXylophone, 785, 560, 540, 120);
  pop();
  image(imgTowerBg, 1950, 285, 289, 428);

  if (isCanonDoorOpen) {
    image(imgButtonReleased, 1650, 661, 96, 34);
    Body.setPosition(canonDoor.body, {
      x: canonDoor.body.position.x,
      y: 1540,
    });
  } else {
    image(imgButtonPressed, 1650, 665, 97, 28);
    Body.setPosition(canonDoor.body, {
      x: canonDoor.body.position.x,
      y: 650,
    });
  }

  player.draw();

  image(imgTowerFg, 1950, 285, 289, 428);

  player.showAngle(false);
}
