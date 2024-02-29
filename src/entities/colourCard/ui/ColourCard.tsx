import classes from './colourCard.module.css';

type props = { colour: string };

export const ColourCard = ({ colour }: props) => {
  return (
    <div className={classes.colourCard}>
      <div
        className={classes.bgr}
        style={{ backgroundColor: `${colour}` }}
      ></div>
      <div className={classes.hoverText}>
        <div className={classes.colourHover}>{colour}</div>
        <div className={classes.textHover}>Click to copy</div>
      </div>
    </div>
  );
};
