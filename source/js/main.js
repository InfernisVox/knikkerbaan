/*TODO LIST:
- Add chain to character
- Add screen change 
- SCREEN SCROLL @RON please first thing even before the chain i dont know naymore tried for an hour
*/

//Clears the console
console.clear();

//Setup the
const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;
const Composite = Matter.Composite;
const Body = Matter.Body;

let engine;
let runner;
let world;
let mouse;
let isDrag = false;
let poly;

let blocks = [];

let carouseloffset = 0;
let player;
let playerposition = [{ x: 300, y: 80 }];
let newplayerposition;
let playerrotation = [0];
let newplayerrotation;
let reversing = false;

let lengthvalue = 10;
let imgPlayer;

let canvas;

function loadingmessage(currentasset) {
  console.clear();
  console.log("Loading assets ... " + currentasset + " / 1");
}

function preload() {
  loadingmessage(0);
  imgPlayer = loadImage("./assets/images/Wollball.png");
  loadingmessage(1);
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
      if (e.repeat) {
        reversing = true;
        if (playerposition.length != 2) {
          Body.setStatic(player.body, true);

          Body.setPosition(
            player.body,
            playerposition[playerposition.length - 1]
          );

          Body.setAngle(player.body, playerrotation[playerrotation.length - 1]);

          playerrotation.pop();
          playerposition.pop();
        } else {
          reversing = false;
        }
      } else {
        Body.setVelocity(player.body, { x: 2, y: 10 });
      }
    }
  };
}

function drawscreen1() {
  blocks.push(
    new Block(
      world,
      {
        x: 100 + carouseloffset,
        y: 400 + carouseloffset,
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
        x: windowWidth / 2 + carouseloffset,
        y: 650 + carouseloffset,
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
        x: 100 + windowWidth + carouseloffset,
        y: 400 + windowWidth + carouseloffset,
        w: 900,
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
        x: windowWidth / 2 + windowWidth + carouseloffset,
        y: 650 + windowWidth + carouseloffset,
        w: windowWidth * 4,
        h: 40,
        color: "yellow",
      },
      { isStatic: true }
    )
  );
}

function boundaries() {
  if (player.body.position.x > 1280) {
    Matter.Body.setPosition(player.body, { x: 300, y: 80 });
    carouseloffset += windowWidth;
    console.log("screen" + carouseloffset / windowWidth);
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
  if (reversing != true) {
    Body.setStatic(player.body, false);
  }

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
