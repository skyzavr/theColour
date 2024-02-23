import { useState, useEffect } from 'react';

import { ContrastCard } from '@entities/contrastCard';
import { CalcContrastRatio } from '@shared/utils/calculateContrastRatio';

import classes from './contrastCards.module.css';

type props = { colour: string; bgr: string };

export const ContrastCardMarks = ({ colour, bgr }: props) => {
  const calcRatio = CalcContrastRatio();

  const [contrastRatio, setContrastRatio] = useState<number>(
    calcRatio(colour, bgr)
  );

  const contrastMarkDesc = (ratio: number) => {
    if (ratio >= 12) return 'Great';
    if (ratio >= 7) return 'Good';
    return 'Poor';
  };

  const contrastMark = contrastMarkDesc(contrastRatio);

  const contrastCls = `${classes[`ContrastCard`]} ${classes[contrastMark]}`;
  const contrastCards = {
    large: { title: 'Large text', ratio: contrastRatio, AA: 3, AAA: 4.5 },
    standart: { title: 'Standard text', ratio: contrastRatio, AA: 4.5, AAA: 7 },
  };

  useEffect(() => {
    setContrastRatio(calcRatio(colour, bgr));
  }, [colour, bgr]);

  return (
    <div className={classes.wrapper}>
      <div className={contrastCls}>
        <div className={classes.info}>Contrast</div>
        <div className={classes.value}>{contrastRatio.toFixed(1)}</div>
        <div className={classes.desc}>{contrastMark}</div>
      </div>
      <ContrastCard {...contrastCards.large} />
      <ContrastCard {...contrastCards.standart} />
    </div>
  );
};
