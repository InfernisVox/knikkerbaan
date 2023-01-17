//@ts-check
"use strict";

// https://stackoverflow.com/questions/69524578/measuring-how-long-a-key-is-pressed-using-p5-js-and-javascript
let timeToPickUp = 5000; //ms of time to pick up
let startOfPickUp = 0; // var to save timeStamp to
let progress = 0; // var to save progress value

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
