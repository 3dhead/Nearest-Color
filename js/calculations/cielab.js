/* eslint-disable linebreak-style */
/* eslint-disable max-len */

const standardWorkingSpace = [
  [0.4124564, 0.3575761, 0.1804375],
  [0.2126729, 0.7151522, 0.0721750],
  [0.0193339, 0.1191920, 0.9503041],
];

/**
 * Represents a book.
 * @param {string} rgbColor - The title of the book.
 * @param {string} colors - The author of the book.
 */
function findNearestCieLab( rgbColor, colors ) {
  const xyzColor = convertRgbToXyz( rgbColor, standardWorkingSpace );
}

/**
 * Converts a given color to XYZ
 * @param {rgbColor} rgbColor RGB color to be converted.
 * @param {matrix} workingSpace Working space for rgb.
 * @return {xyzColor} The converted color.
 */
function convertRgbToXyz( rgbColor ) {
  const compandedRgb =
    {
      R: compand(rgbColor.R),
      G: compand(rgbColor.G),
      B: compand(rgbColor.B),
    };

  return {
    X: (standardWorkingSpace[0][0] * compandedRgb.R) + (standardWorkingSpace[0][1] * compandedRgb.G) + standardWorkingSpace[0][2] * compandedRgb.B,
    Y: (standardWorkingSpace[1][0] * compandedRgb.R) + (standardWorkingSpace[1][1] * compandedRgb.G) + standardWorkingSpace[1][2] * compandedRgb.B,
    Z: (standardWorkingSpace[2][0] * compandedRgb.R) + (standardWorkingSpace[2][1] * compandedRgb.G) + standardWorkingSpace[2][2] * compandedRgb.B,
  };
}

/**
 * Converts an sRGB value
 * @param {number} val The value to be companded.
 * @return {number} The companded value.
 */
function compand( val ) {
  val = val / 255;

  if ( val > .04045 ) {
    return Math.pow((( val + .055 ) / 1.055), 2.4);
  } else {
    return val/12.92;
  }
}
