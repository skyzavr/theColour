import { useContext, useEffect } from 'react';
import { ThemeContext, ThemeContextType } from '@app/context/ThemeContext';

import classes from './switch.module.css';

import light from './assets/light.svg';
import dark from './assets/dark.svg';

export const Switch = () => {
  const { theme, setTheme } = useContext(ThemeContext) as ThemeContextType;
  const isDark = theme === 'dark';
  const themeToggle = () => setTheme(isDark ? 'light' : 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button className={classes.theme} onClick={themeToggle}>
      <img src={isDark ? light : dark} alt={theme} />
    </button>
  );
};
