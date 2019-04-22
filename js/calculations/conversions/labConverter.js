/* eslint-disable linebreak-style */
/* eslint-disable max-len */

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
