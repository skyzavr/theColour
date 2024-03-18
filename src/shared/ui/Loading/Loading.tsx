import classes from './loading.module.css';
const Loading = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.loader}></div>
      <div className={classes.title}>Loading</div>
    </div>
  );
};
export default Loading;
