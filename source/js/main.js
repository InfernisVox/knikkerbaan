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
const Keys = {
  SPACE: 32,
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

/** @type {Player} */ let player;

// Assets
/** @type {Image} */ let playerImage;
/** @type {Image} */ let imgRoom;
/** @type {Image} */ let imgXylophone;
/** @type {Image} */ let gifelgato;
/** @type {Image} */ let imgBed;
/** @type {Image} */ let imgCanon;
/** @type {Image} */ let imgWall;

let isMouseDragged = false;
let isReversing = false;
let isSpacePressed = false;
let hasStarted = false;
let hasInitiated = false;

let canon = undefined;
let canonangle = 0.6;
let canonreverse = false;
let canoncanrotate = false;
let canondooropen = true;
let canondoor = undefined;

let elevator = undefined;
let elevatormoving = false;

let loop_right = undefined;
let loop_left = undefined;

let worldmask = 0x0001;
let carmask = 0x0002;

let carbody = undefined;
let carwheel1 = undefined;
let carwheel2 = undefined;

let baseballglove = undefined;

let i = 0;
/** @type {number} */ let maxCount;

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
  soundCat.play();
}

function draw() {
  background(200, 150, 100);
  Engine.update(engine);

  // Body.setAngle(sensors[1].body, 0);
  // Body.setPosition(sensors[1].body, { x: sensors[1].body.position.x, y: 605 });

  if (!hasInitiated) player.setAutoMove(true, 0.0075);
  else player.setAutoMove(true);

  Player.savePositionsOf(player, !isSpacePressed, vectorDiffersFromBy);
  Player.saveAnglesOf(player, !isSpacePressed, angleDiffersFromBy);

  const shiftX = -player.body.position.x + width / 3;
  // const shiftY = -player.body.position.y * zoom + height / 2;

  once(() => {
    if (!hasInitiated) {
      if (player.body.position.x >= 690) {
        hasInitiated = true;
        if (i !== 1) i += 0.01;
        translate(i < 1 ? shiftX * i : shiftX, 70);
      }
    } else {
      translate(shiftX, 70);
    }
    // image(imgRoom, -205, -80, 5085, 720);
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
        player.jump(5);
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
  if (keyCode === Keys.SPACE) {
    startTimer();

    isSpacePressed = true;
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
