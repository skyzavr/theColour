import classes from './contrastCombCard.module.css';

type props = { color: string; background: string; ratio: number };

export const ContrastCombCard = ({ color, background, ratio }: props) => {
  return (
    <div className={classes.item}>
      <div style={{ background }} className={classes.card}>
        <div style={{ color }}>Contrast ratio {ratio}</div>
      </div>
      <div className={classes.cardInfo}>
        <div className={classes.row}>
          <div>Background Colour</div>
          <div>{background}</div>
        </div>
        <div className={classes.row}>
          <div>Font Colour</div>
          <div>{color}</div>
        </div>
      </div>
    </div>
  );
};
