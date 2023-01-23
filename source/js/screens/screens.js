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
      x: -536,
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
      { isStatic: true, isSensor: true, label: "bedsensor" }
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
          y: 580 + i * 4,
          w: 15,
          h: 40,
          color: sensorColor,
        },
        { isStatic: true, isSensor: true, label: "xylophonesensor" + i }
      )
    );
  }

  sensors.push(
    new BlockCore(
      world,
      {
        x: 1700,
        y: 650,
        w: 90,
        h: 60,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true, label: "canondoorsensor" }
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
      { isStatic: true, isSensor: true, label: "elevatorsensor" }
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
        y: 410,
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
        y: 490,
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
        y: 50,
        w: 80,
        h: 494,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true, label: "baseballglovesensor" }
    )
  );

  blocks.push(
    new PolygonFromSVG(
      world,
      {
        x: 3850,
        y: 600,
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
      y: 348,
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
      y: 1338,
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
        y: 550,
        w: 80,
        h: 200,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true, label: "speedboostloopingsensor" }
    )
  );

  sensors.push(
    new BlockCore(
      world,
      {
        x: 4360,
        y: 190,
        w: 80,
        h: 100,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true, label: "loopingswitchsensor" }
    )
  );

  blocks.push(
    new PolygonFromSVG(
      world,
      {
        x: 4950,
        y: 577,
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
      x: 5300,
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
      label: "carwheel1",
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
      label: "carwheel2",
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
      x: 2750,
      y: 137,
      w: 174,
      h: 183,
      fromFile: "assets/images/Baseballglove.svg",
      color: blockColor,
    },
    { isStatic: false, angle: 0 }
  );

  blocks.push(baseballGlove);

  sensors.push(
    new BlockCore(
      world,
      {
        x: 3350,
        y: 580,
        w: 20,
        h: 120,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true, label: "wheelshotmidspeedboostsensor" }
    )
  );

  sensors.push(
    new BlockCore(
      world,
      {
        x: 4750,
        y: 500,
        w: 20,
        h: 120,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true, label: "jumppadspeedboostsensor" }
    )
  );

  carconstraintsensor = new BlockCore(
    world,
    {
      x: 5300,
      y: 600,
      w: 60,
      h: 120,
      color: sensorColor,
    },
    { isStatic: true, isSensor: true, label: "carsensor" }
  );
  sensors.push(carconstraintsensor);

  carpushsensor = new BlockCore(
    world,
    {
      x: 5550,
      y: 1600,
      w: 600,
      h: 160,
      color: sensorColor,
    },
    { isStatic: true, isSensor: true, label: "carpushsensor" }
  );
  sensors.push(carpushsensor);

  loopRight2 = new PolygonFromSVG(
    world,
    {
      x: 6800,
      y: 373,
      w: 494,
      h: 449,
      fromFile: "assets/images/Loop_right.svg",
      scale: 1.4,
      color: blockColor,
    },
    { isStatic: true, angle: 0 }
  );

  blocks.push(loopRight2);

  loopLeft2 = new PolygonFromSVG(
    world,
    {
      x: 6400,
      y: 1373,
      w: 494,
      h: 449,
      fromFile: "assets/images/Loop_left.svg",
      scale: 1.4,
      color: blockColor,
    },
    { isStatic: true, angle: 0 }
  );
  blocks.push(loopLeft2);

  sensors.push(
    new BlockCore(
      world,
      {
        x: 6600,
        y: 130,
        w: 110,
        h: 170,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true, label: "loopingswitchsensor2" }
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 7400,
        y: 730,
        w: 400,
        h: 200,
        color: blockColor,
      },
      { isStatic: true, angle: -0.25 }
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 7950,
        y: 630,
        w: 10,
        h: 100,
        color: blockColor,
      },
      { isStatic: true, angle: 0 }
    )
  );

  sensors.push(
    new BlockCore(
      world,
      {
        x: 8100,
        y: 630,
        w: 290,
        h: 100,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true, label: "carconstraintsensor2" }
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 8250,
        y: 630,
        w: 10,
        h: 100,
        color: blockColor,
      },
      { isStatic: true, angle: 0 }
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 8700,
        y: 630,
        w: 200,
        h: 100,
        color: blockColor,
      },
      { isStatic: true, angle: 0 }
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 8980,
        y: 630,
        w: 200,
        h: 200,
        color: blockColor,
      },
      { isStatic: true, angle: 0.05 }
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 9000,
        y: 430,
        w: 100,
        h: 100,
        color: blockColor,
      },
      {
        isStatic: false,
        angle: 0,
        friction: 0.01,
        airfriction: 0.001,
        mass: 0.2,
      }
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 9340,
        y: 705,
        w: 600,
        h: 200,
        color: blockColor,
      },
      { isStatic: true, angle: 0.25 }
    )
  );

  rocket = new PolygonFromSVG(
    world,
    {
      x: 10000,
      y: 550,
      w: 295,
      h: 504,
      fromFile: "assets/images/rocket.svg",
      scale: 1,
      color: blockColor,
    },
    { isStatic: false, angle: 0, mass: 0.9, friction: 1, airfriction: 0.01 }
  );
  blocks.push(rocket);

  sensors.push(
    new BlockCore(
      world,
      {
        x: 10000,
        y: 420,
        w: 150,
        h: 150,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true, label: "rocketlaunchsensor" }
    )
  );

  sensors.push(
    new BlockCore(
      world,
      {
        x: 7100,
        y: 620,
        w: 30,
        h: 150,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true, label: "rampboostsensor" }
    )
  );

  console.log(blocks);
  blocks.push(
    new Stack(
      world,
      {
        x: 8050,
        y: 400,
        cols: 8,
        rows: 10,
        colGap: 5,
        rowGap: 5,
        color: color(random(0, 256), random(0, 256), random(0, 256)),
        create: (bx, by) =>
          Matter.Bodies.circle(bx, by, 10, { restitution: 0.9, mass: 0.1 }),
      },
      { isStatic: false }
    )
  );
  console.log(blocks);
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

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[10].body
      ) {
        console.log("Collided with sensor 10");
        soundXylophoneC2.play();
        Body.setVelocity(player.body, { x: 0.5, y: 4 });
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[11].body
      ) {
        console.log("Collided with sensor 11");
        if (isCanonDoorOpen == true) {
          isCanonDoorOpen = false;
        } else {
          isCanonDoorOpen = true;
        }
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[12].body
      ) {
        console.log("Collided with sensor 12");
        player.setAutoMove(false, 0);
        isElevatorMoving = true;
        canCanonRotate = true;
        setTimeout(function () {
          isCanonDoorOpen = false;
        }, 2000);
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[13].body
      ) {
        console.log("Collided with sensor 13");
        // Body.setStatic(baseballGloveBack1.body, false);
        // Body.setStatic(baseballGloveBack2.body, false);
        player.setAutoMove(false);
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[14].body
      ) {
        console.log("Collided with sensor 14");
        Body.setVelocity(player.body, { x: 26, y: 0 });
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[15].body
      ) {
        console.log("Collided with sensor 15");
        if (loopLeft.body.position.y >= 1080) {
          Body.setPosition(loopLeft.body, {
            x: loopLeft.body.position.x,
            y: 348,
          });
          Body.setPosition(loopRight.body, {
            x: loopRight.body.position.x,
            y: 1348,
          });
        } else {
          Body.setPosition(loopLeft.body, {
            x: loopLeft.body.position.x,
            y: 1348,
          });
          Body.setPosition(loopRight.body, {
            x: loopRight.body.position.x,
            y: 348,
          });
        }
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[16].body
      ) {
        console.log("Collided with sensor 16");
        Body.setVelocity(player.body, { x: 15, y: 0 });
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[17].body
      ) {
        console.log("Collided with sensor 17");
        Body.setVelocity(player.body, { x: 20, y: 0 });
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[18].body
      ) {
        console.log("Collided with sensor 18");
        player.constrainTo(carBody, {
          pointA: { x: 0, y: 0 },
          pointB: { x: 0, y: 0 - 60 },
          length: 0,
          stiffness: 1,
          draw: false,
        });
        player.positions = [];
        player.angles = [];
        Body.setPosition(carconstraintsensor.body, {
          x: carconstraintsensor.body.position.x,
          y: 1600,
        });
        Body.setVelocity(carBody.body, { x: 20, y: 0 });
        Body.setPosition(carpushsensor.body, {
          x: carpushsensor.body.position.x,
          y: 600,
        });
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[19].body
      ) {
        console.log("Collided with sensor 19");
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[20].body
      ) {
        console.log("Collided with sensor 20");
        if (loopLeft2.body.position.y >= 1080) {
          Body.setPosition(loopLeft2.body, {
            x: loopLeft2.body.position.x,
            y: 373,
          });
          Body.setPosition(loopRight2.body, {
            x: loopRight2.body.position.x,
            y: 1373,
          });
        } else {
          Body.setPosition(loopLeft2.body, {
            x: loopLeft2.body.position.x,
            y: 1373,
          });
          Body.setPosition(loopRight2.body, {
            x: loopRight2.body.position.x,
            y: 373,
          });
        }
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[21].body
      ) {
        console.log("Collided with sensor 21");
        console.log("Constraints lösen");
        player.constraints.forEach((constraint) => {
          Matter.World.remove(world, constraint);
        });
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[22].body
      ) {
        console.log("Collided with sensor 22");
        player.positions = [];
        player.angles = [];
        console.log("The End");
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[23].body
      ) {
        console.log("Collided with sensor 23");
        Body.setVelocity(carBody.body, { x: 100, y: 0 });
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
      player.isOnGround = true;
      player.hasJumped = !player.isOnGround;
    }
  });

  Matter.Events.on(engine, "collisionEnd", function (event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === Player.LABEL || bodyB.label === Player.LABEL) {
      player.isOnGround = false;
      player.hasJumped = !player.isOnGround;
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
