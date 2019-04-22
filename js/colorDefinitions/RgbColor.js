/* eslint-disable linebreak-style */

/**
 * The binding class for rgb colors.
 */
class RgbColor {
/**
     * Constructor for RGB.
     * @param {int} r Int value for R.
     * @param {int} g Int value for G.
     * @param {int} b Int value for B.
     * @param {string} name Name of the color.
     */
  constructor(r, g, b, name) {
    this.R = r;
    this.G = g;
    this.B = b;
    this.Name = name;
  }
}