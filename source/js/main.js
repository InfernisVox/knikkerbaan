// @ts-check
"use strict";

Matter.use("matter-wrap");

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
}

function draw() {
  background(200, 150, 100);
  Engine.update(engine);

  rotator -= 0.05;

  // Body.setAngle(sensors[1].body, 0);
  // Body.setPosition(sensors[1].body, { x: sensors[1].body.position.x, y: 605 });
  Body.setAngle(spin.body, rotator);

  if (!initiated) player.setAutoMove(true, 0.0075);
  else player.setAutoMove(true);

  Player.savePositionsOf(player, !isSpacePressed, vectorDiffersFromBy);
  Player.saveAnglesOf(player, !isSpacePressed, angleDiffersFromBy);

  const shiftX = -player.body.position.x + width / 2.28;
  // const shiftY = -player.body.position.y * zoom + height / 2;

  once(() => {
    if (!initiated) {
      if (player.body.position.x >= 690) {
        initiated = true;
        if (i !== 1) i += 0.01;
        translate(i < 1 ? shiftX * i : shiftX, 70);
      }
    } else {
      translate(shiftX, 70);
    }
    push();
    scale(-1, 1);
    image(imgRoom, 50, -80, 5085, 720);
    pop();
    image(imgRoom, -205, -80, 5085, 720);
    //image(gifPsychedelic, 0, 0, 100, 100);
    image(imgXylophone, 750, 450, 500, 200);
    image(gifelgato, -70, -10, 470, 264);

    blocks.forEach((block) => block.draw());

    sensors.forEach((sensor) => sensor.draw());

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
}

// ##################################################

function keyPressed() {
  if (keyCode === SPACE) {
    startTimer();

    isSpacePressed = true;

    if (initiated) player.jumpWith(null);
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
