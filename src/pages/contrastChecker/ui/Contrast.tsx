import { useState } from 'react';

import { ContrastCard } from '@widgets/userContrastCard';
import { ContrastCardMarks } from '@widgets/ContrastCardsMark';
import { ColourField } from '@entities/colourField';
import TextField from '@shared/ui/textField/TextField';

import { colourGenerator } from '@shared/utils/colourGenerator';

import classes from './contrast.module.css';

export const Contrast = () => {
  const quote = `I am unwilling to let fear make me do something I’ll be ashamed of in the light of day`;
  const hint = 'The Rookie. 1x15, 34:58';

  const [colour, setColour] = useState<string>(colourGenerator());
  const [bgr, setBgr] = useState<string>(colourGenerator());
  const [text, setText] = useState<string>(quote);

  const setTextArea = (data: string) => setText(data);
  const newColourHandler = (data: string) => setColour(data);
  const newBgrHandler = (data: string) => setBgr(data);

  const colourParams = { colour, bgr, text, hint };

  return (
    <div className={classes.wrapper}>
      <div className={classes.contrastInfo}>
        <div className={classes.title}>Contrast Checker</div>
        <div className={classes.info}>
          <p>
            Check the contrast of the text colour and the background colour.
            Choose a background color and a text color to check it out.
          </p>
          <p>You can see it in our text or enter your own. </p>
          <p>You can also generate a color.</p>
        </div>
        <ContrastCardMarks {...colourParams} />
      </div>
      <div className={classes.contrast}>
        <div className={classes.colourInputField}>
          <ColourField initColour={colour} onSetColour={newColourHandler} />
          <ColourField initColour={bgr} onSetColour={newBgrHandler} />
        </div>
        <TextField onSetText={setTextArea} quote={text} />
        <ContrastCard {...colourParams} />
      </div>
    </div>
  );
};
