import { hexToRGB } from '@shared/utils/colourConversion';

export const titles: string[] = [
  'Tints',
  'Shades',
  'Tones',
  'Blends by red',
  'Blends by green',
  'Blends by blue',
  'Blends by red and green',
  'Blends by red and blue',
  'Blends by green and blue',
];

export const getBlendSets = (colour: string) => {
  const [r, g, b] = hexToRGB(colour);
  return [
    [
      [{ name: 'r', value: r }],
      [
        { name: 'g', value: g },
        { name: 'b', value: b },
      ],
    ],
    [
      [{ name: 'g', value: g }],
      [
        { name: 'r', value: r },
        { name: 'b', value: b },
      ],
    ],
    [
      [{ name: 'b', value: b }],
      [
        { name: 'g', value: g },
        { name: 'r', value: r },
      ],
    ],

    [
      [
        { name: 'r', value: r },
        { name: 'g', value: g },
      ],
      [{ name: 'b', value: b }],
    ],
    [
      [
        { name: 'r', value: r },

        { name: 'b', value: b },
      ],
      [{ name: 'g', value: g }],
    ],
    [
      [
        { name: 'g', value: g },
        { name: 'b', value: b },
      ],
      [{ name: 'r', value: r }],
    ],
  ];
};
