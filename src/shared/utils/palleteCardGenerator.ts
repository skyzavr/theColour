import { HexToCMYK, hexToRGB, HexToHSL } from '@shared/utils/colourConversion';

export const cardObjectGenerator = (
  colour: string,
  isLocked: boolean = false
) => {
  const [r, g, b] = hexToRGB(colour);
  const [h, s, l] = HexToHSL(colour);
  const [c, m, y, k] = HexToCMYK(colour);
  return {
    colour: colour.toUpperCase(),
    colourSet: {
      RGB: `${r}, ${g}, ${b}`,
      HSL: `${h}, ${s}, ${l}`,
      CMYK: `${c}, ${m}, ${y}, ${k}`,
    },
    isLocked,
    id: Math.floor(Math.random() * 10000),
  };
};
