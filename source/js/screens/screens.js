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

/**
 * `initMouse` creates a new instance of the custom `Mouse` class. The
 * function specifies all the events that the mouse should listen to when
 * interacting with the canvas.
 */
function initMouse() {
  mouse = new Mouse(engine, canvas, {
    stroke: color(random(0, 256), random(0, 256), random(0, 256)),
    strokeWeight: 3,
  });

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

// #######################################
/**
 *
 * @param {Colour} blockColor
 */
function invisiblewalls(blockColor) {
  blocks.push(
    new Block(
      world,
      {
        x: 1000, // 2000
        y: 150,
        w: 40,
        h: 550,
        color: blockColor,
      },
      { isStatic: true }
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 3445,
        y: 150,
        w: 40,
        h: 550,
        color: blockColor,
      },
      { isStatic: true }
    )
  );

  safetyBlock = new Block(
    world,
    {
      x: 8900,
      y: 400,
      w: 40,
      h: 900,
      color: blockColor,
    },
    {
      isStatic: true,
    }
  );
  blocks.push(safetyBlock);

  rocketdoor = new Block(
    world,
    {
      x: 10050,
      y: 2400,
      w: 40,
      h: 900,
      color: blockColor,
    },
    {
      isStatic: true,
    }
  );
  blocks.push(rocketdoor);
}

// #######################################
function screen01() {
  let sensorColor = color(0, 255, 50, 100);
  let blockColor = color(255, 0, 255);

  invisiblewalls(blockColor);

  cat = Matter.Bodies.rectangle(30, 100, 150, 300, { isStatic: true });
  Matter.Composite.add(world, [cat]);

  blocks.push(
    new Block(
      world,
      {
        x: 100,
        y: 300,
        w: 220,
        h: 100,
        color: blockColor,
      },
      { isStatic: true }
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 2750,
        y: 229,
        w: 120,
        h: 40,
        color: blockColor,
      },
      { isStatic: true }
    )
  );

  cannonElevator = new Block(
    world,
    {
      x: 2095,
      y: windowHeight + 140,
      w: 190,
      h: 380,
      image: imgElevator,
    },
    { isStatic: true }
  );
  blocks.push(cannonElevator);

  floorBlock = new Block(
    world,
    {
      x: windowWidth / 2,
      y: 700,
      w: windowWidth * 50,
      h: 40,
      color: "gray",
      image: imgFloor,
    },
    { isStatic: true, label: "floor" }
  );
  blocks.push(floorBlock);

  wall = new Block(
    world,
    {
      x: -536,
      y: windowHeight / 2,
      w: 1000,
      h: windowHeight * 2,
      color: "black",
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
    { isStatic: true, angle: 0, label: "bed" }
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
        x: 1600,
        y: 650,
        w: 80,
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

  cannon = new Block(
    world,
    {
      x: 2100,
      y: 220,
      w: 220,
      h: 70,
      image: imgCannon,
    },
    { isStatic: true, angle: cannonAngle, isSensor: true }
  );
  // blocks.push(canon);

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

  cannonDoor = new Block(
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
  blocks.push(cannonDoor);

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
        image: imgColdWheels,
      },
      { isStatic: true, angle: 0, label: "Hotwheels" }
    )
  );

  blocks.push(
    new PolygonFromSVG(
      world,
      {
        x: 3250,
        y: 440,
        w: 438,
        h: 112,
        fromFile: "assets/images/Hotwheels_mid.svg",
        //scale: 0.95,
        color: blockColor,
      },
      { isStatic: true, angle: 0, label: "Hotwheels-Mid" }
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

  loopRight = new PolygonFromSVG(
    world,
    {
      x: 4500,
      y: 355,
      w: 494,
      h: 449,
      fromFile: "assets/images/Loop_right.svg",
      scale: 0.95,
      color: blockColor,
      image: imgLoopRight,
    },
    { isStatic: true, angle: 0 }
  );

  blocks.push(loopRight);

  loopLeft = new PolygonFromSVG(
    world,
    {
      x: 4250,
      y: 1345,
      w: 494,
      h: 449,
      fromFile: "assets/images/Loop_left.svg",
      scale: 0.95,
      color: blockColor,
      image: imgLoopLeft,
    },
    { isStatic: true, angle: 0 }
  );
  blocks.push(loopLeft);

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
        image: imgLandingPad,
      },
      { isStatic: true, angle: 0 }
    )
  );

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
        image: imgJumpPad,
      },
      { isStatic: true, angle: 0 }
    )
  );

  carBody = new Block(
    world,
    {
      x: 5300,
      y: 80,
      w: 200,
      h: 30,
      color: blockColor,
      image: imgCarbody,
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
      x: carBody.body.position.x - 135,
      y: carBody.body.position.y,
      r: 32,
      color: "lightblue",
      image: imgCarwheel,
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
    pointB: { x: 0 - 100, y: 0 + 30 },
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
      x: carBody.body.position.x + 135,
      y: carBody.body.position.y,
      r: 32,
      color: "lightblue",
      image: imgCarwheel,
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
    pointB: { x: 0 + 100, y: 0 + 30 },
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
      image: imgBaseballGlove,
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

  carConstraintSensor = new BlockCore(
    world,
    {
      x: 5300,
      y: 600,
      w: 60,
      h: 120,
      color: sensorColor,
    },
    { isStatic: true, isSensor: true, label: "carconstraintsensor" }
  );
  sensors.push(carConstraintSensor);

  carPushSensor = new BlockCore(
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
  sensors.push(carPushSensor);

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
      image: imgLoopRight,
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
      image: imgLoopLeft,
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
        x: 7900,
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
        w: 400,
        h: 300,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true, label: "carconstraintsensor2" }
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 8300,
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
      x: 10200,
      y: 465,
      w: 295,
      h: 504,
      fromFile: "assets/images/rocket.svg",
      scale: 1,
      color: blockColor,
    },
    { isStatic: true, angle: 0, mass: 1, friction: 1, airfriction: 0.01 }
  );
  blocks.push(rocket);

  pushBlock = new Block(
    world,
    {
      x: 9000,
      y: 430,
      w: 100,
      h: 100,
      scale: 0.74,
      color: blockColor,
      image: imgPushbox,
    },
    {
      isStatic: false,
      angle: 0,
      friction: 0.01,
      airfriction: 0.1,
      mass: 1,
    }
  );
  blocks.push(pushBlock);

  sensors.push(
    new BlockCore(
      world,
      {
        x: 10200,
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
        x: 6500,
        y: 620,
        w: 30,
        h: 150,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true, label: "rampboostsensor" }
    )
  );

  blocks.push(
    new Stack(
      world,
      {
        x: 8050,
        y: 80,
        cols: 8,
        rows: 20,
        colGap: 5,
        rowGap: 5,
        color: color(random(0, 256), random(0, 256), random(0, 256)),
        /**
         *
         * @param {number} bx
         * @param {number} by
         * @returns {Matter.Body}
         */
        create: (bx, by) =>
          Matter.Bodies.circle(bx, by, 10, { restitution: 0.9, mass: 0.1 }),
      },
      {
        isStatic: true,
        collisionFilter: {
          category: Masks.CAR,
        },
      }
    )
  );

  sensors.push(
    new BlockCore(
      world,
      {
        x: 2475,
        y: 640,
        w: 500,
        h: 100,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true, label: "cannonPit" }
    )
  );

  sensors.push(
    new BlockCore(
      world,
      {
        x: 7000,
        y: 620,
        w: 30,
        h: 150,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true, label: "rampboostsensor2" }
    )
  );

  sensors.push(
    new BlockCore(
      world,
      {
        x: 8800,
        y: 100,
        w: 120,
        h: 2000,
        color: sensorColor,
      },
      {
        isStatic: true,
        isSensor: true,
        label: "safetyblocksensor",
      }
    )
  );

  sensors.push(
    new BlockCore(
      world,
      {
        x: 9975,
        y: 100,
        w: 160,
        h: 2000,
        color: sensorColor,
      },
      {
        isStatic: true,
        isSensor: true,
        label: "pushblocksensor",
      }
    )
  );

  // TODO: Diese Stelle sorgt für einen Bug beim Jumpen des Players. Es löst einen "Flappy-Bird-Jump" aus (1/2)
  // for (let i = 0; i < 10; i++) {
  //   for (let j = 0; j < 20; j++) {
  //     blocks.push(
  //       new Ball(
  //         world,
  //         {
  //           x: 8000 + i * 20,
  //           y: 400 + j * 20,
  //           r: 9,
  //           color: color(random(0, 256), random(0, 256), random(0, 256)),
  //         },
  //         { isStatic: false, angle: 0, mass: 0.01, restitution: 0.5 }
  //       )
  //     );
  //   }
  // }

  // sensors.push(
  //   new BlockCore(
  //     world,
  //     {
  //       x: 6100,
  //       y: 400,
  //       w: 60,
  //       h: 1000,
  //       color: sensorColor,
  //     },
  //     { isStatic: true, isSensor: true, label: "windingupsensor" }
  //   )
  // );
}

function screenEvents() {
  // check if Wollknäuel collided with sensors[0]
  Matter.Events.on(engine, "collisionStart", (event) => {
    let pairs = event.pairs;

    for (const pair of pairs) {
      // sensors[1].body.label: xylophonesensor0
      ifBodiesArePairs(
        pair.bodyA,
        pair.bodyB,
        Player.LABEL,
        sensors[1].body.label,
        () => {
          console.log(`Collided with sensor 1: ${sensors[1].body.label}`);
          soundXylophoneA1.play();
          Body.setVelocity(player.body, { x: 0.5, y: 4 });
        }
      );

      // sensors[2].body.label: xylophonesensor1
      ifBodiesArePairs(
        pair.bodyA,
        pair.bodyB,
        Player.LABEL,
        sensors[2].body.label,
        () => {
          console.log(`Collided with sensor 2: ${sensors[2].body.label}`);
          soundXylophoneB1.play();
          Body.setVelocity(player.body, { x: 0.5, y: 4 });
        }
      );

      // sensors[3].body.label: xylophonesensor2
      ifBodiesArePairs(
        pair.bodyA,
        pair.bodyB,
        Player.LABEL,
        sensors[3].body.label,
        () => {
          console.log(`Collided with sensor 3: ${sensors[3].body.label}`);
          soundXylophoneC1.play();
          Body.setVelocity(player.body, { x: 0.5, y: 4 });
        }
      );

      // sensors[4].body.label: xylophonesensor3
      ifBodiesArePairs(
        pair.bodyA,
        pair.bodyB,
        Player.LABEL,
        sensors[4].body.label,
        () => {
          console.log(`Collided with sensor 4: ${sensors[4].body.label}`);
          soundXylophoneD1.play();
          Body.setVelocity(player.body, { x: 0.5, y: 4 });
        }
      );

      // sensors[5].body.label: xylophonesensor4
      ifBodiesArePairs(
        pair.bodyA,
        pair.bodyB,
        Player.LABEL,
        sensors[5].body.label,
        () => {
          console.log(`Collided with sensor 5: ${sensors[5].body.label}`);
          soundXylophoneE1.play();
          Body.setVelocity(player.body, { x: 0.5, y: 4 });
        }
      );

      // sensors[6].body.label: xylophonesensor5
      ifBodiesArePairs(
        pair.bodyA,
        pair.bodyB,
        Player.LABEL,
        sensors[6].body.label,
        () => {
          console.log(`Collided with sensor 6: ${sensors[6].body.label}`);
          soundXylophoneF1.play();
          Body.setVelocity(player.body, { x: 0.5, y: 4 });
        }
      );

      // sensors[7].body.label: xylophonesensor6
      ifBodiesArePairs(
        pair.bodyA,
        pair.bodyB,
        Player.LABEL,
        sensors[7].body.label,
        () => {
          console.log(`Collided with sensor 7: ${sensors[7].body.label}`);
          soundXylophoneG1.play();
          Body.setVelocity(player.body, { x: 0.5, y: 4 });
        }
      );

      // sensors[8].body.label: xylophonesensor7
      ifBodiesArePairs(
        pair.bodyA,
        pair.bodyB,
        Player.LABEL,
        sensors[8].body.label,
        () => {
          console.log(`Collided with sensor 8: ${sensors[8].body.label}`);
          soundXylophoneA2.play();
          Body.setVelocity(player.body, { x: 0.5, y: 4 });
        }
      );

      // sensors[9].body.label: xylophonesensor8
      ifBodiesArePairs(
        pair.bodyA,
        pair.bodyB,
        Player.LABEL,
        sensors[9].body.label,
        () => {
          console.log(`Collided with sensor 9: ${sensors[9].body.label}`);
          soundXylophoneB2.play();
          Body.setVelocity(player.body, { x: 0.5, y: 4 });
        }
      );

      // sensors[10].body.label: xylophonesensor9
      ifBodiesArePairs(
        pair.bodyA,
        pair.bodyB,
        Player.LABEL,
        sensors[10].body.label,
        () => {
          console.log(`Collided with sensor 10: ${sensors[10].body.label}`);
          soundXylophoneC2.play();
          Body.setVelocity(player.body, { x: 0.5, y: 4 });
        }
      );

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[11].body
      ) {
        console.log("Collided with sensor 11");
        soundButton.play();
        cannonDoorIsOpen = !cannonDoorIsOpen;
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[12].body
      ) {
        console.log("Collided with sensor 12");

        cannonElevatorIsMoving = true;
        cannonCanRotate = true;
        setTimeout(function () {
          cannonDoorIsOpen = false;
          soundElevator.play();
        }, 1200);
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[13].body
      ) {
        console.log("Collided with sensor 13");
        resetCannon();
        soundBaseballglove.play();
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[14].body
      ) {
        console.log("Collided with sensor 14");
        soundAcceleration.play();
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
        soundAcceleration.play();
        Body.setVelocity(player.body, { x: 15, y: 0 });
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[17].body
      ) {
        console.log("Collided with sensor 17");
        soundAcceleration.play();
        Body.setVelocity(player.body, { x: 20, y: 0 });
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[18].body
      ) {
        console.log("Collided with sensor 18");
        /* player.onSpacePress = MarbleRun.mapSpacePressOfTo(
          player,
          FactoryFlag.EMPTY
        ); */
        player.onSpaceHold = MarbleRun.mapSpaceHoldTo(SpaceMapping.CAR_REWIND);

        Matter.Body.setStatic(carBody.body, true);

        player.constrainTo(carBody, {
          pointA: { x: 0, y: 0 },
          pointB: { x: 0 - 30, y: -30 },
          length: 0,
          stiffness: 1,
          draw: false,
        });

        player.recordedData = [];

        Body.setPosition(carConstraintSensor.body, {
          x: carConstraintSensor.body.position.x,
          y: 1600,
        });
        soundAcceleration.play();
        Body.setVelocity(carBody.body, { x: 20, y: 0 });
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
        player.constraints.forEach((constraint) => {
          Matter.World.remove(world, constraint);
        });

        soundKapow.play();

        // ...
        if (!playerIsInSlowMotion) playerIsInSlowMotion = true;
        Body.setVelocity(carBody.body, { x: 20, y: 0 });
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[22].body
      ) {
        console.log("Collided with sensor 22");
        player.recordedData = [];
        Body.setPosition(rocketdoor.body, {
          x: rocketdoor.body.position.x,
          y: 400,
        });
        rocketflying = true;
        soundRocket.play();
        console.log("The End");
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB === sensors[23].body
      ) {
        console.log("Collided with sensor 23");
        soundAcceleration.play();
        Body.setVelocity(carBody.body, { x: 90, y: 0 });

        playerIsMovingUpward = false;
      }

      // TODO: Diese Stelle sorgt für einen Bug beim Jumpen des Players. Es löst einen "Flappy-Bird-Jump" aus (2/2)
      // if (
      //   pair.bodyA.label === Player.LABEL &&
      //   pair.bodyB === sensors[24].body
      // ) {
      //   console.log("Collided with sensor 24");
      //   Body.setPosition(carpushsensor.body, {
      //     x: carpushsensor.body.position.x,
      //     y: 600,
      //   });
      //   playerpositioncar = [];
      //   windingup = false;
      // }

      // AutoMove ###################################
      // blocks[9].body.label = "Hotwheels"
      if (
        (pair.bodyA.label === Player.LABEL &&
          pair.bodyB.label === "Hotwheels") ||
        (pair.bodyB.label === Player.LABEL && pair.bodyA.label === "Hotwheels")
      ) {
        playerIsMovingUpward = false;
      }

      // blocks[10].body.label = "Hotwheels-Mid"
      if (
        (pair.bodyA.label === Player.LABEL &&
          pair.bodyB.label === "Hotwheels-Mid") ||
        (pair.bodyB.label === Player.LABEL &&
          pair.bodyA.label === "Hotwheels-Mid")
      ) {
        playerIsMovingUpward = true;
      }

      // sensors[24].body.label = "cannonPit"
      if (
        (pair.bodyA.label === Player.LABEL &&
          pair.bodyB.label === "cannonPit") ||
        (pair.bodyB.label === Player.LABEL && pair.bodyA.label === "cannonPit")
      ) {
        // ...
        console.log("Collided with sensor 24");
        if (!cannonHasBeenLoaded && !cannonHasBeenFired) {
          setTimeout(() => {
            cannonHasBeenLoaded = false;
          }, 1000);
        } else {
          // Due to drawCanvas, the player will be reset to the static destination
          cannonHasBeenLoaded = false;
          if (cannonHasBeenFired) cannonHasBeenFired = false;
        }
      }

      // sensors[25].body.label = "rampboostsensor2"
      if (
        (pair.bodyA.label === Player.LABEL &&
          pair.bodyB.label === "rampboostsensor2") ||
        (pair.bodyB.label === Player.LABEL &&
          pair.bodyA.label === "rampboostsensor2")
      ) {
        console.log("Collided with sensor 25");
        soundAcceleration.play();
        Body.setVelocity(carBody.body, { x: 30, y: 0 });

        playerIsMovingUpward = false;
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB.label === "safetyblocksensor"
      ) {
        console.log("Collided with sensor 26");

        Body.setPosition(safetyBlock.body, {
          x: safetyBlock.body.position.x,
          y: 4600,
        });
      }

      if (
        pair.bodyA.label === Player.LABEL &&
        pair.bodyB.label === "pushblocksensor"
      ) {
        console.log("Collided with sensor 27");
        if (
          pushBlock.body.position.x >= 9975 &&
          pushBlock.body.position.y <= 10100 &&
          pushBlock.body.position.y >= 600
        ) {
          Body.setStatic(pushBlock.body, true);
        }
      }
    }
  });
}

function spacePressed() {
  if (keyIsDown(Keys.SPACE)) {
    player.timer.run();

    if (player.timer.progress > Player.THRESHOLD_TIMER_PERCENT) {
      if (!player.hasRewindStarted) {
        player.recordedDataLength = player.recordedData.length;
        player.hasRewindStarted = true;
      }

      if (marbleRun.hasBeenStarted) {
        player.onSpaceHold();

        if (playerCurrentMapping.hold === SpaceMapping.PLAYER_REWIND) {
          player
            .showGlitch(!!player.recordedData.length)
            .showBar(player.isReversing);
        } else if (playerCurrentMapping.hold === SpaceMapping.CAR_REWIND) {
          // ...
          carProgressValue = showProgress();
        }
      }

      if (!player.isReversing && marbleRun.hasBeenStarted) {
        player.isReversing = true;
        soundRewind.play();
      } else {
        soundWoolball.play();
      }
    }
  }
}
