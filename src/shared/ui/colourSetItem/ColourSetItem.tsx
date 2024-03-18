import { useState } from 'react';

import { CopiedIcon } from './assets/CopiedIcon';

import { useCopyClipboard } from '@shared/hooks/useCopyClipboard';
import { rgbToHex } from '@shared/utils/colourConversion';
import { CalcContrastRatio } from '@shared/utils/calculateContrastRatio';

import classes from './colourSetItem.module.css';

const ColourSetItem = ({ colour }: { colour: string }) => {
  const copy = useCopyClipboard(rgbToHex(colour));
  const ratio = CalcContrastRatio();
  const [light, dark] = ['#F5F5F5', '#131313'];
  const [visible, setVisible] = useState<boolean>(false);
  const [iconColour, setIconColour] = useState<string>('');

  const onCopy = () => {
    copy();
    const hexColour = rgbToHex(colour);
    setIconColour(ratio(light, hexColour) <= 10 ? dark : light);
    setVisible((vis) => !vis);
    setTimeout(() => {
      setVisible((vis) => !vis);
    }, 1000);
  };
  return (
    <div
      style={{ background: `rgb(${colour})` }}
      className={classes.listItem}
      onClick={onCopy}
    >
      <div className={`${classes.icon} ${visible ? classes.visible : ''}`}>
        {<CopiedIcon {...{ iconColour }} />}
      </div>
    </div>
  );
};
export default ColourSetItem;
