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

function screen01() {
  sensorColor = color(0, 255, 50, 100);
  blockColor = color(255, 0, 255);

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
    new BlockCore(
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
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 1000,
        y: 590,
        w: 480,
        h: 80,
        color: color(255, 255, 255, 0),
      },
      { isStatic: true, angle: 0.06 }
    )
  );

  blocks.push(
    new PolygonFromSVG(
      world,
      {
        x: 380,
        y: 510,
        w: 685,
        h: 511,
        fromFile: "assets/images/bed.svg",
        scale: 0.95,
        color: color(255, 255, 255, 0),
        image: imgBed,
      },
      { isStatic: true, angle: 0 }
    )
  );

  sensors.push(
    new BlockCore(
      world,
      {
        x: 150,
        y: 100,
        w: 120,
        h: 250,
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
          x: 820 + i * 47,
          y: 500 + i * 6,
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
        y: 600,
        w: 120,
        h: 100,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true }
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 2000,
        y: 415,
        w: 15,
        h: 190,
        color: blockColor,
      },
      { isStatic: true }
    )
  );

  blocks.push(
    new Block(
      world,
      {
        x: 2200,
        y: 480,
        w: 15,
        h: 320,
        color: blockColor,
      },
      { isStatic: true }
    )
  );

  canon = new BlockCore(
    world,
    {
      x: 2100,
      y: 220,
      w: 220,
      h: 70,
      color: blockColor,
    },
    { isStatic: true, angle: canonangle, isSensor: true }
  );

  blocks.push(canon);

  sensors.push(
    new BlockCore(
      world,
      {
        x: 2100,
        y: 540,
        w: 184,
        h: 190,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true }
    )
  );

  canondoor = new BlockCore(
    world,
    {
      x: 2000,
      y: 540,
      w: 15,
      h: 200,
      color: blockColor,
    },
    { isStatic: true }
  );

  blocks.push(canondoor);

  blocks.push(
    new PolygonFromSVG(
      world,
      {
        x: 3100,
        y: 480,
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
        y: 450,
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

  loop_right = new PolygonFromSVG(
    world,
    {
      x: 4400,
      y: 337,
      w: 494,
      h: 449,
      fromFile: "assets/images/Loop_right.svg",
      scale: 0.95,
      color: blockColor,
    },
    { isStatic: true, angle: 0 }
  );

  blocks.push(loop_right);

  loop_left = new PolygonFromSVG(
    world,
    {
      x: 4130,
      y: 1337,
      w: 494,
      h: 449,
      fromFile: "assets/images/Loop_left.svg",
      scale: 0.95,
      color: blockColor,
    },
    { isStatic: true, angle: 0 }
  );

  blocks.push(loop_left);

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
        x: 4280,
        y: 180,
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
        x: 4840,
        y: 508,
        w: 474,
        h: 299,
        fromFile: "assets/images/Jump_pad.svg",
        scale: 0.95,
        color: blockColor,
      },
      { isStatic: true, angle: 0 }
    )
  );
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

function screenEvents() {
  // check if Wollknäuel collided with sensors[0]
  Matter.Events.on(engine, "collisionStart", (event) => {
    let pairs = event.pairs;
    for (const pair of pairs) {
      if (pair.bodyA.label === "Wollknäuel" && pair.bodyB === sensors[0].body) {
        console.log("Collided with sensor 0");

        // Not working
        player.setAutoMove(false, 0);

        setTimeout(function () {
          Body.setAngularVelocity(player.body, 10);
          console.log("inside");
        }, 1);
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
        if (canondooropen == true) {
          canondooropen = false;
        } else {
          canondooropen = true;
        }
      }

      if (
        pair.bodyA.label === "Wollknäuel" &&
        pair.bodyB === sensors[12].body
      ) {
        console.log("Collided with sensor 12");
        player.setAutoMove(false, 0);
        elevatormoving = true;
        canoncanrotate = true;
        setTimeout(function () {
          canondooropen = false;
        }, 2000);
      }

      if (
        pair.bodyA.label === "Wollknäuel" &&
        pair.bodyB === sensors[13].body
      ) {
        console.log("Collided with sensor 13");
        player.setAutoMove(false);
      }

      if (
        pair.bodyA.label === "Wollknäuel" &&
        pair.bodyB === sensors[14].body
      ) {
        console.log("Collided with sensor 13");
        Body.setVelocity(player.body, { x: 24, y: 0 });
      }

      if (
        pair.bodyA.label === "Wollknäuel" &&
        pair.bodyB === sensors[15].body
      ) {
        console.log("Collided with sensor 13");
        if (loop_left.body.position.y >= 1080) {
          Body.setPosition(loop_left.body, { x: 4130, y: 337 });
          Body.setPosition(loop_right.body, { x: 4400, y: 1337 });
        } else {
          Body.setPosition(loop_left.body, { x: 4130, y: 1337 });
          Body.setPosition(loop_right.body, { x: 4400, y: 337 });
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
    if (bodyA.label === PLAYER_LABEL || bodyB.label === PLAYER_LABEL) {
      // isPlayerOnGround = true;
      player.isOnGround = true;
    }
  });

  Matter.Events.on(engine, "collisionEnd", function (event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === PLAYER_LABEL || bodyB.label === PLAYER_LABEL) {
      // isPlayerOnGround = false;
      player.isOnGround = false;
    }
  });
}

function spacePressed() {
  if (keyIsDown(SPACE)) {
    runTimer();

    if (progress > PLAYER_REWIND_THRESHOLD) {
      if (!hasStarted) {
        maxCount = player.positions.length;
        hasStarted = true;
      }

      // console.log(maxCount, player.positions.length);
      if (initiated) {
        player.showBar(true);
        player.rewind();
      }

      if (!isReversing && initiated) {
        Matter.Body.setStatic(player.body, true);
        isReversing = true;
      }
    }
  }
}
