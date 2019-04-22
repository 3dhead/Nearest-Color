/* eslint-disable linebreak-style */

const colorSetGenerator = (function() {
/**
 * @return {RgbColor[]} a set of colors generated from RoyGBiv.
 */
  function rainbowSet() {
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

  return {
    rainbowSet: rainbowSet,
  };
})();
