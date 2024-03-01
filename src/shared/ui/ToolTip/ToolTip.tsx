import { ReactElement } from 'react';

import classes from './toolTip.module.css';

type props = {
  hint: string;
  children: ReactElement | string;
  style?: { [key: string]: string };
};

const ToolTip = ({ hint, children, style }: props) => {
  return (
    <span className={classes.tooltip}>
      <span className={classes.tooltipHint}>{hint}</span>
      <span className={classes.tooltipText} style={style}>
        {children}
      </span>
    </span>
  );
};
export default ToolTip;
