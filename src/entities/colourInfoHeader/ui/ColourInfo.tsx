import classes from './colourInfo.module.css';

export const ColourInfo = ({ colour }: { colour: string }) => {
  const onClose = () => window.close();

  return (
    <div className={classes.wrapperInfo}>
      <div className={classes.info}>
        <div className={classes.title}>Color information</div>
        <div className={classes.hexName}>{colour}</div>
      </div>
      <div className={classes.closeBtn} onClick={onClose}>
        Close
      </div>
    </div>
  );
};
