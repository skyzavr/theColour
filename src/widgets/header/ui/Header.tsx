import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Switch } from '@entities/themeSwitcher';
import { NavBar } from '@entities/navBar';
import { useWidth } from '@shared/hooks/useWidth';

import classes from './header.module.css';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const widthSize = useWidth(resizeScreen);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  function resizeScreen() {
    setIsMenuOpen((prev) => (window.innerWidth >= 1480 ? false : prev));
  }
  const isMobileScreen = widthSize < 1480 && isMenuOpen;
  const menuBtn = () => {
    return (
      <>
        <div className={classes[`${isMenuOpen ? 'active' : 'passive'}`]}></div>
        <div className={classes[`${isMenuOpen ? 'passive' : 'active'}`]}></div>
      </>
    );
  };
  const OnLinkHandler = () => setIsMenuOpen(false);
  return (
    <header className={classes.wrapper}>
      <NavLink to="/" className={classes.title} onClick={OnLinkHandler}>
        The Colour
      </NavLink>
      <div className={classes.navWrapper}>
        <nav className={classes.menuWrapper}>
          <div className={isMobileScreen ? classes.showMenu : ''}>
            <NavBar onLinkHandler={OnLinkHandler} />
          </div>
        </nav>
        <div className={classes.controlEl}>
          <Switch />
          <div className={classes.menu} onClick={toggleMenu}>
            {menuBtn()}
          </div>
        </div>
      </div>
    </header>
  );
};
