// @ts-check
"use strict";

let assetCalc = null;
let assetTotal = null;

/** @type {SoundFile} */ let soundGuitarAMajor;
/** @type {SoundFile} */ let soundXylophoneA1;
/** @type {SoundFile} */ let soundXylophoneB1;
/** @type {SoundFile} */ let soundXylophoneC1;
/** @type {SoundFile} */ let soundXylophoneD1;
/** @type {SoundFile} */ let soundXylophoneE1;
/** @type {SoundFile} */ let soundXylophoneF1;
/** @type {SoundFile} */ let soundXylophoneG1;
/** @type {SoundFile} */ let soundXylophoneA2;
/** @type {SoundFile} */ let soundXylophoneB2;
/** @type {SoundFile} */ let soundXylophoneC2;
/** @type {SoundFile} */ let soundCat;
/** @type {SoundFile} */ let soundRewind;
/** @type {SoundFile} */ let soundButton;
/** @type {SoundFile} */ let soundElevator;
/** @type {SoundFile} */ let soundBaseballglove;
/** @type {SoundFile} */ let soundWoolball;
/** @type {SoundFile} */ let soundCanonshoot;
/** @type {SoundFile} */ let soundKapow;
/** @type {SoundFile} */ let soundAcceleration;
/** @type {SoundFile} */ let soundRocket;

function loadAssets() {
  //Only for loading assets, no adding empty lines or comments
  // @ts-ignore
  assetCalc = -new Error().lineNumber;

  let playerImageSrc = "./assets/images/Wollball.png";
  imgPlayer = loadImage(playerImageSrc);
  loadingMessage(playerImageSrc);

  let gifelgato_Src = "./assets/images/el_gato.gif";
  gifElGato = loadImage(gifelgato_Src);
  loadingMessage(gifelgato_Src);

  let soundCat_Src = "./assets/audio/instruments/cat_sound.mp3";
  soundCat = loadSound(soundCat_Src);
  loadingMessage(soundCat_Src);

  let soundXylophoneA1_Src = "./assets/audio/instruments/A1.mp3";
  soundXylophoneA1 = loadSound(soundXylophoneA1_Src);
  loadingMessage(soundXylophoneA1_Src);

  let soundXylophoneB1_Src = "./assets/audio/instruments/B1.mp3";
  soundXylophoneB1 = loadSound(soundXylophoneB1_Src);
  loadingMessage(soundXylophoneB1_Src);

  let soundXylophoneC1_Src = "./assets/audio/instruments/C1.mp3";
  soundXylophoneC1 = loadSound(soundXylophoneC1_Src);
  loadingMessage(soundXylophoneC1_Src);

  let soundXylophoneD1_Src = "./assets/audio/instruments/D1.mp3";
  soundXylophoneD1 = loadSound(soundXylophoneD1_Src);
  loadingMessage(soundXylophoneD1_Src);

  let soundXylophoneE1_Src = "./assets/audio/instruments/E1.mp3";
  soundXylophoneE1 = loadSound(soundXylophoneE1_Src);
  loadingMessage(soundXylophoneE1_Src);

  let soundXylophoneF1_Src = "./assets/audio/instruments/F1.mp3";
  soundXylophoneF1 = loadSound(soundXylophoneF1_Src);
  loadingMessage(soundXylophoneF1_Src);

  let soundXylophoneG1_Src = "./assets/audio/instruments/G1.mp3";
  soundXylophoneG1 = loadSound(soundXylophoneG1_Src);
  loadingMessage(soundXylophoneG1_Src);

  let soundXylophoneA2_Src = "./assets/audio/instruments/A2.mp3";
  soundXylophoneA2 = loadSound(soundXylophoneA2_Src);
  loadingMessage(soundXylophoneA2_Src);

  let soundXylophoneB2_Src = "./assets/audio/instruments/B2.mp3";
  soundXylophoneB2 = loadSound(soundXylophoneB2_Src);
  loadingMessage(soundXylophoneB2_Src);

  let soundXylophoneC2_Src = "./assets/audio/instruments/C2.mp3";
  soundXylophoneC2 = loadSound(soundXylophoneC2_Src);
  loadingMessage(soundXylophoneC2_Src);

  let imgRoom_Src = "./assets/images/wallpaper.png";
  imgRoom = loadImage(imgRoom_Src);
  loadingMessage(imgRoom_Src);

  let imgBed_Src = "./assets/images/bed.png";
  imgBed = loadImage(imgBed_Src);
  loadingMessage(imgBed_Src);

  let imgXylophone_Src = "./assets/images/xylophone.png";
  imgXylophone = loadImage(imgXylophone_Src);
  loadingMessage(imgXylophone_Src);

  let imgTowerDoor_Src = "./assets/images/tower_door.png";
  imgTowerDoor = loadImage(imgTowerDoor_Src);
  loadingMessage(imgTowerDoor_Src);

  let imgTowerFg_Src = "./assets/images/tower_fg.png";
  imgTowerFg = loadImage(imgTowerFg_Src);
  loadingMessage(imgTowerFg_Src);

  let imgTowerBg_Src = "./assets/images/tower_bg.png";
  imgTowerBg = loadImage(imgTowerBg_Src);
  loadingMessage(imgTowerBg_Src);

  let imgButtonPressed_Src = "./assets/images/button_pressed.png";
  imgButtonPressed = loadImage(imgButtonPressed_Src);
  loadingMessage(imgButtonPressed_Src);

  let imgButtonReleased_Src = "./assets/images/button_unpressed.png";
  imgButtonReleased = loadImage(imgButtonReleased_Src);
  loadingMessage(imgButtonReleased_Src);

  let imgCannonBase_Src = "./assets/images/cannon_base.png";
  imgCannonBase = loadImage(imgCannonBase_Src);
  loadingMessage(imgCannonBase_Src);

  let imgCannon_Src = "./assets/images/cannon.png";
  imgCannon = loadImage(imgCannon_Src);
  loadingMessage(imgCannon_Src);

  let imgBaseballGlove_Src = "./assets/images/baseballglove.png";
  imgBaseballGlove = loadImage(imgBaseballGlove_Src);
  loadingMessage(imgBaseballGlove_Src);

  let gifRewind_Src = "./assets/images/rewind-min.gif";
  gifRewind = loadImage(gifRewind_Src);
  loadingMessage(gifRewind_Src);

  let soundRewind_Src = "./assets/audio/rewind.wav";
  soundRewind = loadSound(soundRewind_Src);
  loadingMessage(soundRewind_Src);

  let imgElevator_Src = "./assets/images/elevator.png";
  imgElevator = loadImage(imgElevator_Src);
  loadingMessage(imgElevator_Src);

  let imgRocket_Src = "./assets/images/rocket.png";
  imgRocket = loadImage(imgRocket_Src);
  loadingMessage(imgRocket_Src);

  let soundButton_Src = "./assets/audio/buttonactivate.wav";
  soundButton = loadSound(soundButton_Src);
  loadingMessage(soundButton_Src);

  let soundElevator_Src = "./assets/audio/elevatorsound.wav";
  soundElevator = loadSound(soundElevator_Src);
  loadingMessage(soundElevator_Src);

  let soundBaseballglove_Src = "./assets/audio/baseballglove.wav";
  soundBaseballglove = loadSound(soundBaseballglove_Src);
  loadingMessage(soundBaseballglove_Src);

  let soundWoolball_Src = "./assets/audio/woolball.wav";
  soundWoolball = loadSound(soundWoolball_Src);
  loadingMessage(soundWoolball_Src);

  let soundCanonshoot_Src = "./assets/audio/canonshoot.wav";
  soundCanonshoot = loadSound(soundCanonshoot_Src);
  loadingMessage(soundCanonshoot_Src);

  let soundKapow_Src = "./assets/audio/kapow.wav";
  soundKapow = loadSound(soundKapow_Src);
  loadingMessage(soundKapow_Src);

  let soundAcceleration_Src = "./assets/audio/acceleration.wav";
  soundAcceleration = loadSound(soundAcceleration_Src);
  loadingMessage(soundAcceleration_Src);

  let soundRocket_Src = "./assets/audio/rocket.wav";
  soundRocket = loadSound(soundRocket_Src);
  loadingMessage(soundRocket_Src);

  let imgPushbox_src = "./assets/images/pushablebox.png";
  imgPushbox = loadImage(imgPushbox_src);
  loadingMessage(imgPushbox_src);

  let imgBallpitBg_src = "./assets/images/ballpit_bg.png";
  imgBallPitBg = loadImage(imgBallpitBg_src);
  loadingMessage(imgBallpitBg_src);

  let imgBallpitFg_src = "./assets/images/ballpit_fg.png";
  imgBallPitFg = loadImage(imgBallpitFg_src);
  loadingMessage(imgBallpitFg_src);

  let gifRewindOverlay_src = "./assets/images/rewind_overlay.gif";
  gifRewindOverlay = loadImage(gifRewindOverlay_src);
  loadingMessage(gifRewindOverlay_src);

  let imgcoldWheels_src = "./assets/images/coldwheels.png";
  imgColdWheels = loadImage(imgcoldWheels_src);
  loadingMessage(imgcoldWheels_src);

  let imgCannonActivated_src = "./assets/images/cannon_activated.png";
  imgCannonActivated = loadImage(imgCannonActivated_src);
  loadingMessage(imgCannonActivated_src);

  let imgLandingPad_src = "./assets/images/landingpad.png";
  imgLandingPad = loadImage(imgLandingPad_src);
  loadingMessage(imgLandingPad_src);

  let imgJumpPad_src = "./assets/images/jumppad.png";
  imgJumpPad = loadImage(imgJumpPad_src);
  loadingMessage(imgJumpPad_src);

  let soundSoundtrack_src = "./assets/audio/soundtrack.wav";
  soundSoundtrack = loadSound(soundSoundtrack_src);
  loadingMessage(soundSoundtrack_src);

  let imgFgBoxStar_src = "./assets/images/fg_boxstar.png";
  imgFgBoxStar = loadImage(imgFgBoxStar_src);
  loadingMessage(imgFgBoxStar_src);

  let imgFgBoxHeart_src = "./assets/images/fg_boxheart.png";
  imgFgBoxHeart = loadImage(imgFgBoxHeart_src);
  loadingMessage(imgFgBoxHeart_src);

  let imgCarwheel_src = "./assets/images/carwheel.png";
  imgCarwheel = loadImage(imgCarwheel_src);
  loadingMessage(imgCarwheel_src);

  let imgCarbody_src = "./assets/images/carbody.png";
  imgCarbody = loadImage(imgCarbody_src);
  loadingMessage(imgCarbody_src);

  let imgFgCarbody_src = "./assets/images/fg_carbody.png";
  imgFgCarbody = loadImage(imgFgCarbody_src);
  loadingMessage(imgFgCarbody_src);

  let imgRamp_src = "./assets/images/ramp.png";
  imgRamp = loadImage(imgRamp_src);
  loadingMessage(imgRamp_src);

  let imgLoop1_src = "./assets/images/loop1.png";
  imgLoop1 = loadImage(imgLoop1_src);
  loadingMessage(imgLoop1_src);

  let imgLoop2_src = "./assets/images/loop2.png";
  imgLoop2 = loadImage(imgLoop2_src);
  loadingMessage(imgLoop2_src);

  let imgFgBaseball_src = "./assets/images/fg_baseball.png";
  imgFgBaseball = loadImage(imgFgBaseball_src);
  loadingMessage(imgFgBaseball_src);

  let imgStepstool_src = "./assets/images/stepstool.png";
  imgStepstool = loadImage(imgStepstool_src);
  loadingMessage(imgStepstool_src);

  let imgFgBaseballbat_src = "./assets/images/fg_baseballbat.png";
  imgFgBaseballbat = loadImage(imgFgBaseballbat_src);
  loadingMessage(imgFgBaseballbat_src);

  let imgFgSucculente_src = "./assets/images/fg_succulente.png";
  imgFgSucculente = loadImage(imgFgSucculente_src);
  loadingMessage(imgFgSucculente_src);

  let imgColdWheelsFast_src = "./assets/images/coldwheelsfast.png";
  imgColdWheelsFast = loadImage(imgColdWheelsFast_src);
  loadingMessage(imgColdWheelsFast_src);

  let imgWall_src = "./assets/images/wall.png";
  imgWall = loadImage(imgWall_src);
  loadingMessage(imgWall_src);

  let imgFloor_src = "./assets/images/floor.png";
  imgFloor = loadImage(imgFloor_src);
  loadingMessage(imgFloor_src);

  let imgSkateboard_src = "./assets/images/skateboard.png";
  imgSkateboard = loadImage(imgSkateboard_src);
  loadingMessage(imgSkateboard_src);

  assetCalc += new Error().lineNumber;
  assetTotal = (assetCalc - 2) / 4;
  console.log(
    `%c\n-------------------------\nTotal assets loaded: %c${assetTotal}`,
    "color: #7289DA; font-weight: bold;"
  );
}
