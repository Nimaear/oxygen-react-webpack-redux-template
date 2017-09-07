
var typographyScales = {
  fontSize: [ 6, 7, 8, 9, 10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 42, 48, 55, 63, 73, 84, 96 ],
  lineHeight: [ 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5 ],
  letterSpacing: [ 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5 ],
};

function fontSize(index) {
  index = index || 0;
  return typographyScales.fontSize[7 + index] + 'px';
};

function letterSpacing(index) {
  index = index || 0;
  return typographyScales.letterSpacing[7 + index] + 'px';
};

function lineHeight(index) {
  index = index || 0;
  return typographyScales.lineHeight[7 + index];
};

function hexToRgba(input, opacity){
  var hex = input.replace('#', '');
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
};

module.exports = {
  fontSize: fontSize,
  hexToRgba: hexToRgba,
  letterSpacing: letterSpacing,
  lineHeight: lineHeight,
  Colors: {
    white: 'rgba(255, 255, 255, 0.9)',
    lightBlack: 'rgba(0, 0, 0, 0.7)',
    black: 'rgba(0, 0, 0, 0.9)',
    border: {
      default: 'rgba(155, 155, 155, 0.5)',
      active: 'rgba(155, 155, 155, 0.9)'
    }
  },
  Typography: {
    fontFamily: 'Oxygen, sans-serif',
    fontSize: 14,
  },
  Units: {
    base: 8,
    keyline: 64,
    fullWidth: 1160,
  }
}
