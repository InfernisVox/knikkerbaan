// @ts-check
"use strict";

// Initializations ##########################################################
function init() {
  initCanvas();
  initMouse();
  initPlayer();
}

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
  textAlign(LEFT, CENTER);

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
      y: 135,
      r: 30,
      color: "red",
      image: imgPlayer,
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

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} [sampleSize] The size at which different pixel samples should be selected
 */
function getCanvasContent(canvas, sampleSize = 100) {
  /** @type {ImageData} */ let canvasContent;
  /** @type {Uint8ClampedArray} */ let canvasContentData;

  /** @type {number | undefined} */ let rAvg;
  /** @type {number | undefined} */ let gAvg;
  /** @type {number | undefined} */ let bAvg;
  /** @type {number | undefined} */ let aAvg;

  /** @type {CanvasRenderingContext2D} */ let ctx = canvas.getContext("2d");

  canvasContent = ctx.getImageData(
    Canvas.WIDTH / 2,
    Canvas.HEIGHT / 2,
    Canvas.WIDTH / 2,
    Canvas.HEIGHT / 2
  );
  canvasContentData = canvasContent.data;

  const canvasContentRGBA = [];
  for (let i = 0; i < canvasContentData.length; i += CANVAS_DATA_CHUNK_SIZE) {
    const chunk = canvasContentData.slice(i, i + CANVAS_DATA_CHUNK_SIZE);
    canvasContentRGBA.push(chunk);
  }

  canvasContentRGBA.forEach((element) => {
    rAvg += element[0];
    gAvg += element[1];
    bAvg += element[2];
    aAvg += element[3];
  });

  rAvg = rAvg / canvasContentRGBA.length;
  gAvg = gAvg / canvasContentRGBA.length;
  bAvg = bAvg / canvasContentRGBA.length;
  aAvg = aAvg / canvasContentRGBA.length;

  document.body.style.backgroundColor = `rgba(${rAvg},${gAvg},${bAvg},${aAvg})`;

  for (let i = 0; i < sampleSize; i++) {}
}

function drawCanvas() {
  cam.swivelBehind(() => player.body.position.x <= CANVAS_BREAKPOINT);

  drawLevel();
}

function adjustCar() {
  push();
  imageMode(CENTER);
  translate(carBody.body.position.x, carBody.body.position.y);
  rotate(carBody.body.angle);
  image(imgFgCarbody, 0, -20, 357, 111);
  pop();
}

function drawLevel() {
  sensors.forEach((sensor) => sensor.draw());
  image(imgTowerBg, 1950, 285, 289, 428);
  image(imgBallPitBg, 7893, 575, 415, 127);
  blocks.forEach((block) => block.draw());

  if (rocketflying) {
    if (rocket.body.position.y >= -10000) {
      Body.setPosition(rocket.body, {
        x: rocket.body.position.x,
        y: rocket.body.position.y - 3,
      });
      rocketoffset = rocket.body.position.y - 300;
    } else {
      rocketflying = false;
    }
  }

  for (let i = -1; i <= 15; i++) {
    image(imgFloor, i * 2560, 675, 2560, 50);
  }

  image(imgWall, -1180, 0, 1165, 720);

  image(gifElGato, -55, 45, 470, 264);
  push();
  rotate(0.01);
  image(imgXylophone, 785, 560, 540, 120);
  pop();

  rotateCannon();
  loadCannon();
  setCannonButton();

  autoMove(player);
  player.draw();
  cannon.draw();

  adjustCar();

  image(imgTowerFg, 1950, 285, 289, 428);
  image(imgCannonBase, 2020, 215, 128, 106);

  push();
  translate(3270, 555);
  rotate(-0.26);
  image(imgColdWheelsFast, 0, 0, 132, 85);
  pop();

  push();
  translate(3840, 490);
  rotate(0.1);
  image(imgColdWheelsFast, 0, 0, 132, 85);
  pop();

  image(imgColdWheelsFast, 4700, 500, 132, 85);

  image(imgLoop1, 4035, 60, 656, 655);
  image(imgLoop2, 6100, -40, 980, 950);
  image(imgBallPitFg, 7893, 588, 415, 114);
  image(imgRocket, 10030, rocketoffset, 339, 531);

  once(() => {
    // TODO: Hier kommen die Images rein, die im Vordergrund für den Parallax genutzt werden
    translate(cam.shiftX * 0.5, 0);
    image(imgFgBoxStar, 280, 520, 234, 235);
    image(imgFgBoxHeart, 150, 600, 194, 195);
    image(imgFgSucculente, 1300, 360, 360, 396);
    image(imgFgBaseballbat, 3200, 640, 827, 130);
    image(imgFgBaseball, 4400, 575, 174, 170);
  });

  mouse.draw();
}
