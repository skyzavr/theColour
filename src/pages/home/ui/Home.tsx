import { Card } from '@entities/cardPage';

import { cards } from '@shared/model/Card';

import classes from './home.module.css';

export const Home = () => {
  return (
    <div className={classes.wrapper}>
      {cards.map((el) => (
        <Card {...el} key={el.id} />
      ))}
    </div>
  );
};
