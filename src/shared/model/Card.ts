import converter from '@pages/home/ui/assets/colorConverter.svg';
import contrast from '@pages/home/ui/assets/contrastChecker.svg';
import palette from '@pages/home/ui/assets/imgPallete.svg';
import generator from '@pages/home/ui/assets/paletteGen.svg';

export type Card = { id: number; path: string; title: string; comp: string };

export const cards: Card[] = [
  { id: 1, path: '/generator', title: 'Palette Generator', comp: generator },
  { id: 2, path: '/converter', title: 'Colour converter', comp: converter },
  { id: 3, path: '/contrast', title: 'Contrast Checker', comp: contrast },
  { id: 4, path: '/palette', title: 'Image Palette', comp: palette },
];
