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
const FactoryFlag = {
  EMPTY: -1,
  SINGLE_JUMP: 0,
  CANON_SHOOT: 1,
  PLAYER_REWIND: 3,
  CAR_REWIND: 4,
};
/** @enum {number} */
const currentState = {
  press: FactoryFlag.EMPTY,
  hold: FactoryFlag.EMPTY,
};

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

/** @type {MarbleRun} */ let marbleRun;
/** @type {Camera} */ let cam;

/** @type {Player} */ let player;

// Assets
/** @type {Image} */ let playerImage;
/** @type {Image} */ let imgRoom;
/** @type {Image} */ let imgXylophone;
/** @type {Image} */ let gifElGato;
/** @type {Image} */ let imgBed;
/** @type {Image} */ let imgWall;
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
/** @type {Image} */ let imgBallpitBg;
/** @type {Image} */ let imgBallpitFg;
/** @type {Image} */ let imgCannonActivated;
/** @type {Image} */ let imgLandingPad
/** @type {Image} */ let imgJumpPad;


// p5.js - Custom event variables
let mouseIsDragged = false;
let spaceIsPressed = false;

// Level items
/** @type {Block} */ let floorblock;
/** @type {Block} */ let wall;
/** @type {Block} */ let bed;
/** @type {Block} */ let xylophone;
/** @type {BlockCore} */ let canon;
/** @type {Block} */ let canonDoor;
/** @type {Block} */ let towerLeft;
/** @type {Block} */ let towerRight;
let canonAngle = 0.33;
let isCanonReversing = false;
let canCanonRotate = false;
let isCanonDoorOpen = true;
/** @type {Block} */ let elevator;
let isElevatorMoving = false;
/** @type {PolygonFromSVG} */ let loopRight;
/** @type {PolygonFromSVG} */ let loopLeft;
/** @type {Block} */ let carBody;
/** @type {number} */ let carBodyPositionX = null;
/** @type {Ball} */ let carWheel1;
/** @type {Ball} */ let carWheel2;
/** @type {PolygonFromSVG} */ let baseballGlove;
let baseballGloveBack1;
let baseballGloveBack2;
/** @type {BlockCore} */ let carconstraintsensor;
/** @type {BlockCore} */ let carpushsensor;
/** @type {PolygonFromSVG} */ let loopRight2;
/** @type {PolygonFromSVG} */ let loopLeft2;
/** @type {PolygonFromSVG} */ let rocket;
/** @type {Block} */ let safetyblock;
/** @type {Block} */ let pushblock;
let balls;
/** @type {number[]} */ let playerpositioncar = [];
let isCarWindingUp = false;
/** @type {Image} */ let gifRewind;
/** @type {Image} */ let gifRewindOverlay;
/** @type {Image} */ let imgElevator;
/** @type {Image} */ let imgRocket;
/** @type {Image} */ let imgcoldWheels;

let hasBeenSet = false;
let hasBeenAssigned = false;
let movingUpward = false;

let velocityX = 0;
/** @type {number} */ let carProgressValue = null;

let slowMo = false;

// ##################################################

function preload() {
  loadAssets();
}

function setup() {
  init();
  console.log("e");

  mouse.mouse.pixelRatio = pixelDensity();

  marbleRun = new MarbleRun();
  cam = new Camera(player.body);

  player.initCollisions();

  screens = [screen01 /*, screen02 */];

  initScreens(screens);
  screenEvents();

  soundCat.play();
}

function draw() {
  background(255, 255, 255);
  Engine.update(engine);

  Player.recordDataOf(player, !spaceIsPressed);

  MarbleRun.Cycle.over(7000, () => {
    if (!hasBeenAssigned) {
      hasBeenAssigned = true;
      player.onSpacePress = MarbleRun.mapSpacePressOfTo(
        player,
        FactoryFlag.SINGLE_JUMP
      );
      player.onSpaceHold = MarbleRun.mapSpaceHoldOfTo(
        player,
        FactoryFlag.PLAYER_REWIND
      );
    }
  });

  once(drawCanvas);
  spacePressed();

  MarbleRun.Cycle.forNext(
    1500,
    slowMo,
    () => {
      if (slowMo) {
        engine.timing.timeScale = 0.15;
        slowMo = false;
      }
    },
    () => {
      engine.timing.timeScale = 1;
      console.log("SlowMo ended");
    }
  );

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
    currentState.hold === FactoryFlag.CAR_REWIND &&
    !isNull(carProgressValue)
  ) {
    console.log(carProgressValue);
    Matter.Body.setStatic(carBody.body, false);

    let x = map(carProgressValue, 0, 100, 200, 2000);

    Body.setVelocity(carBody.body, { x: x, y: 0 });

    carProgressValue = null;

    setTimeout(() => {
      player.onSpacePress = MarbleRun.mapSpacePressOfTo(
        player,
        FactoryFlag.SINGLE_JUMP
      );
      player.onSpaceHold = MarbleRun.mapSpaceHoldOfTo(
        player,
        FactoryFlag.PLAYER_REWIND
      );
    }, 2000);
  }

  player.timer.reset();
  player.resetBooleans();

  soundRewind.stop();

  spaceIsPressed = false;
}
