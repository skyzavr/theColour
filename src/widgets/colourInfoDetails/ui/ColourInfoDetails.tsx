import { colourConvertor } from '@shared/utils/palleteCardGenerator';
import { keyGen } from '@shared/utils/keyGen';

import classes from './colourInfoDetails.module.css';

export const ColourInfoDetails = ({ colour }: { colour: string }) => {
  const colourSystemDetails = () => {
    return {
      HEX: colour,
      ...colourConvertor(colour),
    };
  };

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.colouredCard}
        style={{ backgroundColor: `${colour}` }}
      ></div>
      <div className={classes.container}>
        {Object.entries(colourSystemDetails()).map(([key, value]) => (
          <div className={classes.item} key={keyGen()}>
            <div className={classes.systemName}>{key}:</div>
            <div className={classes.systemValue}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
