/* eslint-disable linebreak-style */
/**
 * The view model for the application.
 */
function AppViewModel() {
  const self = this;

  this.inputColor = new ObservableRgb(0, 0, 0);
  this.comparisonSet = ko.observableArray(generateRainbowSet());

  this.addColor = ko.observable(new RgbColor(0, 0, 0, ''));

  this.closestColor = ko.pureComputed(function() {
    const iC = nearestColorFinder.nearestColor(
        self.inputColor.toRgbColor(), self.comparisonSet(),
        comparisonFormats.CIELAB);

    return self.comparisonSet()[iC];
  });

  this.addColorToSet = function() {
    self.comparisonSet.push(self.addColor);
    self.addColor = new RgbColor(0, 0, 0, '');
  };

  this.removeColor = function(color) {
    self.comparisonSet.remove(color);
  };
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
    this.R = r;
    this.G = g;
    this.B = b;
    this.Name = name;
  }
}

/**
 * An rgb class with each property observed.
 */
class ObservableRgb {
/**
     * @param {number} r
     * @param {number} g
     * @param {number} b
     */
  constructor(r, g, b) {
    this.R = ko.observable(r);
    this.G = ko.observable(g);
    this.B = ko.observable(b);
  }

  /**
   * @return {RgbColor} The observable rgb as an RgbColor
   */
  toRgbColor() {
    return new RgbColor(this.R(), this.G(), this.B(), 'Input');
  }
}

/**
 * @return {RgbColor[]} a set of colors generated from RoyGBiv.
 */
function generateRainbowSet() {
  return [
    new RgbColor(255, 0, 0, 'Red'),
    new RgbColor(255, 165, 0, 'Orange'),
    new RgbColor(255, 255, 0, 'Yellow'),
    new RgbColor(0, 128, 0, 'Green'),
    new RgbColor(0, 0, 255, 'Blue'),
    new RgbColor(75, 0, 130, 'Indigo'),
    new RgbColor(238, 130, 238, 'Violet'),
  ];
}

ko.applyBindings(new AppViewModel());
