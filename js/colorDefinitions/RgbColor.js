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
    const self = this;
    self.R = r;
    self.G = g;
    self.B = b;
    self.Name = name;

    self.StyleFormat = ko.pureComputed(function() {
      return `rgb(${self.R}, ${self.G}, ${self.B})`;
    }, self);
  }
}
