import { hexToDec } from '@shared/utils/colourConversion';

export const CalcContrastRatio = () => {
  const addParam = (value: number) => (value + 0.055) / 1.055;

  const getParam = (value: number) =>
    value <= 0.03928 ? value / 12.92 : Math.pow(addParam(value), 2.4);

  const getRGB = (hexNum: string) => {
    hexNum = hexNum.startsWith('#') ? hexNum.slice(1) : hexNum;
    const nums = hexNum.match(/..?/g);
    if (nums === null) return [0, 0, 0];
    return nums.map((el) => getParam(hexToDec(el) / 255));
  };

  const calcLuminance = (colour: string) => {
    const [r, g, b] = getRGB(colour);
    return r * 0.2126 + g * 0.7152 + b * 0.0722;
  };

  const calcRatio = (colour: string, bgrColour: string) => {
    const Lum1 = calcLuminance(colour),
      Lum2 = calcLuminance(bgrColour);
    const L1 = Math.max(Lum1, Lum2);
    const L2 = Math.min(Lum1, Lum2);
    return (L1 + 0.05) / (L2 + 0.05);
  };

  return calcRatio;
};
