import { useEffect, useState } from 'react';

import { ColourSet } from '@entities/colourSet';
import { ColourSystem } from '@entities/colourCardSystems';
import { ColourCard } from '@entities/colourCard';

import classes from './paletteCard.module.css';

type props = {
  onUpdateCardParam: (data: { id: number; type: string; val: boolean }) => void;
  colour: string;
  colourSet: { [key: string]: string };
  id: number;
  isLocked: boolean;
};
type propParam = { [key: string]: boolean };
type CardParam = { data: string; val: boolean };

export const PaletteCard = (props: props) => {
  const { colour, colourSet, isLocked, id, onUpdateCardParam } = props;
  const [param, setParam] = useState<propParam>({
    generate: false,
    lock: false,
    delete: false,
    moreInfo: false,
  });

  const onUpdateParam = ({ data, val }: CardParam) => {
    const copyParam = { ...param };
    copyParam[data] = val;
    setParam(copyParam);
    onUpdateCardParam({ id, type: data, val });
  };
  useEffect(() => {
    setParam({ ...param, lock: isLocked });
  }, [isLocked]);
  return (
    <div className={classes.wrapper}>
      <ColourCard {...{ colour }} />
      <ColourSet {...{ param, colour, onUpdateParam }} />
      <ColourSystem {...{ colourSet }} />
    </div>
  );
};
