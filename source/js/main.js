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

function preload() {}

function setup() {
  setupcanvas();
  setupgamefunctions();
  drawworld();

  Composite.add(world, blocks);

  runner = Runner.create();
  Runner.run(engine);
}

function draw() {
  ellipse(100, 100, 100, 100);
  background(50);
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
      blocks.push(ball);
    }
    isDrag = false;
  });
}

function drawworld() {}
