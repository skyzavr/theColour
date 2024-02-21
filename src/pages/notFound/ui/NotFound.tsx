import { useNavigate } from 'react-router-dom';

import Button from '@shared/ui/Button/Button';

import classes from './notFound.module.css';

export const NotFound = () => {
  const navigate = useNavigate();
  const navigateToHome = () => navigate('/');

  return (
    <section className={classes.wrapper} onClick={navigateToHome}>
      <div className={classes.title}>Oops</div>
      <div className={classes.desc}>Something went wrong</div>
      <div className={classes.btn}>
        <Button text="Go Home" type="border" onClickFunc={navigateToHome} />
      </div>
    </section>
  );
};
