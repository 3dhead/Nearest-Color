/* eslint-disable linebreak-style */
/* eslint-disable max-len */

const comparisonFormats = {
  CIELAB: 'lab',
};

const nearestColorFinder = (function() {
  /**
 * @param {rgbColor} rgbColor - The input color in rgb.
 * @param {rgbColor[]} rgbColors - The set of colors to compare to.
 * @param {string} comparisonFormat - The format the colors should be compared with.
 * @return {int} Returns the index of the closest color.
 */
  function nearestColor( rgbColor, rgbColors, comparisonFormat ) {
    switch (comparisonFormat) {
      case comparisonFormats.CIELAB:
        return smallestLabDelta( rgbColor, rgbColors );
    }
  }

  /**
 * @param {rgbColor} rgbColor - The input color in rgb.
 * @param {rgbColor[]} rgbColors - The set of colors to compare to.
 * @return {int} Returns the index of the closest color.
 */
  function smallestLabDelta( rgbColor, rgbColors ) {
    const xyzColor = xyzConverter.convert( rgbColor );
    const xyzColors = rgbColors.map( (c) => (xyzConverter.convert(c)) );

    const labColor = labConverter.convert( xyzColor );
    const labColors = xyzColors.map( (c) => (labConverter.convert(c)) );

    return smallestDelta( labColor, labColors, cieLabCalculator.deltaE );
  }

  /**
 * @callback colorDeltaFunc(color, colors)
 * @param {color} color - The input color.
 * @param {color[]} colors - An array of colors to be compared to.
 * @param {colorDeltaFunc} colorDeltaFunc(color, colors) - The function to determine difference in color.
 * @return {int} Returns the index of the color with smallest DeltaE with input.
 */
  function smallestDelta( color, colors, colorDeltaFunc ) {
    let smallestDelta = Number.MAX_SAFE_INTEGER;
    let smallestIndex = 0;

    for (let i = 0; i < colors.length; i++) {
      const currentDelta = colorDeltaFunc(color, colors[i]);

      if (currentDelta < smallestDelta) {
        smallestDelta = currentDelta;
        smallestIndex = i;
      }
    }

    return smallestIndex;
  }

  return {
    nearestColor: nearestColor,
  };
})();
