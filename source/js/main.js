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
let ballposition = [{ x: 0, y: 0 }];
let newballposition;
let reversing = false;

let lengthvalue = 10;
let imgBall;

let canvas;

function preload() {
  imgBall = loadImage("./assets/images/Wollball.png");
}

function setup() {
  setupcanvas();
  setupgamefunctions();
  drawworld();

  Composite.add(world, blocks);

  runner = Runner.create();
  Runner.run(engine);
}

function draw() {
  background(200, 150, 100);

  blocks.forEach((block) => {
    if (block.body.label === "Wollknäuel") {
      newballposition = block.body.position;
      const { x: ballX, y: ballY } = newballposition;

      if (
        (ballX >= ballposition[ballposition.length - 1].x + 1 ||
          ballY >= ballposition[ballposition.length - 1].y + 1 ||
          ballX <= ballposition[ballposition.length - 1].x - 1 ||
          ballY <= ballposition[ballposition.length - 1].y - 1) &&
        reversing === false
      ) {
        ballposition.push({ x: ballX, y: ballY });
        console.log(ballposition);
      }
    }
  });

  Engine.update(engine);
  blocks.forEach((block) => block.draw());

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

  mouse.draw();

  document.body.onkeydown = function (e) {
    if (e.code == "Space") {
      // CLEAN UP LATER !!!!
      //loop the code while space is pressed
      reversing = true;
      blocks.forEach((block) => {
        if (block.body.label === "Wollknäuel") {
          if (ballposition.length != 1) {
            block.body.isStatic = true;
            Matter.Body.setPosition(
              block.body,
              ballposition[ballposition.length - 1]
            );
            ballposition.pop();
          }
        }
      });
    } else {
      reversing = false;
    }
  };
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
        label: "Wollknäuel",
        isStatic: false,
        density: 0.001,
        restitution: 0.75,
        friction: 0.001,
        frictionAir: 0.005,
      }
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
