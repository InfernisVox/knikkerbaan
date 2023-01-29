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
};
/** @enum {number} */
const FactoryFlag = {
  SINGLE_JUMP: 0,
  CANON_SHOOT: 1,
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
let canonAngle = 0.35;
let isCanonReversing = false;
let canCanonRotate = false;
let isCanonDoorOpen = true;
/** @type {Block} */ let elevator;
let isElevatorMoving = false;
/** @type {PolygonFromSVG} */ let loopRight;
/** @type {PolygonFromSVG} */ let loopLeft;
/** @type {Block} */ let carBody;
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
let balls;
/** @type {number[]} */ let playerpositioncar = [];
let isCarWindingUp = false;
/** @type {Image} */ let gifRewind;
/** @type {Image} */ let imgElevator;
/** @type {Image} */ let imgRocket;

let hasBeenSet = false;
let movingUpward = false;

let velocityX = 0;

// ##################################################

function preload() {
  loadAssets();
}

function setup() {
  init();

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

  once(drawCanvas);
  spacePressed();

  marbleRun.stats();
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
  player.timer.reset();
  player.resetBooleans();

  soundRewind.stop();

  spaceIsPressed = false;
}
