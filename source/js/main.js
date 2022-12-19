//Clears the console
console.clear();

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

let canvaswidth;
let lengthvalue = 10;
let imgBall;

function preload() {
  imgBall = loadImage("./assets/images/Wollball.png");
}

function setup() {
  setupcanvas();
  setupgamefunctions();
  drawworld();

  blocks.push(
    new Ball(
      world,
      {
        x: 300,
        y: 80,
        r: 30,
        color: "blue",
        image: imgBall,
        scale: 0.4,
      },
      {
        label: "Murmel",
        isStatic: false,
        density: 0.001,
        restitution: 0.75,
        friction: 0.0,
        frictionAir: 0.0,
      }
    )
  );

  blocks.push(
    new BlockCore(
      world,
      {
        x: windowWidth / 2,
        y: 650,
        w: windowWidth,
        h: 40,
        color: "gray",
        //force: { x: 0.0001, y: -0.0001 },
      },
      { isStatic: true }
    )
  );

  Composite.add(world, blocks);

  /*blocks.push(
    new PolygonFromSVG(
      world,
      {
        x: 400,
        y: 400,
        fromFile: "./assets/img/Wollball.svg",
        scale: 0.6,
        color: "white",
        image: imgBall,
      },
      { isStatic: false, friction: 0.0 }
    )
  );*/

  runner = Runner.create();
  Runner.run(engine);
}

function draw() {
  background(200);
  ellipse(100, 100, 100, 100);

  Engine.update(engine);
  blocks.forEach((block) => block.draw());
}

function setupcanvas() {
  if (windowWidth < 1280) {
    canvaswidth = windowWidth - 20;
  } else {
    canvaswidth = 1280;
  }

  const canvas = createCanvas(canvaswidth, 720);
  canvas.parent("canvas");

  engine = Engine.create();
  world = engine.world;
}

function setupgamefunctions() {
  blocks.push(
    new Ball(
      world,
      {
        x: 100,
        y: 100,
        r: 15,
        color: "yellow",
      },
      { isStatic: false, restitution: 1, label: "Murmel" }
    )
  );

  mouse = new Mouse(engine, canvas, { stroke: "blue", strokeWeight: 3 });
  mouse.on("startdrag", (evt) => {
    isDrag = true;
  });

  mouse.on("mouseup", (evt) => {
    if (!isDrag) {
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
      ball.constrainTo(null, {
        pointA: { x: 0, y: 0 },
        pointB: { x: evt.mouse.position.x, y: evt.mouse.position.y },
        length: lengthvalue,
        stiffness: 1,
        draw: true,
        color: "red",
        width: 10,
      });

      blocks.push(ball);
    }
    isDrag = false;
  });
}

function drawworld() {
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
  mouse.draw();
}
