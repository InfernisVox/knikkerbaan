// @ts-check
"use strict";

function loadAssets() {
  //Only for loading assets, no adding empty lines or comments
  // @ts-ignore
  assetCalc = -new Error().lineNumber;

  // TODO: Dynamic implementation needed to save lines of code
  let playerImageSrc = "./assets/images/Wollball.png";
  playerImage = loadImage(playerImageSrc);
  loadingMessage(1, playerImageSrc);

  let gifPsychedelic_Src = "./assets/images/psychedelic.gif";
  gifPsychedelic = loadImage(gifPsychedelic_Src);
  loadingMessage(2, gifPsychedelic_Src);

  let gifelgato_Src = "./assets/images/el_gato.gif";
  gifelgato = loadImage(gifelgato_Src);
  loadingMessage(2, gifelgato_Src);

  let catsound_Src = "./assets/audio/instruments/cat_sound.mp3";
  catsound = loadSound(catsound_Src);
  loadingMessage(3, catsound_Src);

  let soundGuitarAMajor_Src = "./assets/audio/instruments/amajor.wav";
  soundGuitarAMajor = loadSound(soundGuitarAMajor_Src);
  loadingMessage(3, soundGuitarAMajor_Src);

  let soundXylophoneA1_Src = "./assets/audio/instruments/A1.mp3";
  soundXylophoneA1 = loadSound(soundXylophoneA1_Src);
  loadingMessage(4, soundXylophoneA1_Src);

  let soundXylophoneB1_Src = "./assets/audio/instruments/B1.mp3";
  soundXylophoneB1 = loadSound(soundXylophoneB1_Src);
  loadingMessage(4, soundXylophoneB1_Src);

  let soundXylophoneC1_Src = "./assets/audio/instruments/C1.mp3";
  soundXylophoneC1 = loadSound(soundXylophoneC1_Src);
  loadingMessage(4, soundXylophoneC1_Src);

  let soundXylophoneD1_Src = "./assets/audio/instruments/D1.mp3";
  soundXylophoneD1 = loadSound(soundXylophoneD1_Src);
  loadingMessage(4, soundXylophoneD1_Src);

  let soundXylophoneE1_Src = "./assets/audio/instruments/E1.mp3";
  soundXylophoneE1 = loadSound(soundXylophoneE1_Src);
  loadingMessage(4, soundXylophoneE1_Src);

  let soundXylophoneF1_Src = "./assets/audio/instruments/F1.mp3";
  soundXylophoneF1 = loadSound(soundXylophoneF1_Src);
  loadingMessage(4, soundXylophoneF1_Src);

  let soundXylophoneG1_Src = "./assets/audio/instruments/G1.mp3";
  soundXylophoneG1 = loadSound(soundXylophoneG1_Src);
  loadingMessage(4, soundXylophoneG1_Src);

  let soundXylophoneA2_Src = "./assets/audio/instruments/A2.mp3";
  soundXylophoneA2 = loadSound(soundXylophoneA2_Src);
  loadingMessage(5, soundXylophoneA2_Src);

  let soundXylophoneB2_Src = "./assets/audio/instruments/B2.mp3";
  soundXylophoneB2 = loadSound(soundXylophoneB2_Src);
  loadingMessage(4, soundXylophoneB2_Src);

  let soundXylophoneC2_Src = "./assets/audio/instruments/C2.mp3";
  soundXylophoneC2 = loadSound(soundXylophoneC2_Src);
  loadingMessage(4, soundXylophoneC2_Src);

  let imgRoom_Src = "./assets/images/room.png";
  imgRoom = loadImage(imgRoom_Src);
  loadingMessage(6, imgRoom_Src);

  let imgBed_Src = "./assets/images/bed.png";
  imgBed = loadImage(imgBed_Src);
  loadingMessage(6, imgBed_Src);

  let imgXylophone_Src = "./assets/images/xylophone.png";
  imgXylophone = loadImage(imgXylophone_Src);
  loadingMessage(7, imgXylophone_Src);

  // @ts-ignore
  assetCalc += new Error().lineNumber;
  assetTotal = (assetCalc - 2) / 4;
  console.log(
    `%c\n-------------------------\nTotal assets loaded: %c${assetTotal}`,
    "color: #7289DA; font-weight: bold;"
  );
}
