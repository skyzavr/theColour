import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import classes from './colourField.module.css';

type props = {
  colour: string;
  onSetColour: (data: string) => void;
  onUpdateError: (data: { text: string; isError: boolean }) => void;
};

const ColourFieldInput = ({ colour, onSetColour, onUpdateError }: props) => {
  const [value, setValue] = useState<string>(colour.toUpperCase());
  const errorMsgs = {
    length: 'The value must contain 6 characters',
    wrongSymb: 'The value must contain letters A to F and numbers',
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateError('', false);
    const value = e.target.value;
    const updateValue = value.startsWith('#') ? value : '#' + value;
    setValue(updateValue);
  };

  const updateError = (text: string, isError: boolean) =>
    onUpdateError({ text, isError });

  const errorHandling = () => {
    updateError('', false);
    const length = value.startsWith('#') ? value.length - 1 : value.length;

    if (length !== 6) return updateError(errorMsgs.length, true);
    if (!/^[a-fA-F0-9]+$/.test(value.slice(1)))
      return updateError(errorMsgs.wrongSymb, true);

    return onSetColour(value);
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') errorHandling();
  };

  const onBlurHandler = () => errorHandling();

  useEffect(() => {
    setValue(colour.toUpperCase());
    errorHandling();
  }, [colour]);

  return (
    <input
      type="text"
      placeholder={value}
      value={value}
      className={classes.inputColour}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      onKeyUp={(e) => onKeyUp(e)}
    />
  );
};
export default ColourFieldInput;
