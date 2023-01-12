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
  blockColor = color(255, 0, 255, 100);

  /*blocks.push(
    new Block(
      world,
      {
        x: 310,
        y: 165,
        w: 40,
        h: 10,
        color: blockColor,
      },
      { isStatic: true, angle: 0.15 }
    )
  );*/

  blocks.push(
    new Block(
      world,
      {
        x: 0,
        y: 0,
        w: 10,
        h: 10,
        color: blockColor,
        sound: catsound.play(),
      },
      { isStatic: true, angle: 0 }
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
        color: blockColor,
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
          x: 800 + i * 46,
          y: windowHeight / 2,
          w: 15,
          h: windowHeight * 2,
          color: sensorColor,
        },
        { isStatic: true, isSensor: true }
      )
    );
  }

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
        color: sensorColor,
      },
      { isStatic: true, isSensor: true }
    )
  );

  sensors.push(
    new BlockCore(
      world,
      {
        x: 4170,
        y: 605,
        w: 70,
        h: 70,
        color: sensorColor,
      },
      { isStatic: true, isSensor: true }
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
        soundGuitarAMajor.play();
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
        Body.setVelocity(player.body, { x: 40, y: 0 });
        soundXylophoneC2.play();
      }

      if (
        pair.bodyA.label === "Wollknäuel" &&
        pair.bodyB === sensors[12].body
      ) {
        console.log("Collided with sensor 12");
        isAutoMoving = false;
        Body.setVelocity(sensors[1].body, { x: 10, y: 10 });
        soundXylophoneA2.play();

        setTimeout(function () {
          isAutoMoving = true;
        }, 1000);
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
