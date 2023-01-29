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
      y: 110,
      r: 30,
      color: "red",
      image: playerImage,
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
  cam.swivelBehind(() => player.body.position.x >= CANVAS_BREAKPOINT);

  for (let i = 0; i <= 15; i++) {
    image(imgRoom, i * 1280, 0, 1280, 720);
  }

  if (canCanonRotate) {
    if (canonAngle >= 0.6) {
      isCanonReversing = true;
    } else if (canonAngle <= -0.6) {
      isCanonReversing = false;
    }

    if (isCanonReversing) {
      canonAngle -= 0.005;
    } else {
      canonAngle += 0.005;
    }

    Body.setAngle(canon.body, canonAngle);
  }

  if (isElevatorMoving) {
    if (elevator.body.position.y >= 510) {
      Body.setPosition(elevator.body, {
        x: elevator.body.position.x,
        y: elevator.body.position.y - 0.3,
      });
    } else {
      Body.setPosition(player.body, {
        x: canon.body.position.x,
        y: canon.body.position.y,
      });
      soundCanonshoot.play();
    }
  }

  if (isCarWindingUp) {
    playerpositioncar.push(player.body.position.x);
    console.log(playerpositioncar);
    Body.setVelocity(carBody.body, { x: playerpositioncar.length / 3, y: 0 });
  }

  drawCharacters();

  // setTimeout(function () {
  //   soundWoolball.play();
  // }, 1890);

  mouse.setOffset({ x: -cam.shiftX, y: 0 });
  mouse.draw();
}

function drawCharacters() {
  // Body.setAngle(sensors[1].body, 0);
  // Body.setPosition(sensors[1].body, { x: sensors[1].body.position.x, y: 605 });

  if (!marbleRun.hasBeenStarted) player.setAutoMove(true, 0.0075);
  else player.setAutoMove(true);

  sensors.forEach((sensor) => sensor.draw());
  image(imgTowerBg, 1950, 285, 289, 428);
  blocks.forEach((block) => block.draw());

  image(gifElGato, -55, 45, 470, 264);
  push();
  rotate(0.01);
  image(imgXylophone, 785, 560, 540, 120);
  pop();

  if (isCanonDoorOpen) {
    image(imgButtonReleased, 1650, 661, 96, 34);
    Body.setPosition(canonDoor.body, {
      x: canonDoor.body.position.x,
      y: 1540,
    });
  } else {
    image(imgButtonPressed, 1650, 665, 97, 28);
    Body.setPosition(canonDoor.body, {
      x: canonDoor.body.position.x,
      y: 650,
    });
  }

  player.draw();

  image(imgTowerFg, 1950, 285, 289, 428);
  image(imgCannonBase, 2020, 215, 128, 106);
  image(imgRocket, 9830, 165, 339, 531);

  player.showAngle(false);
}
