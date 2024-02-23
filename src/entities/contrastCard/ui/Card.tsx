import { useState, useEffect } from 'react';

import classes from './card.module.css';

type prop = { title: string; ratio: number; AA: number; AAA: number };

export const ContrastCard = (props: prop) => {
  const { title, ratio, AA, AAA } = props;

  const calcMark = () => {
    if (ratio >= Number(AAA)) return 'Great';
    if (ratio >= Number(AA)) return 'Good';
    return 'Poor';
  };

  const [mark, setMark] = useState(calcMark());

  useEffect(() => {
    setMark(calcMark());
  }, [ratio]);

  return (
    <div className={`${classes[`wrapper`]} ${classes[`${mark}`]}`}>
      <div className={classes.title}>{title}</div>
      <div className={classes.cardInfo}>
        <div className={classes.infoTitle}>AA</div>
        <div className={classes.infoValue}>{AA}:1</div>
      </div>
      <div className={classes.cardInfo}>
        <div className={classes.infoTitle}>AAA</div>
        <div className={classes.infoValue}>{AAA}:1</div>
      </div>
    </div>
  );
};
