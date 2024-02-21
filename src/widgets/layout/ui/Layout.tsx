import { Header } from '@widgets/header';
import classes from './layout.module.css';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <Header />
      <hr className={classes.hr} />
      <main>
        <Outlet />
      </main>
    </>
  );
};
