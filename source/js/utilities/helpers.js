// @ts-check
"use strict";

/** @typedef {import("../../../@types/p5/index").Color} Colour */
/** @type {Color} */ let c;

let assertcounter = 1;

/**
 *
 * @param {Player} player
 * @param {Colour} color
 * @param {number} offset
 * @param {number} animationCounter
 */
function bar(player, color, offset = null, animationCounter = null) {
  fill(color);
  // w: 196
  rectMode(CORNER);
  rect(
    width / 2 -
      200 / 2 +
      2 +
      (isNull(offset) && isNull(animationCounter)
        ? 0
        : offset * animationCounter),
    height * 0.9 - 10 / 2 + 2,
    196 * (player.recordedData.length / player.recordedDataLength),
    6
  );
  noFill();
  stroke(color);
  rectMode(CENTER);
  rect(
    width / 2 +
      (isNull(offset) && isNull(animationCounter)
        ? 0
        : offset * animationCounter),
    height * 0.9,
    200,
    10
  );
}

/**
 *
 * @returns {number}
 */
function showProgress() {
  let wPercentage = map(frameCount % 60, 0, 59, 0, 1);
  let hue = map(frameCount % 60, 0, 59, 60, 0);

  colorMode(HSB);
  let c = color(hue, 100, 100);

  noStroke();
  fill(c);
  // w: 196
  rectMode(CORNER);
  rect(
    width / 2 - 200 / 2 + 2,
    height * 0.9 - 10 / 2 + 2,
    196 * wPercentage,
    6
  );
  noFill();
  stroke(c);
  rectMode(CENTER);
  rect(width / 2, height * 0.9, 200, 10);
  colorMode(RGB);
  return wPercentage;
}

/**
 *
 * @param {unknown} arg
 */
const isNull = (arg) => {
  return typeof arg === "object" && !arg && arg === arg;
};

/**
 *
 * @param {number} milliSeconds
 * @returns {number | string}
 */
const getTime = (milliSeconds) => {
  let seconds = round(milliSeconds / 1000, 1);

  if (seconds <= 60) {
    return seconds;
  }

  seconds = round(milliSeconds / 1000, 0);
  let _seconds = seconds % 60;
  let minutes = (seconds - _seconds) / 60;
  let hours = (minutes - (minutes % 60)) / 60;

  if (seconds > 60 && seconds <= 3600) {
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      _seconds < 10 ? `0${_seconds}` : _seconds
    }`;
  } else {
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${_seconds < 10 ? `0${_seconds}` : _seconds}`;
  }
};

/**
 * `loadingMessage` is an auxiliary function. It is going to be used for
 * printing synchronous logs in the console when `preload` loads new media files.
 *
 * @param {string} [assetName] The name of the loaded media asset
 */
function loadingMessage(assetName) {
  assetName = assetName || "Unknown";
  assetName = assetName.split("/").pop();

  console.log(
    `%cLoading asset ${assertcounter}: %c${assetName}`,
    "color: #7289DA; font-weight: bold;"
  );
  assertcounter++;
}

/**
 * `once` function is an auxiliary function whenever `push()` and `pop()`
 * are called. The more conversions using `push` and `pop`, the more line saving
 * the wide application of this function.
 *
 * @param {() => void} callback The function with statements
 * that are to be executed synchronously right after `push` and before `pop`.
 *
 * @example
 *  once(() => {
 *      const {position: pos, angle} = player.body;
 *
 *      translate(pos.x, pos.y);
 *      rotate(angle);
 *      // ...
 *  });
 */
function once(callback) {
  push();
  callback();
  pop();
}

/**
 *
 * @param {Matter.Body} bodyA
 * @param {Matter.Body} bodyB
 * @param {string} labelA
 * @param {string} labelB
 * @param {() => void} callback
 */
function ifBodiesArePairs(bodyA, bodyB, labelA, labelB, callback) {
  if (
    (bodyA.label === labelA && bodyB.label === labelB) ||
    (bodyA.label === labelB && bodyB.label === labelA)
  ) {
    callback();
  }
}
