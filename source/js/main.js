import P5 from "./core/P5.js";
import Boundary from "./Boundary.js";
import Marble from "./Marble.js";

console.clear();

let engine, world, runner;
let marbles = [],
  boundaries = [];

const cv = new P5(1280, 720, { setup, draw }, "canvas"),
  p5 = cv.instance,
  Engine = Matter.Engine,
  Runner = Matter.Runner;

// function preload() {}
function setup() {
  const canvas = p5.createCanvas(cv.width, cv.height);
  canvas.mousePressed(mousePressed);

  engine = Engine.create();
  engine.pixelDensity = p5.pixelDensity();

  world = engine.world;

  boundaries.push(
    new Boundary(
      world,
      { x: p5.width / 2 - 200, y: p5.height / 2, w: p5.width * 0.4, h: 15 },
      { angle: 0.3 }
    ),
    new Boundary(
      world,
      { x: p5.width / 2, y: p5.height * 0.95, w: p5.width * 0.8, h: 15 },
      { angle: -0.3 }
    )
  );

  marbles.push(new Marble(world, { x: 225, y: 100, r: 15 }));

  runner = Runner.create();
  Runner.run(runner, engine);
}

function draw() {
  p5.background(250);
  Engine.update(engine);

  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].show(p5);
  }

  for (let i = 0; i < marbles.length; i++) {
    marbles[i].show(p5);
    if (marbles[i].isOffScreen(p5)) {
      marbles[i].removeItselfFrom(world);

      marbles.splice(i, 1);
      i--;
    }
  }

  // console.log(marbles.length, world.bodies.length);
}

function mousePressed() {
  marbles.push(
    new Marble(world, { x: p5.mouseX, y: p5.mouseY, r: p5.random(10, 20) })
  );
}
