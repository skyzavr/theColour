export const colourString = (colour: string) => {
  return colour.startsWith('#')
    ? colour.slice(1).toLowerCase()
    : colour.toLowerCase();
};
export const hexToDec = (num: string) => {
  const letter = 'abcdef';
  num = colourString(num);
  const numLen = num.length - 1;

  const accum = (acc: number, item: string, ind: number) => {
    const currentValue = isNaN(parseFloat(item))
      ? Number(letter.indexOf(item)) + 10
      : Number(item);
    return acc + currentValue * Math.pow(16, numLen - ind);
  };
  return [...num].reduce(accum, 0);
};

export const hexToRGB = (colour: string) => {
  const list = colourString(colour).match(/..?/g);
  if (list === null) return [0, 0, 0];
  return list.map((el) => hexToDec(el));
};

export const HexToCMYK = (colour: string) => {
  const [r, g, b] = hexToRGB(colour);
  if (r === 0 && g === 0 && b === 0) return [0, 0, 0, 100];
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;
  const K = 1 - Math.max(R, G, B);
  const C = (1 - R - K) / (1 - K);
  const M = (1 - G - K) / (1 - K);
  const Y = (1 - B - K) / (1 - K);
  return [
    Math.round(C * 100),
    Math.round(M * 100),
    Math.round(Y * 100),
    Math.round(K * 100),
  ];
};

const calculateHue = (delta: number, RGB: number[]) => {
  const [R, G, B] = RGB;
  const Cmax = Math.max(R, G, B);
  let h = 0;
  if (R === G && G === B) return 0;
  if (Cmax === R) {
    const value = 60 * (((G - B) / delta) % 6);
    value < 0 ? (h = 360 + value) : (h = value);
  } else if (Cmax === G) {
    const value = (B - R) / delta;
    h = 60 * (value + 2);
  } else if (Cmax === B) {
    const value = (R - G) / delta;
    h = 60 * (value + 4);
  }
  return Number(h.toFixed());
};

export const HexToHSL = (colour: string) => {
  let [r, g, b] = hexToRGB(colour);
  r = r / 255;
  g = g / 255;
  b = b / 255;
  const Cmax = Math.max(r, g, b);
  const Cmin = Math.min(r, g, b);
  const delta = Cmax - Cmin;
  const updParam = (value: number) => Number((value * 100).toFixed(0));
  const h = calculateHue(delta, [r, g, b]);
  const l = (Cmax + Cmin) / 2;
  const s = delta / (1 - Math.abs(2 * l - 1));
  return [Math.floor(h), updParam(s), updParam(l)];
};

export const decimalToHex = (value: number) => {
  if (value >= 255) return 'FF';
  if (value === 0) return '00';
  const alphbet = 'ABCDEF';
  let result = '';
  while (value >= 16) {
    const maxCount = Math.floor(value / 16);
    if (maxCount > 9) result += alphbet[maxCount - 10];
    else result += maxCount;
    value = value - 16 * maxCount;
  }
  if (value > 9) result += alphbet[value - 10];
  else result += value;
  if (result.length === 1) result = '0' + result;
  return result;
};

export const rgbToHex = (colour: string) =>
  '#' +
  colour
    .split(',')
    .map((el) => decimalToHex(Number(el)))
    .join('');

export const getLuminosity = (colour: string) => {
  const [r, g, b] = hexToRGB(colour);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

export const HSLGeneration = (colour: string) => {
  const luminosuty = getLuminosity(colour);
  const hue = Math.floor(Math.random() * 360);
  let saturation = 0,
    lightness = 0;
  if (luminosuty > 0.5) {
    saturation = Math.floor(Math.random() * 100);
    lightness = Math.floor(Math.random() * (12 - 0) + 0);
  } else {
    saturation = Math.floor(Math.random() * (100 - 75) + 75);
    lightness = Math.floor(Math.random() * (100 - 85) + 85);
  }
  return [hue, saturation, lightness];
};

export const hueToRgb = (hue: number, c: number, x: number, m: number) => {
  let red = 0,
    green = 0,
    blue = 0;
  //depends on Hue we get a special param of each channel
  if (hue >= 0 && hue < 60) {
    red = c;
    green = x;
  } else if (hue >= 60 && hue < 120) {
    red = x;
    green = c;
  } else if (hue >= 120 && hue < 180) {
    green = c;
    blue = x;
  } else if (hue >= 180 && hue < 240) {
    green = x;
    blue = c;
  } else if (hue >= 240 && hue < 300) {
    red = x;
    blue = c;
  } else {
    red = c;
    blue = x;
  }
  red = Math.floor((red + m) * 255);
  green = Math.floor((green + m) * 255);
  blue = Math.floor((blue + m) * 255);
  return [red, green, blue];
};
export const hslToRgb = (colour: number[]) => {
  const [h, s, l] = colour;
  //method that convert an HSL color  to an RGB one
  //https://www.baeldung.com/cs/convert-color-hsl-rgb
  //Hue is a colour circle that contains a number between 0 and 360
  //S- saturation, L- lightness. Both is a number between 0 and 1
  //convert Lightness and saturation to correct value
  const lightn = l / 100;
  const satur = s / 100;
  //get the chroma: Chroma= (1-|2*L-1|)*S
  const chroma = (1 - Math.abs(2 * lightn - 1)) * satur;
  //H`=H/60 degr
  const hue = h / 60;
  //X=chroma*(1-|H` mod 2-1|)
  const X = chroma * (1 - Math.abs((hue % 2) - 1));
  //m=L-chroma/2
  const m = lightn - chroma / 2;

  return hueToRgb(h, chroma, X, m);
};
export const hslToHex = (colour: number[]) => {
  return rgbToHex(hslToRgb(colour).toString());
};
