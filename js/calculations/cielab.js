/* eslint-disable linebreak-style */
/* eslint-disable max-len */

const cieLabCalculator = (function() {
  const weight = {Chromacity: 1, Light: 1, Hue: 1};
  const pi = Math.PI;

  /**
 * @param {rgbColor} rgbColor - The input color in rgb.
 * @param {rgbColor[]} rgbColors - The set of colors to compare to.
 * @return {int} Returns the index of the closest color.
 */
  function nearestColor( rgbColor, rgbColors ) {
    const xyzColor = xyzConverter.convert( rgbColor );
    const xyzColors = rgbColors.map( (c) => (xyzConverter.convert(c)) );

    const labColor = labConverter.convert( xyzColor );
    const labColors = xyzColors.map( (c) => (labConverter.convert(c)) );

    return smallestDeltaE(labColor, labColors);
  }

  /**
 * @param {labColor} labColor - The input color in LAB.
 * @param {labColor[]} labColors - An array of LAB colors to be compared to.
 * @return {int} Returns the index of the color with smallest DeltaE with input.
 */
  function smallestDeltaE( labColor, labColors ) {
    let smallestDelta = 100000000;
    let smallestIndex = 0;

    for (let i = 0; i < labColors.length; i++) {
      const currentDelta = deltaE(labColor, labColors[i]);

      if (currentDelta < smallestDelta) {
        smallestDelta = currentDelta;
        smallestIndex = i;
      }
    }

    return smallestIndex;
  }

  /**
 * CIEDE2000 https://en.wikipedia.org/wiki/Color_difference
 * Calculates the DeltaE between two LAB colors using the CIEDE2000 formula.
 * @param {labColor} lA - LAB Color A.
 * @param {labColor} lB - LAB Color B.
 * @return {int} Returns the index of the color with smallest DeltaE with input.
 */
  function deltaE( lA, lB ) {
    const kL = weight.Light;
    const kC = weight.Chromacity;
    const kH = weight.Hue;

    const dLPr = lB.L - lA.L;
    const avL = (lA.L + lB.L) / 2;
    const SL = 1 + ( .015 * ( Math.pow( (avL - 50), 2) )
                / ( Math.sqrt( 20 + Math.pow((avL - 50), 2) )));

    const C1 = Math.sqrt( Math.pow( lA.A, 2 ) + Math.pow( lA.B, 2));
    const C2 = Math.sqrt( Math.pow( lB.A, 2 ) + Math.pow( lB.B, 2));
    const avC = (C1 + C2) / 2;
    const aPrMult = 1 - Math.sqrt( Math.pow( avC, 7 ) / ( Math.pow( avC, 7 ) + Math.pow( 25, 7 )));
    const aPr1 = lA.A + (lA.A / 2) * aPrMult;
    const cPr1 = Math.sqrt( Math.pow( aPr1, 2 ) + Math.pow( lA.B, 2 ) );
    const aPr2 = lB.A + (lB.A / 2) * aPrMult;
    const cPr2 = Math.sqrt( Math.pow( aPr2, 2 ) + Math.pow( lB.B, 2 ) );
    const dCPr = cPr2 - cPr1;
    const avCPr = (cPr1 + cPr2) / 2;
    const SC = 1 + (.045 * avCPr);

    const hPr1 = toDegrees( Math.atan2(lA.B, aPr1)) % 360;
    const hPr2 = toDegrees( Math.atan2(lB.B, aPr2)) % 360;
    const dhPr = cPr1 == 0 || cPr2 == 0 ? 0 : calculateDeltaHPrime(hPr1, hPr2);
    const dHPr = 2 * Math.sqrt( cPr1 * cPr2 ) * Math.sin( dhPr / 2 );
    const avHPr = calculateAverageHPrime( cPr1, cPr2, hPr1, hPr2);
    const T = 1 - (.17 * Math.cos(avHPr - 30) + (.24 * Math.cos(2 * avHPr)) + (.32 * Math.cos( 3 * avHPr + 6)) - (.20 * Math.cos(4 * avHPr - 63)));
    const SH = 1 + .015 * avCPr * T;

    const RT = -2
                * Math.sqrt( Math.pow(avCPr, 7) / (Math.pow(avCPr, 7) + Math.pow(25, 7)) )
                * Math.sin(60 * Math.exp( -1 * Math.pow( (avHPr - 275)/ 25 ), 2 ));

    return Math.sqrt( Math.pow( (dLPr / ( kL * SL )), 2) +
                      Math.pow( (dCPr / ( kC * SC )), 2) +
                      Math.pow( (dHPr / (kH * SH )), 2) +
                      (RT * (dCPr / (kC * SC)) * (dHPr / (kH * SH)) ));
  }

  /**
 * Converts from a radian value to degrees.
 * @param {number} radians - The radian value to conver.
 * @return {number} The converted value in degrees.
 */
  function toDegrees( radians ) {
    return radians * ( 180 / pi );
  }

  /**
 * Calculates the Delta H prime value.
 * @param {number} hPr1 - H Prime sub 1.
 * @param {number} hPr2 - H Prime sub 2.
 * @return {number}.
 */
  function calculateDeltaHPrime( hPr1, hPr2) {
    const hDiff = hPr1 - hPr2;

    if (hDiff <= 180) {
      return hPr2 - hPr1;
    } else if (hDiff > 180 && hPr2 > hPr1) {
      return hPr2 - hPr1 + 360;
    } else {
      return hPr2 - hPr1 - 360;
    }
  }

  /**
 * Calculates the average H prime value.
 * @param {number} cPr1 - C Prime sub 1.
 * @param {number} cPr2 - C Prime sub 2.
 * @param {number} hPr1 - H Prime sub 1.
 * @param {number} hPr2 - H Prime sub 2.
 * @return {number}.
 */
  function calculateAverageHPrime( cPr1, cPr2, hPr1, hPr2 ) {
    const hDiff = hPr1 - hPr2;

    if (cPr1 == 0 || cPr2 == 0) {
      return hPr1 + hPr2;
    }

    if (hDiff <= 180) {
      return (hPr2 + hPr1) / 2;
    } else if (hDiff > 180 && hPr1 + hPr2 < 360) {
      return (hPr2 + hPr1 + 360) / 2;
    } else {
      return (hPr2 + hPr1 - 360) / 2;
    }
  }

  return {
    nearestColor: nearestColor,
    weight: weight,
    deltaE: deltaE,
  };
})();

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
