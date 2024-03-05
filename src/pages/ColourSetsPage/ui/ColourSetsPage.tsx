import { NotFound } from '@pages/notFound';
import { ColourInfoDetails } from '@widgets/colourInfoDetails';
import { ColourCombination } from '@widgets/colourCombination';
import { ContrastComb } from '@widgets/contrastCombinations';
import { ColourInfo } from '@entities/colourInfoHeader';

import classes from './colourSetsPage.module.css';

export const ColourSetsPage = () => {
  const colour = localStorage.getItem('colourInfo');
  if (!colour) return <NotFound />;
  return (
    <section className={classes.wrapper}>
      <ColourInfo {...{ colour }} />
      <ColourInfoDetails {...{ colour }} />
      <ColourCombination {...{ colour }} />
      <ContrastComb {...{ colour }} />
    </section>
  );
};
