import { styled } from '../stitches.config';

export const Heading = styled('h1', {
  fontFamily: '$heading',
  lineHeight: 1,
  color: '$text',
  my: '1.2em',

  variants: {
    level: {
      1: {
        fontSize: '$5xl',
        my: '1.1em',
      },
      2: {
        fontSize: '$4xl',
      },
      3: {
        fontSize: '$3xl',
        textTransform: 'uppercase',
      },
      4: {
        fontSize: '$2xl',
      },
      5: {
        fontSize: '$xl',
      },
      6: {
        fontSize: '$xl',
      },
    },
    variant: {
      default: {
        fontWeight: 600,
      },
      light: {
        fontWeight: 300,
      },
    },
  },
  compoundVariants: [
    {
      level: '1',
      variant: 'default',
      css: {
        fontWeight: 800,
      },
    },
  ],
  defaultVariants: {
    variant: 'default',
    level: '1',
  },
});
