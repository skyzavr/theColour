import { CardList } from '@widgets/PaletteCardList';

import { colourGenerator } from '@shared/utils/colourGenerator';
import { cardObjectGenerator } from '@shared/utils/palleteCardGenerator';

import classes from './paletteGenerator.module.css';

export const PaletteGenerator = () => {
  const generateCardList = (cardsNumber: number, curentList: string[] = []) => {
    let cardsLen = 0;
    const coloursList: string[] = [...curentList];
    const list = [];
    while (cardsLen !== cardsNumber) {
      const colour = colourGenerator();
      const isColourExist = coloursList.includes(colour);
      if (isColourExist) continue;
      cardsLen++;
      coloursList.push(colour);
      list.push(cardObjectGenerator(colour));
    }
    return list;
  };

  const defCardList = [...generateCardList(5)];

  return (
    <section className={classes.wrapper}>
      <h1 className={classes.title}>Palette generator</h1>
      <CardList {...{ defCardList }} />
    </section>
  );
};
