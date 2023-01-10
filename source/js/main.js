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

/** @type {Ball} */ let player;
/** @type {Matter.Vector[]} */ let playerPositions = [{ x: 300, y: 80 }];
/** @type {Matter.Vector} */ let playerPosition_New;
/** @type {number[]} */ let playerRotations = [0];
/** @type {number} */ let playerRotation_New;

// Assets
/** @type {Image} */ let playerImage;
/** @type {Image} */ let imgRoom;
/** @type {Image} */ let imgXylophone;
/** @type {Image} */ let gifPsychedelic;
/** @type {Image} */ let svgBall;
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

// Initializations ##########################################################
/**
 * `initCanvas` is responsible for initializing the entire project including both
 * the canvas itself and additional properties relevant to p5 and matter.js.
 */
function initCanvas() {
  canvas = createCanvas(Canvas.WIDTH, Canvas.HEIGHT);
  canvas.parent("canvas");

  engine = Engine.create();
  world = engine.world;

  runner = Runner.create();
  Runner.run(runner, engine);
}

/**
 * `initMouse` creates a new instance of the custom `Mouse` class. The
 * function specifies all the events that the mouse should listen to when
 * interacting with the canvas.
 */
function initMouse() {
  mouse = new Mouse(engine, canvas, { stroke: "blue", strokeWeight: 3 });

  mouse.on("startdrag", (/** @type {any} */ _) => {
    isDragged = true;
  });

  mouse.on("mouseup", (/** @type {any} */ e) => {
    if (!isDragged) {
      console.log(e.mouse.position.x, e.mouse.position.y);
      let ball = new Ball(
        world,
        {
          x: e.mouse.position.x,
          y: e.mouse.position.y,
          r: 15,
          color: "yellow",
        },
        { isStatic: false, restitution: 1, label: "Murmel" }
      );
      Body.applyForce(blocks[0].body, blocks[0].body.position, {
        x: 0,
        y: 2,
      });
      blocks.push(ball);
    }
    isDragged = false;
  });
}

// Events ##########################################################
document.addEventListener("DOMContentLoaded", () => {
  document.body.onkeydown = function (/** @type {KeyboardEvent} */ e) {
    if (e.code === "Space") {
      if (e.repeat) {
        isReversing = true;
        if (playerPositions.length !== 2) {
          Body.setStatic(player.body, true);

          Body.setPosition(
            player.body,
            playerPositions[playerPositions.length - 1]
          );

          Body.setAngle(
            player.body,
            playerRotations[playerRotations.length - 1]
          );

          playerRotations.pop();
          playerPositions.pop();
        } else {
          isReversing = false;
        }
      } else {
        Body.applyForce(player.body, player.body.position, {
          x: 0.015,
          y: 0.07,
        });
      }
    }
  };
  document.body.onkeyup = function (/** @type {KeyboardEvent} */ e) {
    if (e.code === "Space") {
      Body.setPosition(player.body, playerPositions[playerPositions.length]);
      Body.setStatic(player.body, false);
      isReversing = false;
    }
  };
});

// Screens ##########################################################
/**
 * This function accepts an arbitrary number of functions in an array.
 * The argument `screens` contains those functions which in turn contain multiple
 * instances of the level objects that are to be pushed into the array `blocks` and
 * other following structures.
 *
 * @param {(() => void)[]} screens The respective screens that contain
 * all the modifications of the array blocks. Each screen represents the
 * entirety of the level and its level entities e.g. static bodies and moving
 * objects like balls.
 */
function initScreens(screens) {
  // Calling each screen is equal to filing the blocks array with new level objects
  for (let i = 0; i < screens.length; i++) screens[i]();
}

function screen01() {
  sensorColor = color(0, 255, 50, 100);
  blockColor = color(255, 0, 255, 100);

  blocks.push(
    new Block(
      world,
      {
        x: 440,
        y: 215,
        w: 170,
        h: 10,
        color: blockColor,
      },
      { isStatic: true, angle: 0.25 }
    )
  );

  blocks.push(
    new BlockCore(
      world,
      {
        x: 350,
        y: 500,
        w: 300,
        h: 700,
        color: color(100, 170, 50),
      },
      {
        isStatic: true,
      }
    )
  );

  let board = new Block(
    world,
    {
      x: 630,
      y: 270,
      w: 250,
      h: 10,
      color: "black",
    },
    { isStatic: false, frictionAir: 0.01 }
  );
  board.constrainTo(null, {
    pointA: { x: 0, y: 0 },
    pointB: { x: board.body.position.x, y: board.body.position.y },
    length: 0,
    stiffness: 1,
    draw: true,
    color: color(255, 0, 0),
    width: 2,
  });

  blocks.push(board);

  sensors.push(
    new BlockCore(
      world,
      {
        x: 630,
        y: windowHeight / 2,
        w: 50,
        h: windowHeight * 2,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true }
    )
  );

  for (let i = 0; i < 10; i++) {
    sensors.push(
      new BlockCore(
        world,
        {
          x: 850 + i * 46,
          y: windowHeight / 2,
          w: 15,
          h: windowHeight * 2,
          color: sensorColor,
        },
        { isStatic: true, isSensor: true }
      )
    );
  }

  blocks.push(
    new Block(
      world,
      {
        x: 1200,
        y: 560,
        w: 500,
        h: 10,
        color: blockColor,
      },
      { isStatic: true, angle: -0.3 }
    )
  );

  blocks.push(
    new BlockCore(
      world,
      {
        x: windowWidth / 2,
        y: 650,
        w: windowWidth * 100,
        h: 40,
        color: "gray",
      },
      { isStatic: true }
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 2000,
        y: 560,
        w: 10,
        h: 100,
        color: color(100, 100, 100),
      },
      { isStatic: true, angle: 0 }
    )
  );

  blocks.push(
    new PolygonFromSVG(
      world,
      {
        x: 400,
        y: 400,
        fromFile: "assets/images/Slide.svg",
        scale: 1,
        color: "white",
      },
      { isStatic: true, friction: 0.0 }
    )
  );

  spin = new Block(
    world,
    {
      x: 3000,
      y: 500,
      w: 50,
      h: 300,
      color: "red",
    },
    { isStatic: true, angle: 0, label: "spin" }
  );
  blocks.push(spin);

  let canon = new Block(
    world,
    {
      x: 4000,
      y: 605,
      w: 300,
      h: 50,
      color: "purple",
    },
    { isStatic: false, angle: 0, label: "canon" }
  );

  blocks.push(canon);

  canon.constrainTo(null, {
    pointA: { x: 0, y: 0 },
    pointB: { x: canon.body.position.x, y: canon.body.position.y },
    length: 0,
    stiffness: 0.001,
    draw: true,
    color: color(255, 0, 0),
    width: 2,
  });

  sensors.push(
    new BlockCore(
      world,
      {
        x: 4170,
        y: 605,
        w: 70,
        h: 70,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true }
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 1050,
        y: 590,
        w: 500,
        h: 100,
        color: color(255, 255, 255, 0),
      },
      { isStatic: true, angle: 0.15 }
    )
  );
}

function rayCasting() {
  console.log("1");
  blocks.forEach((block) => {
    console.log(block + "2");
    let wall = new Boundary(
      block.body.position.x + 100,
      block.body.position.y,
      /** TODO: block.body does not provide its dimensions. Please elaborate on other solutions */
      block.body.position.x - 100,
      block.body.position.y
    );
    console.log("3");
    console.log(wall);
    walls.push(wall);
  });
  /** TODO: Please complete the constructor of this class */
  particle = new Particle(player.body.position.x, player.body.position.y);
}

function screenEvents() {
  // check if Wollknäuel collided with sensors[0]
  Matter.Events.on(engine, "collisionStart", (event) => {
    let pairs = event.pairs;
    for (const pair of pairs) {
      if (pair.bodyA.label === "Wollknäuel" && pair.bodyB === sensors[0].body) {
        console.log("Collided with sensor 0");
        soundGuitarAMajor.play();
      }

      if (pair.bodyA.label === "Wollknäuel" && pair.bodyB === sensors[1].body) {
        console.log("Collided with sensor 1");
        soundXylophoneA1.play();
      }

      if (pair.bodyA.label === "Wollknäuel" && pair.bodyB === sensors[2].body) {
        console.log("Collided with sensor 2");
        soundXylophoneB1.play();
      }

      if (pair.bodyA.label === "Wollknäuel" && pair.bodyB === sensors[3].body) {
        console.log("Collided with sensor 3");
        soundXylophoneC1.play();
      }

      if (pair.bodyA.label === "Wollknäuel" && pair.bodyB === sensors[4].body) {
        console.log("Collided with sensor 4");
        soundXylophoneD1.play();
      }

      if (pair.bodyA.label === "Wollknäuel" && pair.bodyB === sensors[5].body) {
        console.log("Collided with sensor 5");
        soundXylophoneE1.play();
      }

      if (pair.bodyA.label === "Wollknäuel" && pair.bodyB === sensors[6].body) {
        console.log("Collided with sensor 6");
        soundXylophoneF1.play();
      }

      if (pair.bodyA.label === "Wollknäuel" && pair.bodyB === sensors[7].body) {
        console.log("Collided with sensor 7");
        soundXylophoneG1.play();
      }

      if (pair.bodyA.label === "Wollknäuel" && pair.bodyB === sensors[8].body) {
        console.log("Collided with sensor 8");
        soundXylophoneA2.play();
      }

      if (pair.bodyA.label === "Wollknäuel" && pair.bodyB === sensors[9].body) {
        console.log("Collided with sensor 9");
        soundXylophoneB2.play();
      }

      if (
        pair.bodyA.label === "Wollknäuel" &&
        pair.bodyB === sensors[10].body
      ) {
        console.log("Collided with sensor 10");
        soundXylophoneC2.play();
      }

      if (
        pair.bodyA.label === "Wollknäuel" &&
        pair.bodyB === sensors[11].body
      ) {
        console.log("Collided with sensor 11");
        isAutoMoving = false;
        Body.setVelocity(sensors[11].body, { x: 10, y: 10 });
        soundXylophoneA2.play();

        setTimeout(function () {
          isAutoMoving = true;
        }, 1000);
      }
    }
  });
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

    /** TODO: Please verify type compatibility of the following variables checked by ts */
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
// Player ##########################################################

/**
 * `initPlayer` creates a unique instance of the class `Ball` and stores
 * it in the `player` variable. It is going to be accessible to the world scope
 * as specified in the class definition of `Ball`.
 */
function initPlayer() {
  player = new Ball(
    world,
    {
      x: 300,
      y: -10,
      r: 30,
      color: "red",
      image: playerImage,
      scale: 0.4,
    },
    {
      label: "Wollknäuel",
      isStatic: false,
      density: 0.0005,
      restitution: 0.8,
      friction: 0.01,
      frictionAir: 0.005,
      angle: 0,
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

// ##########################################################
function preload() {
  //Only for loading assets, no adding empty lines or comments
  // @ts-ignore
  assetCalc = -new Error().lineNumber;

  let playerImageSrc = "./assets/images/Wollball.png";
  playerImage = loadImage(playerImageSrc);
  loadingMessage(1, playerImageSrc);

  let gifPsychedelic_Src = "./assets/images/psychedelic.gif";
  gifPsychedelic = loadImage(gifPsychedelic_Src);
  loadingMessage(2, gifPsychedelic_Src);

  let svgBall_Src = "./assets/images/ball.svg";
  svgBall = loadImage(svgBall_Src);
  loadingMessage(2, svgBall_Src);

  let soundGuitarAMajor_Src = "./assets/audio/instruments/amajor.wav";
  soundGuitarAMajor = loadSound(soundGuitarAMajor_Src);
  loadingMessage(3, soundGuitarAMajor_Src);

  let soundXylophoneA1_Src = "./assets/audio/instruments/A1.mp3";
  soundXylophoneA1 = loadSound(soundXylophoneA1_Src);
  loadingMessage(4, soundXylophoneA1_Src);

  let soundXylophoneB1_Src = "./assets/audio/instruments/B1.mp3";
  soundXylophoneB1 = loadSound(soundXylophoneB1_Src);
  loadingMessage(4, soundXylophoneB1_Src);

  let soundXylophoneC1_Src = "./assets/audio/instruments/C1.mp3";
  soundXylophoneC1 = loadSound(soundXylophoneC1_Src);
  loadingMessage(4, soundXylophoneC1_Src);

  let soundXylophoneD1_Src = "./assets/audio/instruments/D1.mp3";
  soundXylophoneD1 = loadSound(soundXylophoneD1_Src);
  loadingMessage(4, soundXylophoneD1_Src);

  let soundXylophoneE1_Src = "./assets/audio/instruments/E1.mp3";
  soundXylophoneE1 = loadSound(soundXylophoneE1_Src);
  loadingMessage(4, soundXylophoneE1_Src);

  let soundXylophoneF1_Src = "./assets/audio/instruments/F1.mp3";
  soundXylophoneF1 = loadSound(soundXylophoneF1_Src);
  loadingMessage(4, soundXylophoneF1_Src);

  let soundXylophoneG1_Src = "./assets/audio/instruments/G1.mp3";
  soundXylophoneG1 = loadSound(soundXylophoneG1_Src);
  loadingMessage(4, soundXylophoneG1_Src);

  let soundXylophoneA2_Src = "./assets/audio/instruments/A2.mp3";
  soundXylophoneA2 = loadSound(soundXylophoneA2_Src);
  loadingMessage(5, soundXylophoneA2_Src);

  let soundXylophoneB2_Src = "./assets/audio/instruments/B2.mp3";
  soundXylophoneB2 = loadSound(soundXylophoneB2_Src);
  loadingMessage(4, soundXylophoneB2_Src);

  let soundXylophoneC2_Src = "./assets/audio/instruments/C2.mp3";
  soundXylophoneC2 = loadSound(soundXylophoneC2_Src);
  loadingMessage(4, soundXylophoneC2_Src);

  let imgRoom_Src = "./assets/images/room.png";
  imgRoom = loadImage(imgRoom_Src);
  loadingMessage(6, imgRoom_Src);

  let imgXylophone_Src = "./assets/images/xylophone.svg";
  imgXylophone = loadImage(imgXylophone_Src);
  loadingMessage(7, imgXylophone_Src);

  assetCalc += new Error().lineNumber;
  assetTotal = (assetCalc - 2) / 4;
  console.log(
    `%c\n-------------------------\nTotal assets loaded: %c${assetTotal}`,
    "color: #7289DA; font-weight: bold;"
  );
}

function setup() {
  initCanvas();
  initMouse();
  initPlayer();

  screens = [screen01 /*, screen02 */];

  initScreens(screens);
  screenEvents();
  //rayCasting();
}

function draw() {
  background(200, 150, 100);
  Engine.update(engine);

  rotator -= 0.05;

  Body.setAngle(sensors[1].body, 0);
  Body.setPosition(sensors[1].body, { x: sensors[1].body.position.x, y: 605 });
  Body.setAngle(spin.body, rotator);

  if (isAutoMoving) Body.setAngularVelocity(player.body, 0.01);

  const shiftX = -player.body.position.x + width / 2.28;
  // const shiftY = -player.body.position.y * zoom + height / 2;

  setPlayerBoundaries();
  savePlayerProperties();

  once(() => {
    translate(shiftX, 70);
    push();
    scale(-1, 1);
    image(imgRoom, 50, -80, 5085, 720);
    pop();
    image(imgRoom, -205, -80, 5085, 720);
    image(gifPsychedelic, 0, 0, 100, 100);
    image(imgXylophone, 800, 450, 500, 200);

    blocks.forEach((block) => block.draw());

    sensors.forEach((sensor) => sensor.draw());

    //particle.update(player.body.position.x - 200, player.body.position.y - 200);
    //particle.show();
    //particle.look(walls);

    for (let wall of walls) {
      wall.show();
    }

    player.draw();

    mouse.setOffset({ x: -shiftX, y: -70 });
    mouse.draw();
  });

  getCanvasContent();
}
