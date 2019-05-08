/* eslint-disable linebreak-style */

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
    const self = this;
    self.R = ko.observable(r);
    self.G = ko.observable(g);
    self.B = ko.observable(b);
  }

  /**
  * @return {RgbColor} The observable rgb as an RgbColor
  */
  toRgbColor() {
    return new RgbColor(this.R(), this.G(), this.B(), 'Input');
  }
}
