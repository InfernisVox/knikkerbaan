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
  playerImage = loadImage(playerImageSrc);
  loadingMessage(1, playerImageSrc);

  let gifelgato_Src = "./assets/images/el_gato.gif";
  gifElGato = loadImage(gifelgato_Src);
  loadingMessage(2, gifelgato_Src);

  let soundCat_Src = "./assets/audio/instruments/cat_sound.mp3";
  soundCat = loadSound(soundCat_Src);
  loadingMessage(3, soundCat_Src);

  let soundGuitarAMajor_Src = "./assets/audio/instruments/amajor.wav";
  soundGuitarAMajor = loadSound(soundGuitarAMajor_Src);
  loadingMessage(3, soundGuitarAMajor_Src);

  let soundXylophoneA1_Src = "./assets/audio/instruments/A1.mp3";
  soundXylophoneA1 = loadSound(soundXylophoneA1_Src);
  loadingMessage(4, soundXylophoneA1_Src);

  let soundXylophoneB1_Src = "./assets/audio/instruments/B1.mp3";
  soundXylophoneB1 = loadSound(soundXylophoneB1_Src);
  loadingMessage(5, soundXylophoneB1_Src);

  let soundXylophoneC1_Src = "./assets/audio/instruments/C1.mp3";
  soundXylophoneC1 = loadSound(soundXylophoneC1_Src);
  loadingMessage(6, soundXylophoneC1_Src);

  let soundXylophoneD1_Src = "./assets/audio/instruments/D1.mp3";
  soundXylophoneD1 = loadSound(soundXylophoneD1_Src);
  loadingMessage(7, soundXylophoneD1_Src);

  let soundXylophoneE1_Src = "./assets/audio/instruments/E1.mp3";
  soundXylophoneE1 = loadSound(soundXylophoneE1_Src);
  loadingMessage(8, soundXylophoneE1_Src);

  let soundXylophoneF1_Src = "./assets/audio/instruments/F1.mp3";
  soundXylophoneF1 = loadSound(soundXylophoneF1_Src);
  loadingMessage(9, soundXylophoneF1_Src);

  let soundXylophoneG1_Src = "./assets/audio/instruments/G1.mp3";
  soundXylophoneG1 = loadSound(soundXylophoneG1_Src);
  loadingMessage(10, soundXylophoneG1_Src);

  let soundXylophoneA2_Src = "./assets/audio/instruments/A2.mp3";
  soundXylophoneA2 = loadSound(soundXylophoneA2_Src);
  loadingMessage(11, soundXylophoneA2_Src);

  let soundXylophoneB2_Src = "./assets/audio/instruments/B2.mp3";
  soundXylophoneB2 = loadSound(soundXylophoneB2_Src);
  loadingMessage(12, soundXylophoneB2_Src);

  let soundXylophoneC2_Src = "./assets/audio/instruments/C2.mp3";
  soundXylophoneC2 = loadSound(soundXylophoneC2_Src);
  loadingMessage(13, soundXylophoneC2_Src);

  let imgRoom_Src = "./assets/images/wallpaper.png";
  imgRoom = loadImage(imgRoom_Src);
  loadingMessage(14, imgRoom_Src);

  let imgBed_Src = "./assets/images/bed.png";
  imgBed = loadImage(imgBed_Src);
  loadingMessage(15, imgBed_Src);

  let imgXylophone_Src = "./assets/images/xylophone.png";
  imgXylophone = loadImage(imgXylophone_Src);
  loadingMessage(16, imgXylophone_Src);

  let imgWall_Src = "./assets/images/monawall.png";
  imgWall = loadImage(imgWall_Src);
  loadingMessage(17, imgWall_Src);

  let imgTowerDoor_Src = "./assets/images/tower_door.png";
  imgTowerDoor = loadImage(imgTowerDoor_Src);
  loadingMessage(18, imgTowerDoor_Src);

  let imgTowerFg_Src = "./assets/images/tower_fg.png";
  imgTowerFg = loadImage(imgTowerFg_Src);
  loadingMessage(19, imgTowerFg_Src);

  let imgTowerBg_Src = "./assets/images/tower_bg.png";
  imgTowerBg = loadImage(imgTowerBg_Src);
  loadingMessage(20, imgTowerBg_Src);

  let imgButtonPressed_Src = "./assets/images/button_pressed.png";
  imgButtonPressed = loadImage(imgButtonPressed_Src);
  loadingMessage(21, imgButtonPressed_Src);

  let imgButtonReleased_Src = "./assets/images/button_unpressed.png";
  imgButtonReleased = loadImage(imgButtonReleased_Src);
  loadingMessage(22, imgButtonReleased_Src);

  let imgCannonBase_Src = "./assets/images/cannon_base.png";
  imgCannonBase = loadImage(imgCannonBase_Src);
  loadingMessage(23, imgCannonBase_Src);

  let imgCannon_Src = "./assets/images/cannon.png";
  imgCannon = loadImage(imgCannon_Src);
  loadingMessage(24, imgCannon_Src);

  let imgBaseballGlove_Src = "./assets/images/baseballglove.png";
  imgBaseballGlove = loadImage(imgBaseballGlove_Src);
  loadingMessage(25, imgBaseballGlove_Src);

  let gifRewind_Src = "./assets/images/rewind.gif";
  gifRewind = loadImage(gifRewind_Src);
  loadingMessage(26, gifRewind_Src);

  let soundRewind_Src = "./assets/audio/rewind.wav";
  soundRewind = loadSound(soundRewind_Src);
  loadingMessage(27, soundRewind_Src);

  let imgElevator_Src = "./assets/images/elevator.png";
  imgElevator = loadImage(imgElevator_Src);
  loadingMessage(28, imgElevator_Src);

  let imgRocket_Src = "./assets/images/rocket.png";
  imgRocket = loadImage(imgRocket_Src);
  loadingMessage(29, imgRocket_Src);

  let soundButton_Src = "./assets/audio/buttonactivate.wav";
  soundButton = loadSound(soundButton_Src);
  loadingMessage(31, soundButton_Src);

  let soundElevator_Src = "./assets/audio/elevatorsound.wav";
  soundElevator = loadSound(soundElevator_Src);
  loadingMessage(32, soundElevator_Src);

  let soundBaseballglove_Src = "./assets/audio/baseballglove.wav";
  soundBaseballglove = loadSound(soundBaseballglove_Src);
  loadingMessage(33, soundBaseballglove_Src);

  let soundWoolball_Src = "./assets/audio/woolball.wav";
  soundWoolball = loadSound(soundWoolball_Src);
  loadingMessage(34, soundWoolball_Src);

  let soundCanonshoot_Src = "./assets/audio/canonshoot.wav";
  soundCanonshoot = loadSound(soundCanonshoot_Src);
  loadingMessage(35, soundCanonshoot_Src);

  let soundKapow_Src = "./assets/audio/kapow.wav";
  soundKapow = loadSound(soundKapow_Src);
  loadingMessage(36, soundKapow_Src);

  let soundAcceleration_Src = "./assets/audio/acceleration.wav";
  soundAcceleration = loadSound(soundAcceleration_Src);
  loadingMessage(37, soundAcceleration_Src);

  let soundRocket_Src = "./assets/audio/rocket.wav";
  soundRocket = loadSound(soundRocket_Src);
  loadingMessage(38, soundRocket_Src);

  let imgPushbox_src = "./assets/images/pushablebox.png";
  imgPushbox = loadImage(imgPushbox_src);
  loadingMessage(39, imgPushbox_src);

  let gifRewindOverlay_Src = "./assets/images/rewind_overlay.gif";
  gifRewindOverlay = loadImage(gifRewindOverlay_Src);
  loadingMessage(26, gifRewindOverlay_Src);

  assetCalc += new Error().lineNumber;
  assetTotal = (assetCalc - 2) / 4 - 1;
  console.log(
    `%c\n-------------------------\nTotal assets loaded: %c${assetTotal}`,
    "color: #7289DA; font-weight: bold;"
  );
}
