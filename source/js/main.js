/**
 * VERY HIGH priority:
 * TODO: Add chain to character
 * TODO: LEVELDESIGN
 * TODO: Get "canon" to work properly
 *
 * Low priority:
 * TODO: Shader
 * TODO: fix raycasting :)
 *
 * Important lateron:
 * TODO: Please add JSDoc descriptions to new variables and functions for a cleaner and more semantic project scope
 * TODO: Cleanup code
 */

console.clear();

// Setting up the project
const Engine = Matter.Engine,
  Runner = Matter.Runner,
  Body = Matter.Body;

let canvas;
let engine, world, runner;
/** @type {Mouse} */ let mouse;

/** @type {(BlockCore | Block | Ball | ?)[]} */ let blocks = [];
sensors = [];
/** @type {(() => void)[]} */ let screens;

/** @type {Ball} */ let player;
/** @type {object} */ let playerImage;
/** @type {object} */ let psychedelic;
/** @type {Matter.Vector[]} */ let playerPositions = [{ x: 300, y: 80 }];
/** @type {Matter.Vector} */ let playerPosition_New;
/** @type {number[]} */ let playerRotations = [0];
/** @type {number} */ let playerRotation_New;

let isDragged = false;
let isReversing = false;

// Miscellaneous
let count = 0;
let canvascontent = [];
let avgr = 0;
let avgg = 0;
let avgb = 0;
let avga = 0;

let sensorcolor;
let blockcolor;
let rotator = 0;
let spin;
let automove = true;
let assetcalc = null;
let assettotal = null;
let poly;

// Raycasting.
let walls = [];
let particle;

// let lengthValue = 10;

// Utilities ##########################################################
/**
 * `loadingMessage` is considered a helper function. It is going to be used
 * for printing synchronous logs in the console when `preload` loads new media files.
 *
 * @param {number} currentAsset
 */
function loadingMessage(currentAsset, assetname) {
  if (assetname === undefined) {
    assetname = "Unknown";
  }

  assetname = assetname.split("/").pop();

  console.log(
    `%cLoading asset ${currentAsset}: %c${assetname}`,
    "color: #7289DA; font-weight: bold;"
  );
}

/**
 *
 * @param {function(): void} callback
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
  canvas = createCanvas(1280, 720);
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

  mouse.on("startdrag", (_) => {
    isDragged = true;
  });

  mouse.on("mouseup", (e) => {
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
  sensorcolor = color(0, 255, 50, 100);
  blockcolor = color(255, 0, 255, 100);

  blocks.push(
    new Block(
      world,
      {
        x: 310,
        y: 165,
        w: 40,
        h: 10,
        color: blockcolor,
      },
      { isStatic: true, angle: 0.15 }
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 440,
        y: 215,
        w: 170,
        h: 10,
        color: blockcolor,
      },
      { isStatic: true, angle: 0.25 }
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
        color: sensorcolor,
      },
      { isStatic: true, isSensor: true }
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 1200,
        y: 560,
        w: 500,
        h: 10,
        color: blockcolor,
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

  sensors.push(
    new BlockCore(
      world,
      {
        x: 2000,
        y: 650,
        w: 50,
        h: windowHeight,
        color: sensorcolor,
      },
      { isStatic: true, isSensor: true }
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
        color: sensorcolor,
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

function raycasting() {
  console.log("1");
  blocks.forEach((block) => {
    console.log(block + "2");
    let wall = new Boundary(
      block.body.position.x,
      block.body.position.y,
      block.body.width,
      block.body.height,
      block.body.angle
    );
    console.log("3");
    console.log(wall);
    walls.push(wall);
  });
  particle = new Particle(player.body.position.x, player.body.position.y);
}

function screenevents() {
  //check if Wollknauel collided with sensors[0]
  Matter.Events.on(engine, "collisionStart", (event) => {
    let pairs = event.pairs;
    for (const pair of pairs) {
      if (pair.bodyA.label === "Wollknäuel" && pair.bodyB === sensors[0].body) {
        console.log("Collided with sensor 0");
        guitarAmajorsound.play();
      }

      if (pair.bodyA.label === "Wollknäuel" && pair.bodyB === sensors[1].body) {
        console.log("Collided with sensor 1");
        Body.setVelocity(player.body, { x: 40, y: 0 });
        xylophoneA0sound.play();
      }

      if (pair.bodyA.label === "Wollknäuel" && pair.bodyB === sensors[2].body) {
        console.log("Collided with sensor 2");
        automove = false;
        Body.setVelocity(sensors[1].body, { x: 10, y: 10 });
        xylophoneA1sound.play();

        setTimeout(function () {
          automove = true;
        }, 1000);
      }
    }
  });
}

function getcanvascontent() {
  // Function will consume lots of memory
  // Only call for flex.

  let c = document.getElementById("defaultCanvas0");
  let ctx = c.getContext("2d");
  let chunkSize = 4;

  // Start function which reduces load on device
  if (count > 10) {
    canvascontent = ctx.getImageData(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2,
      canvas.height / 2
    );
    canvascontent = canvascontent.data;

    const canvasfilter = [];
    for (let i = 0; i < canvascontent.length; i += chunkSize) {
      const chunk = canvascontent.slice(i, i + chunkSize);
      canvasfilter.push(chunk);
    }
    canvascontent = canvasfilter;

    canvascontent.forEach((element) => {
      avgr += element[0];
      avgg += element[1];
      avgb += element[2];
      avga += element[3];
    });

    avgr = avgr / canvascontent.length;
    avgg = avgg / canvascontent.length;
    avgb = avgb / canvascontent.length;
    avga = avga / canvascontent.length;

    document.body.style.background = color(avgr, avgg, avgb, avga);

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
  assetcalc = -new Error().lineNumber;

  let playerimagesrc = "./assets/images/Wollball.png";
  playerImage = loadImage(playerimagesrc);
  loadingMessage(1, playerimagesrc);

  let psychedelicgifsrc = "./assets/images/psychedelic.gif";
  psychedelicGif = loadImage(psychedelicgifsrc);
  loadingMessage(2, psychedelicgifsrc);

  let guitarAmajorsoundsrc = "./assets/audio/instruments/amajor.wav";
  guitarAmajorsound = loadSound(guitarAmajorsoundsrc);
  loadingMessage(3, guitarAmajorsoundsrc);

  let xylophoneA0soundsrc = "./assets/audio/instruments/A0.mp3";
  xylophoneA0sound = loadSound(xylophoneA0soundsrc);
  loadingMessage(4, xylophoneA0soundsrc);

  let xylophoneA1soundsrc = "./assets/audio/instruments/A1.mp3";
  xylophoneA1sound = loadSound(xylophoneA1soundsrc);
  loadingMessage(5, xylophoneA1soundsrc);

  let roomimagesrc = "./assets/images/room.png";
  roomimage = loadImage(roomimagesrc);
  loadingMessage(6, roomimagesrc);

  let xylophoneimgsrc = "./assets/images/xylophone.svg";
  xylophoneimg = loadImage(xylophoneimgsrc);
  loadingMessage(7, xylophoneimgsrc);

  assetcalc += new Error().lineNumber;
  assettotal = (assetcalc - 2) / 4;
  console.log(
    `%c\n-------------------------\nTotal assets loaded: %c${assettotal}`,
    "color: #7289DA; font-weight: bold;"
  );
}

function setup() {
  initCanvas();
  initMouse();
  initPlayer();

  screens = [screen01 /*, screen02 */];

  initScreens(screens);
  screenevents();
  raycasting();
}

function draw() {
  background(200, 150, 100);
  rotator -= 0.05;

  Body.setAngle(sensors[1].body, 0);
  Body.setPosition(sensors[1].body, { x: sensors[1].body.position.x, y: 605 });

  Body.setAngle(spin.body, rotator);
  if (automove === true) {
    Body.setAngularVelocity(player.body, 0.01);
  }

  Engine.update(engine);

  const shiftX = -player.body.position.x + windowWidth / 2.28;
  // const shiftY = -player.body.position.y * zoom + height / 2;

  // console.log(shiftX, shiftY);
  setPlayerBoundaries();
  savePlayerProperties();

  once(() => {
    translate(shiftX, 70);
    push();
    scale(-1, 1);
    image(roomimage, 50, -80, 5085, 720);
    pop();
    image(roomimage, -205, -80, 5085, 720);
    image(psychedelicGif, 0, 0, 100, 100);
    image(xylophoneimg, 800, 450, 500, 200);
    blocks.forEach((block) => block.draw());
    sensors.forEach((sensor) => sensor.draw());
    particle.update(player.body.position.x - 200, player.body.position.y - 200);
    particle.show();
    particle.look(walls);
    for (let wall of walls) {
      wall.show();
    }
    player.draw();
    mouse.setOffset({ x: -shiftX, y: -70 });
    mouse.draw();
  });
  getcanvascontent();
}
