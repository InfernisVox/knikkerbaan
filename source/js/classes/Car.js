// @ts-check
"use strict";

function carReleased() {
  if (
    playerCurrentMapping.hold === SpaceMapping.CAR_REWIND &&
    !isNull(carProgressValue)
  ) {
    let x = map(carProgressValue, 0, 100, 200, 2000);

    if (!player.isRecording) player.isRecording = true;
    if (!carHasBeenReleased) carHasBeenReleased = true;
    if (carHasToBeReset) carHasToBeReset = false;

    player.onSpaceHold = MarbleRun.mapSpaceHoldTo(SpaceMapping.EMPTY);

    Body.setVelocity(carBody.body, { x: x, y: 0 });
    Body.setStatic(carBody.body, false);

    carProgressValue = null;
  }
}

/**
 *
 * @param {() => void} callback
 */
function ifCarStandsStill(callback) {
  if (
    (player.body.velocity.x <= 0 && player.body.velocity.y <= 0.28) ||
    (carBody.body.velocity.x <= 0 && carBody.body.velocity.y <= 0.28) ||
    player.isOnGround
  ) {
    if (carHasBeenReleased && !playerHasMadeTheLooping) {
      if (!carHasToBeReset) {
        carHasToBeReset = true;
        callback();
      }
    }
  }
}
