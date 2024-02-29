import DeleteIcon from '../assets/DeleteIcon';
import LockIcon from '../assets/LockIcon';
import GenerateIcon from '../assets/GenerateIcon';
import MoreInfoIcon from '../assets/MoreInfoIcon';

export const btns = [
  {
    comp: GenerateIcon,
    type: 'generate',
    tip: 'click here to generate a new colour',
  },
  {
    comp: LockIcon,
    type: 'lock',
    tip: 'click here to lock the colour',
  },

  {
    comp: DeleteIcon,
    type: 'delete',
    tip: 'it will remove this colour',
  },
  {
    comp: MoreInfoIcon,
    type: 'moreInfo',
    tip: 'click to see more info about colour',
  },
];
