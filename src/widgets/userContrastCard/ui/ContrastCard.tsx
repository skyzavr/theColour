import ToolTip from '@shared/ui/ToolTip/ToolTip';

import classes from './contrastCard.module.css';

type props = { colour: string; bgr: string; text: string; hint: string };

export const ContrastCard = ({ colour, bgr, text, hint }: props) => {
  const tooltipParams = { hint, style: { color: colour } };

  return (
    <div className={classes.card} style={{ backgroundColor: `${bgr}` }}>
      <div className={classes.title} style={{ color: `${colour}` }}>
        Quote # 3483
      </div>
      <div className={classes.text} style={{ color: `${colour}` }}>
        {text}
      </div>
      <div className={classes.sign}>
        <ToolTip {...tooltipParams}>Tim Bradford</ToolTip>
      </div>
    </div>
  );
};
