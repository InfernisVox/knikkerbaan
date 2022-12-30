/**
 * TODO: Add chain to character
 * TODO: Add screen change
 * TODO: SCREEN SCROLL @RON please first thing even before the chain i dont know anymore tried for an hour
 *
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
/** @type {(() => void)[]} */ let screens;

/** @type {Ball} */ let player;
/** @type {object} */ let playerImage;
/** @type {Matter.Vector[]} */ let playerPositions = [{ x: 300, y: 80 }];
/** @type {Matter.Vector} */ let playerPosition_New;
/** @type {number[]} */ let playerRotations = [0];
/** @type {number} */ let playerRotation_New;

let isDragged = false;
let isReversing = false;

// Miscellaneous
let poly;
// let lengthValue = 10;

// Utilities ##########################################################
/**
 * `loadingMessage` is considered a helper function. It is going to be used
 * for printing synchronous logs in the console when `preload` loads new media files.
 *
 * @param {number} currentAsset
 */
function loadingMessage(currentAsset) {
  console.clear();
  console.log(`Loading assets ... ${currentAsset} / 1`);
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
        Body.setVelocity(player.body, { x: 4, y: 12 });
      }
    }
  };
  document.body.onkeyup = function (/** @type {KeyboardEvent} */ e) {
    if (e.code === "Space") {
      console.log("i have arrived");
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
  blocks.push(
    new Block(
      world,
      {
        x: 100,
        y: 400,
        w: 500,
        h: 10,
        color: "red",
      },
      { isStatic: true, angle: 0.1 }
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
        color: "yellow",
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
      y: 80,
      r: 30,
      color: "blue",
      image: playerImage,
      scale: 0.4,
    },
    {
      label: "Wollknäuel",
      isStatic: false,
      density: 0.001,
      restitution: 0.75,
      friction: 0.001,
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

  if (
    player.body.position.y < 0 ||
    player.body.position.y > 750 ||
    player.body.position.x < 0
  ) {
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
  loadingMessage(0);
  playerImage = loadImage("./assets/images/Wollball.png");
  loadingMessage(1);
}

function setup() {
  initCanvas();
  initMouse();
  initPlayer();

  screens = [screen01 /*, screen02 */];

  initScreens(screens);
}

function draw() {
  background(200, 150, 100);
  Engine.update(engine);

  const shiftX = -player.body.position.x + windowWidth / 2;
  // const shiftY = -player.body.position.y * zoom + height / 2;

  // console.log(shiftX, shiftY);
  setPlayerBoundaries();
  savePlayerProperties();

  once(() => {
    translate(shiftX, 70);
    blocks.forEach((block) => block.draw());
    player.draw();
    mouse.setOffset({ x: -shiftX, y: -70 });
    mouse.draw();
  });
}
