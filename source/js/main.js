//Clears the console
console.clear();
console.log("Starting game...");

//Setup the
const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;
const Composite = Matter.Composite;

let engine;
let runner;
let world;
let mouse;
let isDrag = false;
let poly;

let blocks = [];

let screencounter = 1;
let player;
let playerposition = [{ x: 0, y: 0 }];
let newplayerposition;
let playerrotation = [0];
let newplayerrotation;
let reversing = false;

let lengthvalue = 10;
let imgPlayer;

let canvas;

function preload() {
  imgPlayer = loadImage("./assets/images/Wollball.png");
}

function setup() {
  setupcanvas();
  setupgamefunctions();
  drawplayer();
  drawscreen1();

  Composite.add(world, blocks);

  runner = Runner.create();
  Runner.run(engine);
}

function draw() {
  background(200, 150, 100);
  boundaries();
  getplayerposition();

  Engine.update(engine);
  blocks.forEach((block) => block.draw());
  player.draw();

  mouse.draw();
}

function setupcanvas() {
  canvas = createCanvas(1280, 720);
  canvas.parent("canvas");

  engine = Engine.create();
  engine.pixelDensity = pixelDensity();
  world = engine.world;
}

function setupgamefunctions() {
  mouse = new Mouse(engine, canvas, { stroke: "blue", strokeWeight: 3 });
  mouse.on("startdrag", (evt) => {
    isDrag = true;
  });

  mouse.on("mouseup", (evt) => {
    if (!isDrag) {
      console.log(evt.mouse.position.x, evt.mouse.position.y);
      let ball = new Ball(
        world,
        {
          x: evt.mouse.position.x,
          y: evt.mouse.position.y,
          r: 15,
          color: "yellow",
        },
        { isStatic: false, restitution: 1, label: "Murmel" }
      );
      Matter.Body.applyForce(blocks[0].body, blocks[0].body.position, {
        x: 0,
        y: 2,
      });

      blocks.push(ball);
    }
    isDrag = false;
  });

  mouse.draw();

  document.body.onkeydown = function (e) {
    if (e.code == "Space") {
      // CLEAN UP LATER !!!!
      //loop the code while space is pressed
      reversing = true;
      if (playerposition.length != 1) {
        player.body.isStatic = true;

        Matter.Body.setPosition(
          player.body,
          playerposition[playerposition.length - 1]
        );

        Matter.Body.setAngle(
          player.body,
          playerrotation[playerrotation.length - 1]
        );

        playerrotation.pop();
        playerposition.pop();
      }
    }
  };
}

function drawscreen1() {
  blocks.push(
    new Block(
      world,
      {
        x: 100,
        y: 400,
        w: 500,
        h: 10,
        color: "red",
      },
      { isStatic: true, label: "Block", angle: 0.1 }
    )
  );

  blocks.push(
    new BlockCore(
      world,
      {
        x: windowWidth / 2,
        y: 650,
        w: windowWidth * 4,
        h: 40,
        color: "gray",
      },
      { isStatic: true }
    )
  );
}

function drawscreen2() {
  blocks.push(
    new Block(
      world,
      {
        x: 100,
        y: 400,
        w: 500,
        h: 10,
        color: "blue",
      },
      { isStatic: true, label: "Block", angle: 0.1 }
    )
  );

  blocks.push(
    new BlockCore(
      world,
      {
        x: windowWidth / 2,
        y: 650,
        w: windowWidth * 4,
        h: 40,
        color: "gray",
      },
      { isStatic: true }
    )
  );
}

function boundaries() {
  if (player.body.position.x > 1280) {
    Matter.Body.setPosition(player.body, { x: 300, y: 80 });
    blocks.forEach((block) => {
      block.body.position = { x: -1000, y: -1000 };
    });
    World.remove(world, blocks);
    screencounter++;
    switch (screencounter) {
      case 2:
        drawscreen2();
        break;
      case 3:
        screencounter = 1;
        break;
    }
  }

  if (
    player.body.position.y < 0 ||
    player.body.position.y > 750 ||
    player.body.position.x < 0
  ) {
    playerposition = [{ x: 0, y: 0 }];
    playerrotation = [0];
    Matter.Body.setPosition(player.body, { x: 300, y: 80 });
  }
}

function drawplayer() {
  player = new Ball(
    world,
    {
      x: 300,
      y: 80,
      r: 30,
      color: "blue",
      image: imgPlayer,
      scale: 0.4,
    },
    {
      label: "Wollknäuel",
      isStatic: false,
      density: 0.001,
      restitution: 0.75,
      friction: 0.001,
      frictionAir: 0.005,
      angle: 0,
    }
  );
}

function getplayerposition() {
  newplayerposition = player.body.position;
  const { x: ballX, y: ballY } = newplayerposition;

  newplayerrotation = player.body.angle;

  if (
    (ballX >= playerposition[playerposition.length - 1].x + 0.25 ||
      ballY >= playerposition[playerposition.length - 1].y + 0.25 ||
      ballX <= playerposition[playerposition.length - 1].x - 0.25 ||
      ballY <= playerposition[playerposition.length - 1].y - 0.25) &&
    reversing === false
  ) {
    playerposition.push({ x: ballX, y: ballY });
  }

  if (
    (newplayerrotation <= playerrotation[playerrotation.length - 1] - 0.1 ||
      newplayerrotation >= playerrotation[playerrotation.length - 1] + 0.1) &&
    reversing === false
  ) {
    playerrotation.push(newplayerrotation);
  }
}
