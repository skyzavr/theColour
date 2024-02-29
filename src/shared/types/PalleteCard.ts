export type CardType = {
  colour: string;
  colourSet: {
    RGB: string;
    HSL: string;
    CMYK: string;
  };
  isLocked: boolean;
  id: number;
};
