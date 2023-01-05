// @ts-check
"use strict";

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
 * @param {(...args?: any[]) => void} callback The function with statements
 * that are to be executed synchronously right after `push` and before `pop`.
 *
 * @example
 *  once((body, width, height) => {
 *      const {position: pos, angle} = body;
 *
 *      translate(pos.x, pos.y);
 *      rotate(angle);
 *      rect(0, 0, width, height);
 *  });
 */
function once(callback) {
  push();
  callback();
  pop();
}
