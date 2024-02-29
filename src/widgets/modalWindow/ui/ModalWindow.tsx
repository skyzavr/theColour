import { ReactElement } from 'react';

import classes from './modalWindow.module.css';

type props = {
  children: ReactElement;
  modalWindowParams: { height: string; width: string };
  onClose: () => void;
};
export const Modal = ({ children, modalWindowParams, onClose }: props) => {
  const { width, height } = modalWindowParams;
  return (
    <div className={classes.wrapper}>
      <div className={classes.back} onClick={onClose}></div>
      <div className={classes.modal} style={{ width: width, height: height }}>
        {children}
      </div>
    </div>
  );
};
