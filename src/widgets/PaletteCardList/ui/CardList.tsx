import { useState } from 'react';

import { Card } from '@widgets/paletteCard';
import { BtnHandler } from '@entities/palleteBtnControl';

import { colourGenerator } from '@shared/utils/colourGenerator';
import { cardObjectGenerator } from '@shared/utils/palleteCardGenerator';
import { CardType } from '@shared/types/PalleteCard';

import classes from './cardList.module.css';

type updateParams = { id: number; type: string; val: boolean };
type props = { defCardList: CardType[] };

export const CardList = ({ defCardList }: props) => {
  const maxCardNumber = 10;
  const deepCopy = JSON.parse(JSON.stringify(defCardList));
  const [cardList, setCardList] = useState(deepCopy);
  const isShowBtn = maxCardNumber > cardList.length;

  const onUpdateCardParam = (params: updateParams) => {
    const { id, type, val } = params;
    const list = [...cardList];
    const index = list.findIndex((el) => el.id === id);
    switch (type) {
      case 'generate':
        list[index] = cardObjectGenerator(colourGenerator());
        break;
      case 'lock':
        list[index].isLocked = val;
        break;
      case 'delete':
        return setCardList([
          ...list.slice(0, index),
          ...list.slice(index + 1, list.length),
        ]);
      default:
        return;
    }
    return setCardList(list);
  };
  const resetHandler = () => setCardList(deepCopy);
  const addNewColour = (colour: string) => {
    setCardList([...cardList, cardObjectGenerator(colour)]);
  };
  const onSetCardList = (data: CardType[]) => setCardList(data);
  const btnParams = {
    resetHandler,
    cardList,
    onSetCardList,
    isShowBtn,
    addNewColour,
  };
  return (
    <>
      <div className={classes.mainWrapper}>
        <BtnHandler {...btnParams}>
          <div className={classes.wrapper}>
            {cardList.map((el: CardType) => (
              <Card {...{ ...el, onUpdateCardParam }} key={el.id} />
            ))}
          </div>
        </BtnHandler>
      </div>
    </>
  );
};
