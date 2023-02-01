function resetCannon() {
  cannonAngle = 0.33;
  cannonIsReversing = false;
  cannonCanRotate = false;
  cannonDoorIsOpen = true;
  cannonHasBeenLoaded = false;
  cannonHasBeenFired = false;
  cannonElevatorIsMoving = false;

  Matter.Body.setAngle(cannon.body, cannonAngle);
  Matter.Body.setPosition(cannonElevator.body, {
    x: 2095,
    y: windowHeight + 140,
  });
}

function rotateCannon() {
  if (cannonCanRotate) {
    if (cannonAngle >= 0.33) {
      cannonIsReversing = true;
    } else if (cannonAngle <= -0.65) {
      cannonIsReversing = false;
    }

    if (cannonIsReversing) {
      cannonAngle -= 0.005;
    } else {
      cannonAngle += 0.005;
    }

    Body.setAngle(cannon.body, cannonAngle);
  }
}

function loadCannon() {
  if (cannonElevatorIsMoving) {
    if (cannonElevator.body.position.y >= 510) {
      Body.setPosition(cannonElevator.body, {
        x: cannonElevator.body.position.x,
        y: cannonElevator.body.position.y - 0.95,
      });
    } else {
      if (!cannonHasBeenLoaded) {
        cannonHasBeenLoaded = true;
        cannon.attributes.image = imgCannonActivated;
        player.recordedData = [];

        Body.setPosition(player.body, {
          x: cannon.body.position.x,
          y: cannon.body.position.y,
        });
        Matter.Body.setStatic(player.body, true);

        player.onSpacePress = MarbleRun.mapSpacePressTo(
          SpaceMapping.CANNON_FIRE
        );
        player.onSpaceHold = MarbleRun.mapSpaceHoldTo(SpaceMapping.EMPTY);
      }
    }
  }
}

function setCannonButton() {
  if (cannonDoorIsOpen) {
    image(imgButtonReleased, 1550, 661, 96, 34);
    Body.setPosition(cannonDoor.body, {
      x: cannonDoor.body.position.x,
      y: 1540,
    });
  } else {
    image(imgButtonPressed, 1550, 665, 97, 28);
    Body.setPosition(cannonDoor.body, {
      x: cannonDoor.body.position.x,
      y: 650,
    });
  }
}
