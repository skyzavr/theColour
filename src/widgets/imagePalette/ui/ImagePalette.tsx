import { useEffect, useState } from 'react';

import { ColourCardList } from '@widgets/colourCardListIP';

import { decimalToHex, rgbToHsl } from '@shared/utils/colourConversion';

type list = { [key: string]: string | number };
type listObj = { [key: string]: number };
type param = 'r' | 'g' | 'b';
type objT = { [key: string]: listObj };

export const Palette = ({ rgbList }: { rgbList: list[] }) => {
  const [coloured, setColoured] = useState<string[]>([]);
  const sortRgb = (list: list[], param: param) => {
    return list.sort(function (a, b) {
      if (a[param] < b[param]) return 1;
      if (a[param] > b[param]) return -1;
      return 0;
    });
  };
  const biggestColourRange = (list: list[]) => {
    let rMin = 255,
      gMin = 255,
      bMin = 255;
    let rMax = 0,
      gMax = 0,
      bMax = 0;
    list.forEach((element) => {
      const { r, g, b } = element;
      rMax = Math.max(Number(r), rMax);
      gMax = Math.max(Number(g), gMax);
      bMax = Math.max(Number(b), bMax);
      rMin = Math.min(Number(r), rMin);
      gMin = Math.min(Number(g), rMin);
      bMin = Math.min(Number(b), rMin);
    });
    const rRange = rMax - rMin;
    const gRange = gMax - gMin;
    const bRange = bMax - bMin;
    if (rRange > gRange && rRange > bRange) return 'r';
    else if (gRange > rRange && gRange > bRange) return 'g';
    else return 'b';
  };
  const uniqueList = (list: list[]) => {
    if (list.length === 0) return;
    const unique: string[] = [];
    const newArray = [];
    for (let i = 0; i < list.length; i++) {
      if (!unique.includes(list[i].hex.toString())) {
        unique.push(list[i].hex.toString());
        newArray.push(list[i]);
      }
    }
    return newArray;
  };
  const medianCut = (list: list[], depth: number): list[] => {
    /*Algorythm of median cut
    1) using biggestColourRange method we are getting the biggest range of colour channels (red or green or blue)
    2)Every time in our recursion we will sort array by its channel (red or green or blue)
    3) dividing array in a half
    4)repeat it (1-3 steps) untill we reach our max depth
    5) in the end we'll get kinda 256 arrays (because of depth=8, 2^8=256)
    6) for each array we will calculate the avarage value of rgb
    */
    const maxDepth = 12;
    if (depth === maxDepth) {
      let r = 0,
        g = 0,
        b = 0;
      for (let i = 0; i < list.length; i++) {
        r += Number(list[i].r);
        g += Number(list[i].g);
        b += Number(list[i].b);
      }
      r = Number((r / list.length).toFixed(0));
      g = Number((g / list.length).toFixed(0));
      b = Number((b / list.length).toFixed(0));
      const hex = '#' + decimalToHex(r) + decimalToHex(g) + decimalToHex(b);
      const [, sat, lum] = rgbToHsl([r, g, b]);
      return [{ r, g, b, hex, sat, lum }];
    } else {
      const range = biggestColourRange(list);
      sortRgb(list, range);
      const middle = list.length / 2;
      return [
        ...medianCut(list.slice(0, middle), depth + 1),
        ...medianCut(list.slice(middle + 1), depth + 1),
      ];
    }
  };
  const updateObj = (obj: objT, objName: string, value: listObj) => {
    const { r, g, b } = value;
    if (!obj[objName]) return { r, g, b, len: 1 };
    return {
      r: Number(obj[objName].r) + Number(r),
      g: Number(obj[objName].g) + Number(g),
      b: Number(obj[objName].b) + Number(b),
      len: Number(obj[objName].len) + 1,
    };
  };
  const getColourKey = (channels: number[]) => {
    const [channelOne, channelTwo, channelThree] = channels;
    const one = 85,
      two = 169,
      three = 255;
    let key = '';
    if (channelOne < one) key = 'OneOneOne';
    else if (channelOne < two) {
      if (channelTwo < one && channelThree < one) key = 'TwoOneOne';
      else if (channelTwo < one && channelThree < two) key = 'TwoOneTwo';
      else if (channelTwo < two && channelThree < one) key = 'TwoTwoOne';
      else key = 'TwoTwoTwo';
    } else if (channelOne < three) {
      if (channelTwo < one) {
        if (channelThree < one) key = 'ThreeOneOne';
        else if (channelThree < two) key = 'ThreeOneTwo';
        else key = 'ThreeOneThree';
      } else if (channelTwo < two) {
        if (channelThree < one) key = 'ThreeTwoOne';
        else if (channelThree < two) key = 'ThreeTwoTwo';
        else key = 'ThreeTwoThree';
      } else {
        if (channelThree < one) key = 'ThreeThreeOne';
        else if (channelThree < two) key = 'ThreeThreeTwo';
        else key = 'ThreeThreeThree';
      }
    }
    return key;
  };
  const getAvgRgb = (
    list: list[],
    first: param,
    second: param,
    third: param
  ) => {
    const obj: objT = {};
    for (let i = 0; i < list.length; i++) {
      const one = Number(list[i][first]),
        two = Number(list[i][second]),
        three = Number(list[i][third]);
      const key = getColourKey([one, two, three]);
      obj[key] = updateObj(obj, key, list[i] as listObj);
    }
    const Values = [];
    for (const value in obj) {
      const { r, g, b, len } = obj[value];
      if (len === 0) continue;
      const newr = decimalToHex(Math.floor(r / len));
      const newg = decimalToHex(Math.floor(g / len));
      const newb = decimalToHex(Math.floor(b / len));
      Values.push(`#${newr}${newg}${newb}`);
    }
    return Values;
  };

  const getColouredColours = (list: list[]) => {
    const red = [];
    const green = [];
    const blue = [];
    for (let i = 0; i < list.length; i++) {
      const { r, g, b } = list[i];
      if (r > g && r > b) red.push(list[i]);
      if (g > r && g > b) green.push(list[i]);
      if (b > r && b > g) blue.push(list[i]);
    }
    const redValues = getAvgRgb(red, 'r', 'g', 'b');
    const greenValues = getAvgRgb(green, 'g', 'r', 'b');
    const blueValues = getAvgRgb(blue, 'b', 'r', 'g');
    setColoured([...redValues, ...blueValues, ...greenValues]);
  };

  const calculatePalette = () => {
    if (rgbList.length === 0) return;
    const list = uniqueList(medianCut(rgbList, 0));
    getColouredColours(list as list[]);
  };
  useEffect(() => {
    calculatePalette();
  }, [rgbList]);
  return (
    <> {coloured.length > 0 && <ColourCardList {...{ list: coloured }} />}</>
  );
};
