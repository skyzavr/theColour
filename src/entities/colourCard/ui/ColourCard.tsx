import { useCopyClipboard } from '@shared/hooks/useCopyClipboard';

import ColourItem from '@shared/ui/colourItem/ColourSetItem';

import classes from './colourCard.module.css';

type props = { colour: string };

export const ColourCard = ({ colour }: props) => {
  const copy = useCopyClipboard(colour);
  const onCopy = () => copy();

  return (
    <>
      <div className={classes.colourCard} onClick={onCopy}>
        <div
          className={classes.bgr}
          style={{ backgroundColor: `${colour}` }}
        ></div>
        <div className={classes.wrapper}>
          <ColourItem {...{ colour }} />
          <div className={classes.hoverText}>
            <div className={classes.colourHover}>{colour}</div>
            <div className={classes.textHover}>Click to copy</div>
          </div>
        </div>
      </div>
    </>
  );
};
