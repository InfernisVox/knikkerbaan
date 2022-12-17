/**
Creates a basic class to hold a new rigid body model with a rectangular hull. <br/>
<br/>
This class allows the block <br/>
- to be drawn with various attributes <br/>
- to be placed as a rectangle "block" in the world as a physical Matter body <br/>

@param {world} world - The Matter.js world object
@param {object} attributes - Visual properties e.g. position, dimensions and color
@param {object} [options] - Defines the behaviour e.g. mass, bouncyness or whether it can move

@tutorial
XX - Benno Step 7
<a target="_blank" href="https://b-g.github.io/p5-matter-examples/xx-benno-step7/">Open example</a>
,
<a target="_blank" href="https://github.com/b-g/p5-matter-examples/blob/master/xx-benno-step7/sketch.js">open code</a>
*/

export default class BlockCore {
  constructor(world, attributes, options) {
    this.world = world;
    this.attributes = attributes;
    this.options = options || {};
    this.options.plugin = this.options.plugin || {};
    this.options.plugin.block = this;
    this.addBody();
    if (this.body) {
      Matter.World.add(this.world, this.body);
      if (this.options.restitution) {
        this.body.restitution = this.options.restitution;
      }
    }
  }

  addBody() {
    this.body = Matter.Bodies.rectangle(
      this.attributes.x,
      this.attributes.y,
      this.attributes.w,
      this.attributes.h,
      this.options
    );
  }

  /**
   * Draws the matter body to the p5 canvas
   * @memberof BlockCore
   */
  draw(p5) {
    if (this.body) {
      if (this.attributes.color) {
        p5.fill(this.attributes.color);
      } else {
        p5.noFill();
      }
      if (this.attributes.stroke) {
        stroke(this.attributes.stroke);
        if (this.attributes.weight) {
          p5.strokeWeight(this.attributes.weight);
        }
      } else {
        p5.noStroke();
      }
      this.drawBody(p5);
    }
  }

  drawBody(p5) {
    if (this.body.parts && this.body.parts.length > 1) {
      // skip index 0
      for (let p = 1; p < this.body.parts.length; p++) {
        this.drawVertices(p5, this.body.parts[p].vertices);
      }
    } else {
      if (this.body.type == "composite") {
        for (let body of this.body.bodies) {
          this.drawVertices(p5, body.vertices);
        }
      } else {
        this.drawVertices(p5, this.body.vertices);
      }
    }
  }

  drawVertices(p5, vertices) {
    p5.beginShape();
    for (const vertice of vertices) {
      p5.vertex(vertice.x, vertice.y);
    }
    p5.endShape(p5.CLOSE);
  }
}
