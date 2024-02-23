import { useState, ChangeEvent, useEffect } from 'react';

import classes from './colourPicker.module.css';

type props = {
  colour: string;
  onSetColour: (data: string) => void;
};

const ColourPicker = ({ colour, onSetColour }: props) => {
  const [value, setValue] = useState<string>(colour);

  const setColourHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    onSetColour(value);
  };

  useEffect(() => {
    setValue(colour);
  }, [colour]);

  return (
    <input
      type="color"
      value={value}
      style={{ color: colour }}
      onChange={(e) => setColourHandler(e)}
      className={classes.inputColourPicker}
    />
  );
};
export default ColourPicker;
