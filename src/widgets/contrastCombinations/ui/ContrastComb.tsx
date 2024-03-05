import { ContrastCombCard } from '@widgets/contrastCombCard';

import { CalcContrastRatio } from '@shared/utils/calculateContrastRatio';
import { HSLGeneration, hslToHex } from '@shared/utils/colourConversion';
import { keyGen } from '@shared/utils/keyGen';

import classes from './contrastComb.module.css';
type possStringArr = string[] | string;

export const ContrastComb = ({ colour }: { colour: string }) => {
  const ratio = CalcContrastRatio();

  const calcRange = (list: number[], hue: number) => {
    if (list.length === 0) return true;
    const valuesList = [...list, hue].sort((a, b) => a - b);
    for (let i = 0; i < valuesList.length - 1; i++) {
      const range = Math.abs(valuesList[i] - valuesList[i + 1]);
      if (range < 30) return false;
    }
    return true;
  };

  const getColoursSets = () => {
    const colours = [],
      hues = [];
    const combLen = 3;
    while (hues.length !== combLen) {
      const newColour = HSLGeneration(colour);
      const hue = newColour[0];
      const isRangeBig = calcRange(hues, hue);
      if (isRangeBig) {
        hues.push(hue);
        colours.push(newColour);
      }
    }
    return colours.map((el) => hslToHex(el));
  };

  const isArray = (data: possStringArr): boolean => Array.isArray(data);

  const colourSetUp = (paramOne: possStringArr, paramTwo: possStringArr) => {
    const list: string[] = isArray(paramOne) ? [...paramOne] : [...paramTwo];
    return list.map((_: string, i: number) => {
      const color = isArray(paramOne) ? paramOne[i] : paramOne;
      const bgr = isArray(paramTwo) ? paramTwo[i] : paramTwo;
      return {
        color: color.toString(),
        background: bgr.toString(),
        ratio: Math.floor(ratio(color.toString(), bgr.toString())),
      };
    });
  };

  const getContrasts = () => {
    const fontColour = getColoursSets();
    const bgrCOlour = getColoursSets();
    return [
      ...colourSetUp(fontColour, colour),
      ...colourSetUp(colour, bgrCOlour),
    ];
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>Take a look at these combinations</div>
      <div className={classes.list}>
        {getContrasts().map(({ color, background, ratio }) => (
          <ContrastCombCard {...{ color, background, ratio }} key={keyGen()} />
        ))}
      </div>
    </div>
  );
};
