/* eslint-disable linebreak-style */
/* eslint-disable max-len */

/**
 * @param {rgbColor} rgbColor - The input color in rgb.
 * @param {rgbColor[]} rgbColors - The set of colors to compare to.
 * @return {int} Returns the index of the closest color.
 */
function findNearestCieLab( rgbColor, rgbColors ) {
  const xyzColor = xyzConverter.convert( rgbColor );
  const xyzColors = rgbColors.map( (c) => (xyzConverter.convert(c)) );

  const labColor = labConverter.convert( xyzColor );
  const labColors = xyzColors.map( (c) => (labConverter.convert(c)) );

  return 0;
}

const xyzConverter = (function() {
  const standardWorkingSpace = [
    [0.4124564, 0.3575761, 0.1804375],
    [0.2126729, 0.7151522, 0.0721750],
    [0.0193339, 0.1191920, 0.9503041],
  ];

  /**
 * Converts a given color to XYZ
 * http://www.brucelindbloom.com/index.html?Math.html RGB to XYZ
 * @param {rgbColor} rgbColor RGB color to be converted.
 * @param {matrix} workingSpace Working space for rgb.
 * @return {xyzColor} The converted color.
 */
  function convert( rgbColor ) {
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
   * Compands an sRGB value
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

  return {
    convert: convert,
  };
})();

const labConverter = (function() {
  // reference white determined from https://en.wikipedia.org/wiki/Illuminant_D65
  // then divided by 100 since we have our xyz [0,1]
  const referenceWhite = {X: .95047, Y: 1, Z: 1.08883};
  /**
 * http://www.brucelindbloom.com/index.html?Math.html XYZ to LAB
 * @param {xyzColor} xyzColor - The color to convert.
 * @return {labColor} Returns the converted color.
 */
  function convert( xyzColor ) {
    const compandedXyz =
    {
      X: compand(xyzColor.X / referenceWhite.X),
      Y: compand(xyzColor.Y / referenceWhite.Y),
      Z: compand(xyzColor.Z / referenceWhite.Z),
    };

    return {
      L: (116 * compandedXyz.Y - 16),
      A: (500 * (compandedXyz.X - compandedXyz.Y)),
      B: (200 * (compandedXyz.Y - compandedXyz.Z)),
    };
  }

  /**
 * @param {number} val - The value to compand.
 * @return {number} Returns the companded value.
 */
  function compand( val ) {
    if ( val > 0.008856) {
      return Math.cbrt(val);
    } else {
      return ((7.787 * val) + (16 / 116));
    }
  }

  return {
    convert: convert,
  };
})();
