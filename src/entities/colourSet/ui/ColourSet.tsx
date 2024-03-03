import { Link } from 'react-router-dom';

import { btns } from '../model';

import classes from './colourSet.module.css';

type props = {
  param: {
    [key: string]: boolean;
  };
  colour: string;
  onUpdateParam: (data: { data: string; val: boolean }) => void;
};
export const ColourSet = ({ param, colour, onUpdateParam }: props) => {
  const linkParams = {
    target: '_blank',
    to: '/ColourInfo',
    onClick: () => localStorage.setItem('colourInfo', colour),
  };
  const btnHandler = (data: string) => {
    return data === 'lock'
      ? onUpdateParam({ data, val: !param.lock })
      : onUpdateParam({ data, val: true });
  };

  const classname = (type: string) => {
    const isLock = type === 'lock' && param.lock;
    return `${classes.btnItem} ${(isLock && classes.locked) || ''}`;
  };

  const keyGen = () => Math.floor(Math.random() * 10000);
  return (
    <div className={classes.colourParams}>
      <div className={classes.colourName}>{colour}</div>
      <div className={classes.colourBtns}>
        {btns.map(({ comp, type }) => (
          <div
            className={classname(type)}
            key={keyGen()}
            onClick={() => btnHandler(type)}
          >
            {type === 'moreInfo' ? (
              <Link {...linkParams}>{comp()}</Link>
            ) : (
              comp()
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
