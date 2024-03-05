import ColourSetItem from '@shared/ui/colourSetItem/ColourSetItem';

import { getBlendSets, titles } from '../model/datas';
import { hexToRGB } from '@shared/utils/colourConversion';
import { keyGen } from '@shared/utils/keyGen';

import classes from './colourComb.module.css';

type list = { name: string; value: number; diff?: number };

export const ColourCombination = ({ colour }: { colour: string }) => {
  const factorLength = 7;
  const getFactor = () => {
    const step = Number((1 / factorLength).toFixed(2));
    const steps = [];
    for (let i = 0; i < 1; i += step) {
      const value = Math.min(1, i);
      steps.push(Math.floor(value * 100) / 100);
    }
    const ind = steps.length - 1;
    if (steps[ind] < 1) steps[ind] = 1;
    return steps;
  };

  const tints = (colour: string) => {
    const [r, g, b] = hexToRGB(colour);
    const factor = getFactor();
    const tintList = [];
    for (let i = 0; i < factor.length; i++) {
      const R = Math.round(r + (255 - r) * factor[i]);
      const G = Math.round(g + (255 - g) * factor[i]);
      const B = Math.round(b + (255 - b) * factor[i]);
      tintList.push(`${R},${G},${B}`);
    }
    return tintList;
  };

  const shades = (colour: string) => {
    const factor = getFactor();
    const [r, g, b] = hexToRGB(colour);
    const shadesList = [];
    for (let i = 0; i < factor.length; i++) {
      const currFact = 1 - factor[i];
      const R = Math.round(r * currFact);
      const G = Math.round(g * currFact);
      const B = Math.round(b * currFact);
      shadesList.push(`${R},${G},${B}`);
    }

    return shadesList;
  };

  const tones = (colour: string) => {
    let [r, g, b] = hexToRGB(colour);
    const tonesList = [];
    tonesList.push(`${r},${g},${b}`);
    for (let i = 0; i < 7; i++) {
      const newR = (128 - r) / 7;
      const newG = (128 - g) / 7;
      const newB = (128 - b) / 7;
      r = Math.floor(r + newR);
      g = Math.floor(g + newG);
      b = Math.floor(b + newB);
      tonesList.push(`${r},${g},${b}`);
    }
    return tonesList;
  };

  const applyReduce = (arr: list[]): { [key: string]: number } => {
    return arr.reduce(
      (obj, item) =>
        Object.assign(obj, {
          [item.name]: item.value,
        }),
      {}
    );
  };

  const blends = (params: list[][]) => {
    const [colourList, list] = params;
    const obj = [...colourList];
    const blendList = [];
    for (let i = 0; i < obj.length; i++)
      obj[i].diff = Math.round((obj[i].value - 128) / factorLength);

    for (let i = 0; i <= factorLength; i++) {
      const arr = [];
      for (let j = 0; j < obj.length; j++) {
        const { diff, name, value } = obj[j];
        obj[j] = { name, value: value - (diff || 0), diff };
        arr.push({ name: obj[j].name, value: obj[j].value });
      }
      blendList.push([...arr, ...list]);
    }
    return blendList;
  };

  const updateSets = (colour: string) => {
    const setsList = [
      [...tints(colour)],
      [...shades(colour)],
      [...tones(colour)],
    ];
    const blendSets = getBlendSets(colour);
    for (let i = 0; i < blendSets.length; i++) {
      const len = blends(blendSets[i]).length;
      const list = [];
      for (let j = 0; j < len; j++) {
        const { r, g, b } = applyReduce(blends(blendSets[i])[j]);
        list.push(`${r},${g},${b}`);
      }
      setsList.push(list);
    }
    return setsList;
  };

  return (
    <div className={classes.wrapper}>
      {updateSets(colour).map((el, ind) => (
        <div className={classes.set} key={keyGen()}>
          <div className={classes.title}>{titles[ind]}</div>
          <div className={classes.list}>
            {el.map((col) => (
              <ColourSetItem colour={col} key={keyGen()} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
