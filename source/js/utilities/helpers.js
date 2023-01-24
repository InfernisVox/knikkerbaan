// @ts-check
"use strict";

/** @typedef {import("../../../@types/p5/index").Color} Colour */
/** @type {Color} */ let c;

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
 * @param {unknown} arg
 */
const isNull = (arg) => {
  return typeof arg === "object" && !arg && arg === arg;
};

/**
 * `loadingMessage` is an auxiliary function. It is going to be used for
 * printing synchronous logs in the console when `preload` loads new media files.
 *
 * @param {number} currentAsset The number which associates the loaded media asset with an integer
 * @param {string} [assetName] The name of the loaded media asset
 */
function loadingMessage(currentAsset, assetName) {
  assetName = assetName || "Unknown";
  assetName = assetName.split("/").pop();

  console.log(
    `%cLoading asset ${currentAsset}: %c${assetName}`,
    "color: #7289DA; font-weight: bold;"
  );
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
