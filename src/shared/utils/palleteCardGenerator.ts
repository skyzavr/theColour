import { HexToCMYK, hexToRGB, HexToHSL } from '@shared/utils/colourConversion';
export const colourConvertor = (colour: string) => {
  const [r, g, b] = hexToRGB(colour);
  const [h, s, l] = HexToHSL(colour);
  const [c, m, y, k] = HexToCMYK(colour);
  return {
    RGB: `${r}, ${g}, ${b}`,
    HSL: `${h}, ${s}, ${l}`,
    CMYK: `${c}, ${m}, ${y}, ${k}`,
  };
};

export const cardObjectGenerator = (
  colour: string,
  isLocked: boolean = false
) => {
  return {
    colour: colour.toUpperCase(),
    colourSet: { ...colourConvertor(colour) },
    isLocked,
    id: Math.floor(Math.random() * 10000),
  };
};
