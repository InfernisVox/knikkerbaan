// @ts-check
"use strict";

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

// #######################################
function screen01() {
  let sensorColor = color(0, 255, 50, 100);
  let blockColor = color(255, 0, 255);

  // TODO: Please correct the heights for the blocks as they are off by about 70 [px].
  floorblock = new Block(
    world,
    {
      x: windowWidth / 2,
      y: 700,
      w: windowWidth * 50,
      h: 40,
      color: "gray",
    },
    { isStatic: true }
  );

  blocks.push(floorblock);

  wall = new Block(
    world,
    {
      x: -565,
      y: windowHeight / 2,
      w: 1000,
      h: windowHeight * 2,
      color: "black",
      image: imgWall,
    },
    { isStatic: true }
  );

  blocks.push(wall);

  bed = new PolygonFromSVG(
    world,
    {
      x: 410,
      y: 560,
      w: 685,
      h: 511,
      fromFile: "assets/images/bed.svg",
      scale: 0.95,
      color: color(255, 255, 255, 0),
      image: imgBed,
    },
    { isStatic: true, angle: 0 }
  );

  blocks.push(bed);

  sensors.push(
    new BlockCore(
      world,
      {
        x: 150,
        y: 150,
        w: 120,
        h: 250,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true }
    )
  );

  xylophone = new Block(
    world,
    {
      x: 1055,
      y: 660,
      w: 520,
      h: 80,
      color: color(255, 255, 255, 0),
    },
    { isStatic: true, angle: 0.07 }
  );

  blocks.push(xylophone);

  for (let i = 0; i < 10; i++) {
    sensors.push(
      new BlockCore(
        world,
        {
          x: 850 + i * 48,
          y: 560 + i * 4,
          w: 15,
          h: 100,
          color: sensorColor,
        },
        { isStatic: true, isSensor: true }
      )
    );
  }

  sensors.push(
    new BlockCore(
      world,
      {
        x: 1700,
        y: 650,
        w: 120,
        h: 100,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true }
    )
  );

  towerLeft = new Block(
      world,
      {
        x: 2010,
        y: 460,
        w: 80,
        h: 300,
        color: color(255, 255, 255, 0),
      },
      { isStatic: true }
    );
    
  blocks.push(towerLeft);

  towerRight = new Block(
      world,
      {
        x: 2160,
        y: 500,
        w: 80,
        h: 380,
        color: color(255, 255, 255, 0),
      },
      { isStatic: true }
    );

  blocks.push(towerRight);

  canon = new BlockCore(
    world,
    {
      x: 2100,
      y: 220,
      w: 220,
      h: 70,
      color: blockColor,
    },
    { isStatic: true, angle: canonAngle, isSensor: true }
  );

  blocks.push(canon);

  sensors.push(
    new BlockCore(
      world,
      {
        x: 2090,
        y: 590,
        w: 100,
        h: 200,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true }
    )
  );

  canonDoor = new Block(
    world,
    {
      x: 2005,
      y: 648,
      w: 80,
      h: 107,
      color: color(255, 255, 255, 0),
      image: imgTowerDoor,
    },
    { isStatic: true }
  );

  blocks.push(canonDoor);

  elevator = new Block(
    world,
    {
      x: 2100,
      y: windowHeight + 250,
      w: 190,
      h: 500,
      color: blockColor,
    },
    { isStatic: true }
  );

  blocks.push(elevator);

  blocks.push(
    new PolygonFromSVG(
      world,
      {
        x: 3020,
        y: 360,
        w: 800,
        h: 494,
        fromFile: "assets/images/Hotwheels.svg",
        scale: 0.95,
        color: blockColor,
      },
      { isStatic: true, angle: 0 }
    )
  );

  blocks.push(
    new PolygonFromSVG(
      world,
      {
        x: 3250,
        y: 390,
        w: 438,
        h: 112,
        fromFile: "assets/images/Hotwheels_mid.svg",
        scale: 0.95,
        color: blockColor,
      },
      { isStatic: true, angle: 0 }
    )
  );

  sensors.push(
    new BlockCore(
      world,
      {
        x: 2760,
        y: 0,
        w: 80,
        h: 494,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true }
    )
  );

  blocks.push(
    new PolygonFromSVG(
      world,
      {
        x: 3850,
        y: 550,
        w: 438,
        h: 112,
        fromFile: "assets/images/Landing_pad.svg",
        scale: 0.95,
        color: blockColor,
      },
      { isStatic: true, angle: 0 }
    )
  );

  loopRight = new PolygonFromSVG(
    world,
    {
      x: 4500,
      y: 298,
      w: 494,
      h: 449,
      fromFile: "assets/images/Loop_right.svg",
      scale: 0.95,
      color: blockColor,
    },
    { isStatic: true, angle: 0 }
  );

  blocks.push(loopRight);

  loopLeft = new PolygonFromSVG(
    world,
    {
      x: 4230,
      y: 1298,
      w: 494,
      h: 449,
      fromFile: "assets/images/Loop_left.svg",
      scale: 0.95,
      color: blockColor,
    },
    { isStatic: true, angle: 0 }
  );

  blocks.push(loopLeft);

  sensors.push(
    new BlockCore(
      world,
      {
        x: 3900,
        y: 500,
        w: 80,
        h: 200,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true }
    )
  );

  sensors.push(
    new BlockCore(
      world,
      {
        x: 4360,
        y: 140,
        w: 80,
        h: 100,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true }
    )
  );

  blocks.push(
    new PolygonFromSVG(
      world,
      {
        x: 4950,
        y: 527,
        w: 474,
        h: 299,
        fromFile: "assets/images/Jump_pad.svg",
        scale: 0.95,
        color: blockColor,
      },
      { isStatic: true, angle: 0 }
    )
  );

  carBody = new Block(
    world,
    {
      x: 5000,
      y: 100,
      w: 200,
      h: 40,
      color: blockColor,
      collisionFilter: {
        category: Masks.CAR,
        mask: Masks.WORLD,
      },
    },
    {
      isStatic: false,
      angle: 0,
      collisionFilter: {
        category: Masks.CAR,
        mask: Masks.WORLD,
      },
    }
  );

  blocks.push(carBody);

  carWheel1 = new Ball(
    world,
    {
      x: carBody.body.position.x - 80,
      y: carBody.body.position.y,
      r: 40,
      color: "lightblue",
    },
    {
      isStatic: false,
      angle: 0,
      friction: 0.8,
      collisionFilter: {
        category: Masks.CAR,
        mask: Masks.WORLD,
      },
    }
  );

  carWheel1.constrainTo(carBody, {
    pointA: { x: 0, y: 0 },
    pointB: { x: 0 - 80, y: 0 + 10 },
    length: 0,
    stiffness: 1,
    draw: true,
    color: color(255, 0, 0),
    width: 2,
  });

  blocks.push(carWheel1);

  carWheel2 = new Ball(
    world,
    {
      x: carBody.body.position.x + 80,
      y: carBody.body.position.y,
      r: 40,
      color: "lightblue",
    },
    {
      isStatic: false,
      angle: 0,
      friction: 0.8,
      collisionFilter: {
        category: Masks.CAR,
        mask: Masks.WORLD,
      },
    }
  );

  carWheel2.constrainTo(carBody, {
    pointA: { x: 0, y: 0 },
    pointB: { x: 0 + 80, y: 0 + 10 },
    length: 0,
    stiffness: 1,
    draw: true,
    color: color(255, 0, 0),
    width: 2,
  });

  blocks.push(carWheel2);

  baseballGlove = new PolygonFromSVG(
    world,
    {
      x: 2770,
      y: 80,
      w: 174,
      h: 183,
      fromFile: "assets/images/Baseballglove.svg",
      color: blockColor,
    },
    { isStatic: false, angle: 0 }
  );
  blocks.push(baseballGlove);
}

/**
 * `initMouse` creates a new instance of the custom `Mouse` class. The
 * function specifies all the events that the mouse should listen to when
 * interacting with the canvas.
 */
function initMouse() {
  mouse = new Mouse(engine, canvas, { stroke: "blue", strokeWeight: 3 });

  mouse.on("startdrag", (/** @type {any} */ _) => {
    mouseIsDragged = true;
  });

  mouse.on("mouseup", (/** @type {any} */ e) => {
    if (!mouseIsDragged) {
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
    mouseIsDragged = false;
  });
}

function screenEvents() {
  // check if Wollknäuel collided with sensors[0]
  Matter.Events.on(engine, "collisionStart", (event) => {
    let pairs = event.pairs;
    for (const pair of pairs) {
      if (pair.bodyA.label === Player.LABEL && pair.bodyB === sensors[0].body) {
        console.log("Collided with sensor 0");

        // Not working
        player.setAutoMove(false, 0);

        setTimeout(function () {
          Body.setAngularVelocity(player.body, 10);
          console.log("inside");
        }, 1);
      }

      if (pair.bodyA.label === Player.LABEL && pair.bodyB === sensors[1].body) {
        console.log("Collided with sensor 1");
        console.log(sensors[1].body);
        soundXylophoneA1.play();
        Body.setVelocity(player.body, { x: 0.5, y: 4 });
      }

      if (pair.bodyA.label === Player.LABEL && pair.bodyB === sensors[2].body) {
        console.log("Collided with sensor 2");
        soundXylophoneB1.play();
        Body.setVelocity(player.body, { x: 0.5, y: 4 });
      }

      if (pair.bodyA.label === Player.LABEL && pair.bodyB === sensors[3].body) {
        console.log("Collided with sensor 3");
        soundXylophoneC1.play();
        Body.setVelocity(player.body, { x: 0.5, y: 4 });
      }

      if (pair.bodyA.label === Player.LABEL && pair.bodyB === sensors[4].body) {
        console.log("Collided with sensor 4");
        soundXylophoneD1.play();
        Body.setVelocity(player.body, { x: 0.5, y: 4 });
      }

      if (pair.bodyA.label === Player.LABEL && pair.bodyB === sensors[5].body) {
        console.log("Collided with sensor 5");
        soundXylophoneE1.play();
        Body.setVelocity(player.body, { x: 0.5, y: 4 });
      }

      if (pair.bodyA.label === Player.LABEL && pair.bodyB === sensors[6].body) {
        console.log("Collided with sensor 6");
        soundXylophoneF1.play();
        Body.setVelocity(player.body, { x: 0.5, y: 4 });
      }

      if (pair.bodyA.label === Player.LABEL && pair.bodyB === sensors[7].body) {
        console.log("Collided with sensor 7");
        soundXylophoneG1.play();
        Body.setVelocity(player.body, { x: 0.5, y: 4 });
      }

      if (pair.bodyA.label === Player.LABEL && pair.bodyB === sensors[8].body) {
        console.log("Collided with sensor 8");
        soundXylophoneA2.play();
        Body.setVelocity(player.body, { x: 0.5, y: 4 });
      }

      if (pair.bodyA.label === Player.LABEL && pair.bodyB === sensors[9].body) {
        console.log("Collided with sensor 9");
        soundXylophoneB2.play();
        Body.setVelocity(player.body, { x: 0.5, y: 4 });
      }

      if (pair.bodyA.label === Player.LABEL && pair.bodyB === sensors[10].body) {
        console.log("Collided with sensor 10");
        soundXylophoneC2.play();
        Body.setVelocity(player.body, { x: 0.5, y: 4 });
      }

      if (pair.bodyA.label === Player.LABEL && pair.bodyB === sensors[11].body) {
        console.log("Collided with sensor 11");
        if (isCanonDoorOpen == true) {
          isCanonDoorOpen = false;
        } else {
          isCanonDoorOpen = true;
        }
      }

      if (pair.bodyA.label === Player.LABEL && pair.bodyB === sensors[12].body) {
        console.log("Collided with sensor 12");
        player.setAutoMove(false, 0);
        isElevatorMoving = true;
        canCanonRotate = true;
        setTimeout(function () {
          isCanonDoorOpen = false;
        }, 2000);
      }

      if (pair.bodyA.label === Player.LABEL && pair.bodyB === sensors[13].body) {
        console.log("Collided with sensor 13");
        player.setAutoMove(false);
      }

      if (pair.bodyA.label === Player.LABEL && pair.bodyB === sensors[14].body) {
        console.log("Collided with sensor 13");
        Body.setVelocity(player.body, { x: 26, y: 0 });
      }

      if (pair.bodyA.label === Player.LABEL && pair.bodyB === sensors[15].body) {
        console.log("Collided with sensor 13");
        if (loopLeft.body.position.y >= 1080) {
          Body.setPosition(loopLeft.body, {
            x: loopLeft.body.position.x,
            y: 298,
          });
          Body.setPosition(loopRight.body, {
            x: loopRight.body.position.x,
            y: 1298,
          });
        } else {
          Body.setPosition(loopLeft.body, {
            x: loopLeft.body.position.x,
            y: 1298,
          });
          Body.setPosition(loopRight.body, {
            x: loopRight.body.position.x,
            y: 298,
          });
        }
      }
    }
  });
}

function setCollisionEvents() {
  Matter.Events.on(engine, "collisionStart", function (event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === Player.LABEL || bodyB.label === Player.LABEL) {
      // isPlayerOnGround = true;
      player.isOnGround = true;
    }
  });

  Matter.Events.on(engine, "collisionEnd", function (event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === Player.LABEL || bodyB.label === Player.LABEL) {
      // isPlayerOnGround = false;
      player.isOnGround = false;
    }
  });
}

function spacePressed() {
  if (keyIsDown(Keys.SPACE)) {
    player.timer.run();

    if (player.timer.progress > Player.THRESHOLD_TIMER_PERCENT) {
      if (!player.hasRewindStarted) {
        player.positionsLengthMax = player.positions.length;
        player.hasRewindStarted = true;
      }

      // console.log(maxCount, player.positions.length);
      if (marbleRun.hasBeenStarted) {
        player.showBar(true);
        player.rewind();
      }

      if (!player.isReversing && marbleRun.hasBeenStarted) {
        Matter.Body.setStatic(player.body, true);
        player.isReversing = true;
      }
    }
  }
}
