//@ts-check
"use strict";

const startTimer = () => {
  startOfPickUp = millis(); // get start
};

const runTimer = () => {
  if (startOfPickUp > 0 && progress < 100) {
    progress = ((millis() - startOfPickUp) / timeToPickUp) * 100;
  }
};

const logTimer = () => {
  console.log(progress);
};

const resetTimer = () => {
  startOfPickUp = 0;
  progress = 0;
};
