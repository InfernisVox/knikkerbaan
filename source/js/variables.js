// @ts-check
"use strict";

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
let rotator = 0;
/** @type {Block} */ let spin;
let assetCalc = null;
let assetTotal = null;
let poly;

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
