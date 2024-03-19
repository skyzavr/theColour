import { useState } from 'react';

import { useCopyClipboard } from '@shared/hooks/useCopyClipboard';
import { rgbToHex } from '@shared/utils/colourConversion';
import { CalcContrastRatio } from '@shared/utils/calculateContrastRatio';

import { CopiedIcon } from './assets/CopiedIcon';

import classes from './colourSetItem.module.css';

const ColourItem = ({ colour }: { colour: string }) => {
  const copy = useCopyClipboard(rgbToHex(colour));
  const ratio = CalcContrastRatio();
  const [light, dark] = ['#F5F5F5', '#131313'];
  const [visible, setVisible] = useState<boolean>(false);
  const [iconColour, setIconColour] = useState<string>('');

  const onCopy = () => {
    copy();
    const hexColour = colour.includes('#') ? colour : rgbToHex(colour);
    setIconColour(ratio(light, hexColour) <= 10 ? dark : light);
    setVisible((vis) => !vis);
    setTimeout(() => {
      setVisible((vis) => !vis);
    }, 1000);
  };
  return (
    <div onClick={onCopy} className={classes.wrapper}>
      <div className={`${classes.icon} ${visible ? classes.visible : ''}`}>
        {<CopiedIcon {...{ iconColour }} />}
      </div>
    </div>
  );
};
export default ColourItem;
