import { ReactElement, useState } from 'react';
import { createPortal } from 'react-dom';

import { Modal } from '@widgets/modalWindow';
import { ColourField } from '@entities/colourField';
import Button from '@shared/ui/Button/Button';

import { CardType } from '@shared/types/PalleteCard';

import { colourGenerator } from '@shared/utils/colourGenerator';
import { cardObjectGenerator } from '@shared/utils/palleteCardGenerator';

import classes from './btnHandler.module.css';

type props = {
  resetHandler: () => void;
  cardList: CardType[];
  onSetCardList: (data: CardType[]) => void;
  children: ReactElement;
  isShowBtn: boolean;
  addNewColour: (colour: string) => void;
};

export const BtnHandler = (props: props) => {
  const {
    resetHandler,
    cardList,
    onSetCardList,
    children,
    isShowBtn,
    addNewColour,
  } = props;
  const [isAddCard, setIsAddCard] = useState<boolean>(false);
  const [newColour, setNewColour] = useState<string>('');
  const initColour = colourGenerator();
  const modalWindowParams = {
    width: '300px',
    height: '350px',
  };
  const modalHandler = () => setIsAddCard((prev) => !prev);
  const onSetColour = (data: string) => setNewColour(data);
  const generateColours = () => {
    const list = [...cardList];
    for (let i = 0; i < list.length; i++) {
      if (list[i].isLocked) continue;
      list[i] = cardObjectGenerator(colourGenerator());
    }
    onSetCardList(list);
  };

  const addNewColourHand = () => {
    addNewColour(newColour);
    modalHandler();
  };
  const modalParams = { modalWindowParams, onClose: modalHandler };
  const newCOlourModal = () => {
    return (
      <>
        <div className={classes.title}>Add new colour</div>
        <ColourField {...{ initColour, onSetColour }} />
        <Button text="Add card" type="fill" onClickFunc={addNewColourHand} />
        <Button text="Cancel" onClickFunc={modalHandler} />
      </>
    );
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.btns}>
        <Button text="Reset" onClickFunc={resetHandler} />
        <Button text="Generate" onClickFunc={generateColours} type="fill" />
      </div>
      {children}
      {isShowBtn && (
        <div className={classes.newBtn}>
          <Button
            text="Add new colour"
            onClickFunc={modalHandler}
            type="border"
          />
        </div>
      )}
      {isAddCard &&
        createPortal(
          <Modal {...modalParams}>{newCOlourModal()}</Modal>,
          document.body
        )}
    </div>
  );
};
