import { classed } from '@tw-classed/react';
import { Button } from '../button';

export const IconButton = classed(Button, {
  variants: {
    size: {
      xs: 'px-0 inline-size-6',
      sm: 'px-0 inline-size-8',
      md: 'inline-size-10',
      lg: 'inline-size-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
//  {
//   position: 'relative',
//   padding: 0,
//   justifyContent: 'center',
//   alignItems: 'center',

//   variants: {
//     size: {
//       xs: {
//         px: 0,
//         inlineSize: '$6',
//       },
//       sm: {
//         px: 0,
//         inlineSize: '$8',
//       },
//       md: {
//         inlineSize: '$base',
//       },
//       lg: {
//         inlineSize: '$12',
//       },
//     },
//   },
//   defaultVariants: {
//     size: 'md',
//   },
// });
