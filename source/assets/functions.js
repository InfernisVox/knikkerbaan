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

  let imgRoom_Src = "./assets/images/room.png";
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

  assetCalc += new Error().lineNumber;
  assetTotal = (assetCalc - 2) / 4 - 1;
  console.log(
    `%c\n-------------------------\nTotal assets loaded: %c${assetTotal}`,
    "color: #7289DA; font-weight: bold;"
  );
}
