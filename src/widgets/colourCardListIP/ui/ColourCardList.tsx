import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { ThemeContext } from '@app/context/ThemeContext';

import ColourSetItem from '@shared/ui/colourSetItem/ColourSetItem';
import Button from '@shared/ui/Button/Button';
import { hexToRGB } from '@shared/utils/colourConversion';
import { Icon } from '../assets/Icon';

import classes from './colourCardList.module.css';

type props = {
  list: string[];
  length?: number;
};

export const ColourCardList = ({ list, length = 10 }: props) => {
  const listLen = list.length < length ? list.length : length;
  const [len, setLen] = useState<number>(listLen);
  const theme = useContext(ThemeContext);

  const linkParams = {
    target: '_blank',
    to: '/ColourInfo',
  };
  const onLink = (colour: string) => localStorage.setItem('colourInfo', colour);

  const hexToRGBString = (colour: string) => {
    const [r, g, b] = hexToRGB(colour);
    return `${r},${g},${b}`;
  };

  const getIconColour = () => (theme?.theme === 'dark' ? '#F5F5F5' : '#131313');

  const onUpdateLen = () => {
    const lenMes = len + 10;
    const newLen = lenMes > list.length ? lenMes : list.length;
    setLen(newLen);
  };

  return (
    <section className={classes.wrapper}>
      <ul className={classes.list}>
        {list.slice(0, len).map((el) => (
          <li key={el}>
            <ColourSetItem colour={hexToRGBString(el)} />
            <div className={classes.cardInfo}>
              <div>{el}</div>
              <Link {...{ ...linkParams, onClick: () => onLink(el) }}>
                <Icon iconColour={getIconColour()} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {list.length > len && (
        <Button text="Show more" onClickFunc={onUpdateLen} type="border" />
      )}
    </section>
  );
};
