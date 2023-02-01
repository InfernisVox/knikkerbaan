// @ts-check
"use strict";

Matter.use("matter-wrap");

// Definitions ##########################################################
/** @typedef { import("../../@types/p5/index").Image } Image */
/** @typedef { import("../../@types/p5/index").SoundFile } SoundFile */
/** @typedef { import("../../@types/p5/index").Renderer } Renderer */
/** @typedef { BlockCore | Block | Ball | Chain | Magnet | Parts | Polygon | PolygonFromPoints | PolygonFromSVG | Stack } Item */

const CANVAS_BREAKPOINT = 690;

/** @enum {number} */
const Canvas = {
  WIDTH: 1280,
  HEIGHT: 720,
};
/** @enum {number} */
const Keys = {
  SPACE: 32,
};
/** @enum {number} */
const Masks = {
  WORLD: 0x0001,
  CAR: 0x0002,
  AREA: 0x0004,
};
/** @enum {number} */
const SpaceMapping = {
  EMPTY: -1,
  SINGLE_JUMP: 0,
  CANNON_FIRE: 1,
  PLAYER_REWIND: 2,
  CAR_REWIND: 3,
};

// Setup ##########################################################
console.clear();

// Setting up the project
const Engine = Matter.Engine,
  Runner = Matter.Runner,
  Body = Matter.Body;

// Initializations ###########################
/** @type {Renderer} */ let canvas;
/** @type {Matter.Engine} */ let engine;
/** @type {Matter.World} */ let world;
/** @type {Matter.Runner} */ let runner;
/** @type {Mouse} */ let mouse;

/** @type {MarbleRun} */ let marbleRun;
/** @type {Camera} */ let cam;

// Levels ###########################
/** @type {Item[]} */ let blocks = [];
/** @type {Item[]} */ let sensors = [];
/** @type {(() => void)[]} */ let screens;

// Player ###########################
/** @type {Player} */ let player;
let playerHasBeenAssigned = false;
let playerIsMovingUpward = false;
let playerVelocityX = 0;
let playerIsInSlowMotion = false;
const playerCurrentMapping = {
  press: SpaceMapping.EMPTY,
  hold: SpaceMapping.EMPTY,
};

// Assets ###########################
// png, jpg, ..
/** @type {Image} */ let imgPlayer;
/** @type {Image} */ let imgRoom;
/** @type {Image} */ let imgXylophone;
/** @type {Image} */ let imgBed;
/** @type {Image} */ let imgTowerDoor;
/** @type {Image} */ let imgTowerFg;
/** @type {Image} */ let imgTowerBg;
/** @type {Image} */ let imgButtonPressed;
/** @type {Image} */ let imgButtonReleased;
/** @type {Image} */ let imgCannonBase;
/** @type {Image} */ let imgCannon;
/** @type {Image} */ let imgBaseballGlove;
/** @type {Image} */ let imgFloor;
/** @type {Image} */ let imgPushbox;
/** @type {Image} */ let imgBallPitBg;
/** @type {Image} */ let imgBallPitFg;
/** @type {Image} */ let imgCannonActivated;
/** @type {Image} */ let imgLandingPad;
/** @type {Image} */ let imgJumpPad;
/** @type {Image} */ let imgLoopLeft;
/** @type {Image} */ let imgLoopRight;
/** @type {Image} */ let imgElevator;
/** @type {Image} */ let imgRocket;
/** @type {Image} */ let imgColdWheels;
/** @type {Image} */ let imgFgBoxStar;
/** @type {Image} */ let imgFgBoxHeart;
/** @type {Image} */ let imgCarwheel;
/** @type {Image} */ let imgCarbody;
/** @type {Image} */ let imgFgCarbody;
/** @type {Image} */ let imgRamp;
/** @type {Image} */ let imgLoop1;
/** @type {Image} */ let imgLoop2;
/** @type {Image} */ let imgFgBaseball;
/** @type {Image} */ let imgStepstool;
/** @type {Image} */ let imgFgBaseball;
/** @type {Image} */ let imgFgSucculente;
/** @type {Image} */ let imgColdWheelsFast;
// gif
/** @type {Image} */ let gifElGato;
/** @type {Image} */ let gifRewind;
/** @type {Image} */ let gifRewindOverlay;

// Custom event variables ###########################
let mouseIsDragged = false;
let spaceIsPressed = false;

// Items ###########################
// Cat
/** @type {Matter.Body} */ let cat;
// Xylophone
/** @type {Block} */ let xylophone;
// Cannon
/** @type {BlockCore} */ let cannon;
/** @type {Block} */ let cannonDoor;
let cannonAngle = 0.33;
let cannonIsReversing = false;
let cannonCanRotate = false;
let cannonDoorIsOpen = true;
let cannonHasBeenLoaded = false;
let cannonHasBeenFired = false;
/** @type {Block} */ let cannonElevator;
let cannonElevatorIsMoving = false;
const CANNON_ANGLE_MIN = 0.33;
const CANNON_ANGLE_MAX = -0.65;
// Glove
/** @type {PolygonFromSVG} */ let baseballGlove;
// Car
/** @type {Block} */ let carBody;
/** @type {number | null} */ let carBodyPositionX = null;
/** @type {Ball} */ let carWheel1;
/** @type {Ball} */ let carWheel2;
/** @type {BlockCore} */ let carConstraintSensor;
/** @type {BlockCore} */ let carPushSensor;
/** @type {number | null} */ let carProgressValue = null;
// Loops
/** @type {PolygonFromSVG} */ let loopRight;
/** @type {PolygonFromSVG} */ let loopLeft;
/** @type {PolygonFromSVG} */ let loopRight2;
/** @type {PolygonFromSVG} */ let loopLeft2;
// Rocket
/** @type {PolygonFromSVG} */ let rocket;
// Surrounding
/** @type {Block} */ let floorBlock;
/** @type {Block} */ let wall;
/** @type {Block} */ let bed;
/** @type {Block} */ let towerLeft;
/** @type {Block} */ let towerRight;
/** @type {Block} */ let safetyBlock;
/** @type {Block} */ let pushBlock;
/** @type {Block} */ let rocketdoor;
// Rocket
let rocketflying = false;
let rocketoffset = 165;
let soundSoundtrack;
let soundFlute;

// ##################################################

function preload() {
  loadAssets();
}

function setup() {
  init();

  mouse.mouse.pixelRatio = pixelDensity();

  marbleRun = new MarbleRun();
  cam = new Camera(player.body);

  player.initCollisions();

  screens = [screen01 /*, screen02 */];

  initScreens(screens);
  screenEvents();

  soundCat.play();
  soundSoundtrack.play();
}

function draw() {
  background(255, 255, 255);
  Engine.update(engine);

  Player.recordDataOf(player, !spaceIsPressed);

  MarbleRun.Cycle.over(5600, () => {
    if (!playerHasBeenAssigned) {
      playerHasBeenAssigned = true;
      player.onSpacePress = MarbleRun.mapSpacePressTo(SpaceMapping.SINGLE_JUMP);
      player.onSpaceHold = MarbleRun.mapSpaceHoldTo(SpaceMapping.PLAYER_REWIND);
    }
  });

  if (frameCount % (25 * 30) == 0) {
    soundSoundtrack.play();
  }

  once(drawCanvas);
  spacePressed();

  MarbleRun.Cycle.forNext(
    1500,
    playerIsInSlowMotion,
    () => {
      if (playerIsInSlowMotion) {
        engine.timing.timeScale = 0.15;
        playerIsInSlowMotion = false;
      }
    },
    () => {
      engine.timing.timeScale = 1;
      console.log("SlowMo ended");
    }
  );

  MarbleRun.Cycle.forNext(
    500,
    cannonHasBeenFired,
    () => {
      if (cannonHasBeenFired) engine.timing.timeScale = 0.15;
    },
    () => {
      engine.timing.timeScale = 1;
    }
  );

  console.log(cannonAngle);

  if (player.body.position.x >= CANVAS_BREAKPOINT) marbleRun.stats();
}

// ##################################################

function keyPressed() {
  if (keyCode === Keys.SPACE) {
    player.timer.start();
    player.onSpacePress();

    spaceIsPressed = true;
  }
}

function keyReleased() {
  if (player.timer.progress > Player.THRESHOLD_TIMER_PERCENT) {
    Matter.Body.setVelocity(player.body, { x: 0, y: engine.gravity.y });
  }

  if (
    playerCurrentMapping.hold === SpaceMapping.CAR_REWIND &&
    !isNull(carProgressValue)
  ) {
    console.log(carProgressValue);
    Matter.Body.setStatic(carBody.body, false);

    let x = map(carProgressValue, 0, 100, 200, 2000);

    Body.setVelocity(carBody.body, { x: x, y: 0 });

    carProgressValue = null;

    setTimeout(() => {
      player.onSpacePress = MarbleRun.mapSpacePressTo(SpaceMapping.SINGLE_JUMP);
      player.onSpaceHold = MarbleRun.mapSpaceHoldTo(SpaceMapping.PLAYER_REWIND);
    }, 2000);
  }

  player.timer.reset();
  player.resetBooleans();

  soundRewind.stop();

  spaceIsPressed = false;
}
