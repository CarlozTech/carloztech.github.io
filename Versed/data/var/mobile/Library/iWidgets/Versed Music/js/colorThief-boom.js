/*
 * Extends ColorThief plugin to mark the most intense color in a palette.
 *
 * var colorThief = new ColorThief();
 * var palette = colorThief.getPalette(image, 5);
 * var palette = colorThief.markBoomColors(palette);
 *
 * It ranks all colors in a palette according to the sum of saturation and color value (HSV) descending.
 * The palette colors will be extended with boomRank and boomColor.
 * boomColor is set to true if the color is the most intense color in the given palette.
 *
 * Extends ColorThief v2.0 and depends on TinyColor 1.3 (and jQuery)
 * https://github.com/lokesh/color-thief/
 * https://github.com/bgrins/TinyColor
 *
 * Author: Dennis Schulz @Pluto1010
 */
(function() {
  ColorThief.prototype.markBoomColors = function(palette) {
    var boomColorCandidates = [];

    for(var colorIndex = 0; colorIndex < palette.length; colorIndex++) {
      var color = tinycolor({r:palette[colorIndex][0], g:palette[colorIndex][1], b:palette[colorIndex][2]});
      var hsv = color.toHsv();
      var boomValue = hsv.s + hsv.v;

      boomColorCandidates.push([boomValue, color, colorIndex]);
    };

    var sortedBoomColorCandidates = boomColorCandidates.sort(function(a, b) {
        return a[0] < b[0] ? 1 : -1;
    });

    for(var i = 0; i < sortedBoomColorCandidates.length; i++) {
      palette[sortedBoomColorCandidates[i][2]].boomRank = i+1;
      palette[sortedBoomColorCandidates[i][2]].boomColor = (i==0);
    }

    return palette;
  }
})();