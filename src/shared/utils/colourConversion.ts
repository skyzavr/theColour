export const hexToDec = (num: string) => {
  const letter = 'abcdef';
  num = num.startsWith('#') ? num.slice(1).toLowerCase() : num.toLowerCase();
  const numLen = num.length - 1;

  const accum = (acc: number, item: string, ind: number) => {
    const currentValue = isNaN(parseFloat(item))
      ? Number(letter.indexOf(item)) + 10
      : Number(item);
    return acc + currentValue * Math.pow(16, numLen - ind);
  };

  return [...num].reduce(accum, 0);
};
