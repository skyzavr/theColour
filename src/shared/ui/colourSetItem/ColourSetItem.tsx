import ColourItem from '../colourItem/ColourSetItem';

import classes from './colourSetItem.module.css';

const ColourSetItem = ({ colour }: { colour: string }) => {
  return (
    <div style={{ background: `rgb(${colour})` }} className={classes.listItem}>
      <ColourItem colour={colour} />
    </div>
  );
};
export default ColourSetItem;
