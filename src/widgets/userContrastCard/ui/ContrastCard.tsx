import classes from './contrastCard.module.css';
type props = { colour: string; bgr: string; text: string; hint: string };
export const ContrastCard = ({ colour, bgr, text, hint }: props) => {
  return (
    <div className={classes.card} style={{ backgroundColor: `${bgr}` }}>
      <div className={classes.title} style={{ color: `${colour}` }}>
        Quote # 3483
      </div>
      <div className={classes.text} style={{ color: `${colour}` }}>
        {text}
      </div>
      <div className={classes.sign}>
        <span className={classes.tooltip}>
          <span className={classes.tooltipHint}>{hint}</span>
          <span className={classes.tooltipText} style={{ color: `${colour}` }}>
            Tim Bradford
          </span>
        </span>
      </div>
    </div>
  );
};
