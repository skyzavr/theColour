import { ChangeEvent, useState } from 'react';

import classes from './textField.module.css';

type props = {
  quote: string;
  onSetText: (data: string) => void;
};

const TextField = ({ quote, onSetText }: props) => {
  const [text, setText] = useState<string>(quote);

  const updateTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    onSetText(value);
  };

  return (
    <div className={classes.textInputField}>
      <label htmlFor="text">Your text</label>
      <input
        id="text"
        type="text"
        value={text}
        onChange={updateTextHandler}
        maxLength={140}
      />
    </div>
  );
};
export default TextField;
