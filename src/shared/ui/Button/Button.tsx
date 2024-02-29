import { ReactElement } from 'react';

import classes from './button.module.css';

type props = {
  text: string;
  onClickFunc: () => void;
  type?: string;
  children?: ReactElement;
};

const Button = ({ text, onClickFunc, type = 'none', children }: props) => {
  return (
    <button onClick={onClickFunc} className={`${classes.btn} ${classes[type]}`}>
      {text}
      <div className={classes.icon}>{children}</div>
    </button>
  );
};
export default Button;
