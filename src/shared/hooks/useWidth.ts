import { useState, useEffect } from 'react';

type prop = () => void;

export const useWidth = (resizeScreen: prop) => {
  const [widthSize, setWidthSize] = useState(window.innerWidth);

  const resize = () => {
    setWidthSize(window.innerWidth);
    resizeScreen();
  };
  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  return widthSize;
};
