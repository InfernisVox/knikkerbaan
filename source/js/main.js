// @ts-check
"use strict";

Matter.use("matter-wrap");

// Definitions ##########################################################
/** @typedef { import("../../@types/p5/index").Image } Image */
/** @typedef { import("../../@types/p5/index").SoundFile } SoundFile */
/** @typedef { import("../../@types/p5/index").Renderer } Renderer */
/** @typedef { BlockCore | Block | Ball | Chain | Magnet | Parts | Polygon | PolygonFromPoints | PolygonFromSVG | Stack } Item */

/** @enum {number} */
const Canvas = {
  WIDTH: 1280,
  HEIGHT: 720,
};

/** @enum {number} */
const Jump = {
  SINGLE_IMMEDIATE: 1,
  SINGLE_DELAYED: 2,
  DOUBLE_IMMEDIATE: 3,
  DOUBLE_DELAYED: 4,
};

const IS_STATIC = true;
const DIFFER_THRESHOLD_VECTOR = 10;
const DIFFER_THRESHOLD_ANGLE = 0.5;
const SPACE = 32;
const PLAYER_START_VECTOR = { x: 300, y: -10 };
const PLAYER_REWIND_THRESHOLD = 5.044000000059605;
const PLAYER_START_ANGLE = 0;
const PLAYER_LABEL = "Wollknäuel";

// Setup ##########################################################
console.clear();

// Setting up the project
const Engine = Matter.Engine,
  Runner = Matter.Runner,
  Body = Matter.Body;

/** @type {Renderer} */ let canvas;
/** @type {Matter.Engine} */ let engine;
/** @type {Matter.World} */ let world;
/** @type {Matter.Runner} */ let runner;
/** @type {Mouse} */ let mouse;

/** @type {Item[]} */ let blocks = [];
/** @type {Item[]} */ let sensors = [];
/** @type {(() => void)[]} */ let screens;

/** @type {Player} */ let player;
/** @type {Matter.Vector[]} */ let playerPositions = [{ x: 300, y: 80 }];
/** @type {Matter.Vector} */ let playerPosition_New;
/** @type {number[]} */ let playerRotations = [0];
/** @type {number} */ let playerRotation_New;

// Assets
/** @type {Image} */ let playerImage;
/** @type {Image} */ let imgRoom;
/** @type {Image} */ let imgXylophone;
/** @type {Image} */ let gifPsychedelic;
/** @type {Image} */ let gifelgato;
/** @type {Image} */ let imgBed;
/** @type {Image} */ let imgCanon;
/** @type {SoundFile} */ let soundGuitarAMajor;
/** @type {SoundFile} */ let soundXylophoneA1;
/** @type {SoundFile} */ let soundXylophoneB1;
/** @type {SoundFile} */ let soundXylophoneC1;
/** @type {SoundFile} */ let soundXylophoneD1;
/** @type {SoundFile} */ let soundXylophoneE1;
/** @type {SoundFile} */ let soundXylophoneF1;
/** @type {SoundFile} */ let soundXylophoneG1;
/** @type {SoundFile} */ let soundXylophoneA2;
/** @type {SoundFile} */ let soundXylophoneB2;
/** @type {SoundFile} */ let soundXylophoneC2;
/** @type {SoundFile} */ let catsound;

let isDragged = false;
let isReversing = false;
let isAutoMoving = true;

// Miscellaneous
let count = 0;
/** @type {ImageData} */ let canvasContent;
let rAvg = 0;
let gAvg = 0;
let bAvg = 0;
let aAvg = 0;

let sensorColor;
let blockColor;
/** @type {Block} */ let spin;
let assetCalc = null;
let assetTotal = null;
let poly;
let canon = undefined;
let canonangle = 0.6;
let canonreverse = false;
let canoncanrotate = false;
let canondooropen = true;
let canondoor = undefined;
let canonshoot = false;

let elevator = undefined;
let elevatormoving = false;

// Raycasting.
/** @type {Boundary[]} */ let walls = [];
/** @type {Particle} */ let particle;

// https://stackoverflow.com/questions/69524578/measuring-how-long-a-key-is-pressed-using-p5-js-and-javascript
let timeToPickUp = 5000; //ms of time to pick up
let startOfPickUp = 0; // var to save timeStamp to
let progress = 0; // var to save progress value

let isPlayerOnGround = false;
/** @type {number} */ let jumpCount;
/** @type {number} */ let direction;
let isSpacePressed = false;

// let isReversing = false;
let hasStarted = false;
let initiated = false;
let i = 0;

/** @type {number} */ let maxCount;

/** @type {number | null} */
let start = null;
/** @type {number | null} */
let end = null;
/** @type {number[]} */
let avgValues = [];

/** @type {Matter.Vector[]} */ let positions = [];
/** @type {number[]} */ let angles = [];

// ##################################################

function preload() {
  loadAssets();
}

function setup() {
  initCanvas();
  initMouse();
  initPlayer();

  jumpCount = 0;
  direction = 1;
  setCollisionEvents();

  screens = [screen01 /*, screen02 */];

  initScreens(screens);
  screenEvents();
  catsound.play();
}

function draw() {
  background(200, 150, 100);
  Engine.update(engine);

  // Body.setAngle(sensors[1].body, 0);
  // Body.setPosition(sensors[1].body, { x: sensors[1].body.position.x, y: 605 });

  if (!initiated) player.setAutoMove(true, 0.0075);
  else player.setAutoMove(true);

  Player.savePositionsOf(player, !isSpacePressed, vectorDiffersFromBy);
  Player.saveAnglesOf(player, !isSpacePressed, angleDiffersFromBy);

  const shiftX = -player.body.position.x + width / 2.28;
  // const shiftY = -player.body.position.y * zoom + height / 2;

  once(() => {
    if (!initiated) {
      if (player.body.position.x >= 690) {
        initiated = true;
        if (i !== 1) i += 0.01;
        translate(i < 1 ? shiftX * i : shiftX, 70);
      }
    } else {
      translate(shiftX, 70);
    }
    image(imgRoom, -205, -80, 5085, 720);
    //image(gifPsychedelic, 0, 0, 100, 100);
    image(gifelgato, -70, -10, 470, 264);

    sensors.forEach((sensor) => sensor.draw());

    blocks.forEach((block) => block.draw());

    if (canoncanrotate) {
      if (canonangle >= 0.6) {
        canonreverse = true;
      } else if (canonangle <= -0.6) {
        canonreverse = false;
      }

      if (canonreverse) {
        canonangle -= 0.005;
      } else {
        canonangle += 0.005;
      }

      Body.setAngle(canon.body, canonangle);
    }

    if (elevatormoving) {
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
      }
    }

    if (canondooropen) {
      Body.setPosition(canondoor.body, {
        x: canondoor.body.position.x,
        y: 1540,
      });
    } else {
      Body.setPosition(canondoor.body, {
        x: canondoor.body.position.x,
        y: 540,
      });
      canonshoot = true;
    }

    push();
    rotate(0.01);
    image(imgXylophone, 750, 510, 540, 120);
    pop();

    //particle.update(player.body.position.x - 200, player.body.position.y - 200);
    //particle.show();
    //particle.look(walls);

    for (let wall of walls) {
      wall.show();
    }

    player.draw();
    player.showAngle(false);

    mouse.setOffset({ x: -shiftX, y: -70 });
    mouse.draw();
  });

  spacePressed();
  // getCanvasContent();
}

// ##################################################

function keyPressed() {
  if (keyCode === SPACE) {
    startTimer();

    isSpacePressed = true;

    if (initiated) player.jumpWith(null);
  }
}

function keyReleased() {
  // logTimer();
  resetTimer();

  isReversing = false;
  isSpacePressed = false;
  hasStarted = false;
  Matter.Body.setStatic(player.body, false);
}
