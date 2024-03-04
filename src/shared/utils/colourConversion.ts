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
  colour
    .split(',')
    .map((el) => decimalToHex(Number(el)))
    .join('');
