
const typographyScales = {
  fontSize: [6, 7, 8, 9, 10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 42, 48, 55, 63, 73, 84, 96],
  lineHeight: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5],
  letterSpacing: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
};

const neutral = 5;

const decimalToHex = (d, padding = 2) => {
  let input = d;
  if (input < 0 ) {
    input = 0;
  } else if (input > 255) {
    input = 255;
  }
  let hex = Number(input).toString(16);
  while (hex.length < padding) {
    hex = `0${ hex }`;
  }
  return hex;
}

const fontSize = (index = 0) => {
  return `${ typographyScales.fontSize[neutral + index] }px`;
};

const letterSpacing = (index = 0) => {
  return `${ typographyScales.letterSpacing[neutral + index] }px`;
};

const lineHeight = (index = 0) => {
  return typographyScales.lineHeight[neutral + index];
};

const brighten = (input, delta = 0.1) => {
  const hex = input.replace('#', '');
  const r = Math.ceil(parseInt(hex.substring(0, 2), 16) * (1 + delta));
  const g = Math.ceil(parseInt(hex.substring(2, 4), 16) * (1 + delta));
  const b = Math.ceil(parseInt(hex.substring(4, 6), 16) * (1 + delta));
  return `#${ decimalToHex(r) }${ decimalToHex(g) }${ decimalToHex(b) }`;
};

const rgba = input => {
  const hex = input.replace('#', '');
  const r = Math.ceil(parseInt(hex.substring(0, 2), 16));
  const g = Math.ceil(parseInt(hex.substring(2, 4), 16));
  const b = Math.ceil(parseInt(hex.substring(4, 6), 16));
  return `rgba(${ r }, ${ g }, ${ b }, ${ opacity })`;
}

const getContrastYIQ = (input) => {
  const hex = input.replace('#', '');
  const r = parseInt(hex.substr(0,2),16);
  const g = parseInt(hex.substr(2,2),16);
  const b = parseInt(hex.substr(4,2),16);
  const yiq = ((r*299)+(g*587)+(b*114))/1000;
  return (yiq >= 128) ? `#F0F0F0` : `#111111`;
}

const Shadow = [
  null,
  '0 1px 3px 0 rgba(0, 0, 0, 0.11)',
  '0 2px 6px 0 rgba(0, 0, 0, 0.06)',
  '0 5px 14px 0 rgba(0, 0, 0, 0.08)',
  '0 2px 24px 0 rgba(0,0,0,.07)'
];

module.exports = {
  fontSize,
  rgba,
  letterSpacing,
  lineHeight,
  brighten,
  getContrastYIQ,
  Shadow,
  Colors: {
    white: 'rgba(255, 255, 255, 0.9)',
    lightBlack: 'rgba(0, 0, 0, 0.7)',
    black: 'rgba(0, 0, 0, 0.9)',
    border: {
      default: 'rgba(155, 155, 155, 0.5)',
      active: 'rgba(155, 155, 155, 0.9)',
    },
  },
  Typography: {
    fontFamily: 'Oxygen, sans-serif',
    fontSize: 14,
  },
  Units: {
    base: 8,
    keyline: 64,
    fullWidth: 1160,
  },
};
