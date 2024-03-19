import { Link } from 'react-router-dom';

import { Card } from '@shared/types/Card';

import classes from './cardPage.module.css';

export const CardPage = ({ path, title, comp }: Card) => {
  return (
    <div className={classes.card}>
      <Link to={path}>
        <div className={classes.cardImg}>
          <img src={comp} alt={title} />
        </div>
        <div className={classes.cardTitle}>{title}</div>
      </Link>
    </div>
  );
};
