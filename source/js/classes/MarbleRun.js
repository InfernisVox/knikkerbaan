class MarbleRun {
  /**
   * The factory that returns the function that will be mapped onto single mouse buttons
   * @param {Player} player
   * @param {number} factoryFlag
   * @returns {() => any}
   */
  static mapSpaceKeyOfTo(player, factoryFlag) {
    switch (factoryFlag) {
      case FactoryFlag.SINGLE_JUMP: {
        return () => {
          if (!player.spaceHasBeenPressed) {
            Matter.Body.applyForce(
              player.body,
              { x: player.body.position.x, y: player.body.position.y },
              {
                x: 0.075,
                y: -0.15,
              }
            );
          }
        };
      }
    }
  }

  constructor() {
    this.hasBeenStarted = false;
  }
}
