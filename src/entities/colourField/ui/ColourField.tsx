import { useEffect, useState } from 'react';

import ColourFieldInput from '@shared/ui/ColourField/ColourField';
import ColourPicker from '@shared/ui/ColourPicker/ColourPicker';

import classes from './colourField.module.css';

type props = {
  initColour: string;
  onSetColour: (data: string) => void;
  title?: string;
};
type Error = {
  text: string;
  isError: boolean;
};
export const ColourField = ({ initColour, onSetColour, title }: props) => {
  const [colour, setColour] = useState<string>(initColour);
  const [error, setError] = useState<Error>({ text: '', isError: false });

  const onUpdateColour = (data: string) => {
    setColour(data);
    onSetColour(data);
  };
  const onUpdateError = ({ text, isError }: Error) =>
    setError({ text, isError });

  const params = { colour, onSetColour: onUpdateColour, onUpdateError };

  useEffect(() => {
    setColour(colour);
  }, [colour]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.fieldTitle}>{title}</div>
      <div className={classes.inputColourArea}>
        <ColourFieldInput {...params} />
        <ColourPicker {...params} />
      </div>
      <p className={classes.errorMsg}>{error.isError && error.text}</p>
    </div>
  );
};
