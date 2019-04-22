/* eslint-disable linebreak-style */
/* eslint-disable max-len */

const cieLabCalculator = (function() {
  const weight = {Chromacity: 1, Light: 1, Hue: 1};
  const pi = Math.PI;

  /**
     * CIEDE2000 https://en.wikipedia.org/wiki/Color_difference
     * Calculates the DeltaE between two LAB colors using the CIEDE2000 formula.
     * @param {labColor} lA - LAB Color A.
     * @param {labColor} lB - LAB Color B.
     * @return {int} Returns the index of the color with smallest DeltaE with input.
     */
  function deltaE00( lA, lB ) {
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
    const dHPr = 2 * Math.sqrt( cPr1 * cPr2 ) * Math.sin( toRadians( dhPr / 2 ));
    const avHPr = calculateAverageHPrime( cPr1, cPr2, hPr1, hPr2);
    const T = 1
                    - (.17 * Math.cos( toRadians( avHPr - 30))
                    + (.24 * Math.cos( toRadians( 2 * avHPr)))
                    + (.32 * Math.cos( toRadians( 3 * avHPr + 6)))
                    - (.20 * Math.cos( toRadians( 4 * avHPr - 63))));
    const SH = 1 + .015 * avCPr * T;

    const RT = -2
                    * Math.sqrt( Math.pow(avCPr, 7) / (Math.pow(avCPr, 7) + Math.pow(25, 7)) )
                    * Math.sin( toRadians( 60 * Math.exp( - ( Math.pow( (avHPr - 275)/ 25 ), 2 ))));

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
     * Converts from a degree value to radians.
     * @param {number} degrees - The degree value to conver.
     * @return {number} The converted value in radians.
     */
  function toRadians( degrees ) {
    return degrees * ( Math.PI / 180 );
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
    weight: weight,
    deltaE: deltaE00,
  };
})();
