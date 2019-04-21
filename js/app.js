/* eslint-disable linebreak-style */
/**
 * The view model for the application.
 */
function AppViewModel() {
  this.inputColor = new RgbColor(0, 0, 0, 'Input');
  this.comparisonSet = ko.observableArray(generateRainbowSet());
}

/**
 * @return {RgbColor[]} a set of colors generated from RoyGBiv.
 */
function generateRainbowSet() {
  return [
    new RgbColor(255, 0, 0, 'Red'),
    new RgbColor(255, 165, 0, 'Organge'),
    new RgbColor(255, 255, 0, 'Yellow'),
    new RgbColor(0, 128, 0, 'Green'),
    new RgbColor(0, 0, 255, 'Blue'),
    new RgbColor(75, 0, 130, 'Indigo'),
    new RgbColor(238, 130, 238, 'Violet'),
  ];
}

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
    this.R = ko.observable(r);
    this.G = ko.observable(g);
    this.B = ko.observable(b);
    this.Name = ko.observable(name);
  }
}

ko.applyBindings(new AppViewModel());
