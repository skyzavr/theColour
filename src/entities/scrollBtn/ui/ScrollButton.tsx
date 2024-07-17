import { useState, useEffect } from 'react';

import classes from './scrollButton.module.css';

export const ScrollButton = () => {
  const [isScrollVisible, setIsScrollVisible] = useState<boolean>(false);

  const handleScroll = () =>
    setIsScrollVisible(window.scrollY > window.innerHeight - 600);

  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    isScrollVisible && (
      <button className={classes.btn} onClick={handleClick}>
        <svg
          width="18"
          height="12"
          viewBox="0 0 18 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.25 10.25L8.75 2.75L1.25 10.25"
            stroke="white"
            strokeWidth="3"
          />
        </svg>
      </button>
    )
  );
};
