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

function drawCanvas() {
  cam.swivelBehind(() => player.body.position.x <= CANVAS_BREAKPOINT);

  if (cannonCanRotate) {
    if (cannonAngle >= 0.33) {
      cannonIsReversing = true;
    } else if (cannonAngle <= -0.65) {
      cannonIsReversing = false;
    }

    if (cannonIsReversing) {
      cannonAngle -= 0.005;
    } else {
      cannonAngle += 0.005;
    }

    Body.setAngle(cannon.body, cannonAngle);
  }

  if (cannonElevatorIsMoving) {
    if (cannonElevator.body.position.y >= 510) {
      Body.setPosition(cannonElevator.body, {
        x: cannonElevator.body.position.x,
        y: cannonElevator.body.position.y - 0.95,
      });
    } else {
      if (!cannonHasBeenLoaded) {
        cannonHasBeenLoaded = true;
        player.recordedData = [];

        Body.setPosition(player.body, {
          x: cannon.body.position.x,
          y: cannon.body.position.y,
        });

        Matter.Body.setStatic(player.body, true);

        player.onSpacePress = MarbleRun.mapSpacePressOfTo(
          player,
          FactoryFlag.CANON_SHOOT
        );
        player.onSpaceHold = MarbleRun.mapSpaceHoldOfTo(
          player,
          FactoryFlag.EMPTY
        );
      }
    }
  }

  if (carIsWindingUp) {
    playerPositionCar.push(player.body.position.x);
    console.log(playerPositionCar);
    Body.setVelocity(carBody.body, { x: playerPositionCar.length / 3, y: 0 });
  }

  drawCharacters();

  mouse.draw();
}

function drawCharacters() {
  sensors.forEach((sensor) => sensor.draw());
  image(imgTowerBg, 1950, 285, 289, 428);
  image(imgBallPitBg, 7893, 575, 415, 127);
  blocks.forEach((block) => block.draw());

  image(gifElGato, -55, 45, 470, 264);
  push();
  rotate(0.01);
  image(imgXylophone, 785, 560, 540, 120);
  pop();

  if (cannonDoorIsOpen) {
    image(imgButtonReleased, 1650, 661, 96, 34);
    Body.setPosition(cannonDoor.body, {
      x: cannonDoor.body.position.x,
      y: 1540,
    });
  } else {
    image(imgButtonPressed, 1650, 665, 97, 28);
    Body.setPosition(cannonDoor.body, {
      x: cannonDoor.body.position.x,
      y: 650,
    });
  }

  playerVelocityX = player.body.velocity.x;
  if (!playerIsMovingUpward) {
    if (playerVelocityX > 0.02) Matter.Body.setAngularVelocity(player.body, 0.02);
  } else {
    if (playerVelocityX > 0.02) Matter.Body.setAngularVelocity(player.body, -0.08);
  }
  player.draw();
  cannon.draw();

  image(imgTowerFg, 1950, 285, 289, 428);
  image(imgCannonBase, 2020, 215, 128, 106);
  image(imgBallPitFg, 7893, 588, 415, 114);
  image(imgRocket, 10030, 165, 339, 531);

  player.showAngle(false);
}
