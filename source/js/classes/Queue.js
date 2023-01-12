//@ts-check
"use strict";

/**
 * @template {any} T
 * @typedef {{ [_: number]: T }} QueueLiteral<T>
 */

/**
 * NOT FINAL - Severe bugs can occur
 * @template T
 * @class Queue
 * @see https://www.javascripttutorial.net/javascript-queue/
 */
class Queue {
  /** @type { QueueLiteral<T> } */ #elements;
  #head;
  #tail;
  /** @type {number | undefined} */ #maxLength;
  #autoQueue;
  #noDuplicates;
  #compFunc;

  /**
   * @param {number} [maxLength] Maximum number of elements contained in the queue
   * @param {boolean} [autoQueue] Specifies if its length should be regulated automatically on user input
   * @param {(el1: T, el2: T) => boolean} [noDuplicatesBy] Function sorting out duplicates as soon as the queue reaches its maximu length
   */
  constructor(maxLength, autoQueue = false, noDuplicatesBy) {
    this.#elements = {};
    this.#head = 0;
    this.#tail = 0;
    this.#maxLength = maxLength || undefined;
    this.#autoQueue = autoQueue;
    this.#noDuplicates = !!noDuplicatesBy;
    this.#compFunc = noDuplicatesBy;
  }

  /**
   * ...
   * @param {T} element The element that will join the queue
   * @returns {void | undefined}
   */
  enqueue(element) {
    if (!this.#autoQueue) {
      // Just exit the procedure if the addition of the item would surpass the maximum length
      if (this.#maxLength && this.#maxLength < this.length + 1) return;
    } else {
      // Just toss out the first item before adding the argument to the queue
      if (this.#maxLength && this.#maxLength < this.length + 1) this.dequeue();
    }

    this.elements[this.#tail] = element;
    this.#tail++;
  }

  /**
   * ...
   * @param {T[]} elements The elements that will join the queue
   */
  enqueueAll(...elements) {
    for (let i = 0; i < elements.length; i++) this.enqueue(elements[i]);
  }

  /**
   * ...
   * @returns {T}
   */
  dequeue() {
    const element = this.elements[this.#head];
    delete this.elements[this.#head];
    this.#head++;

    return element;
  }

  dequeueAll() {
    for (let key in this.#elements) {
      delete this.#elements[key];
    }

    this.#head = 0;
    this.#tail = 0;
  }

  /**
   * ...
   * @returns {T | undefined}
   */
  first() {
    return this.#elements ? this.#elements[this.#head] : undefined;
  }

  /**
   * ...
   * @returns {T | undefined}
   */
  last() {
    return this.#elements ? this.#elements[this.#tail - 1] : undefined;
  }

  // Getter ##################################

  get elements() {
    return this.#elements;
  }

  get length() {
    return this.#tail - this.#head;
  }

  get isEmpty() {
    return !this.length;
  }

  get isFull() {
    return this.length === this.#maxLength;
  }

  // Setter ##################################

  /**
   * @param {number} length
   */
  set length(length) {
    if (length === 0) {
      this.dequeueAll();
      return;
    }
    if (!length || length >= this.length) return;

    let atIndex = this.#head + length - 1;
    let counter = this.#tail - 1;

    while (counter > atIndex) {
      delete this.#elements[counter];
      counter--;
    }

    this.#tail = ++counter;
  }

  /**
   * @param {number} maxLength
   */
  set maxLength(maxLength) {
    if (maxLength <= this.length) {
      this.length = maxLength;
    }
    this.#maxLength = maxLength;
  }
}
