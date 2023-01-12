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
        x: 300,
        y: 500,
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
