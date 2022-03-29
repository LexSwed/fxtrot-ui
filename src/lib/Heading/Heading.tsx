import { styled } from '../stitches.config';

export const Heading = styled('h1', {
  fontFamily: '$heading',
  margin: 0,
  lineHeight: 1,
  color: '$text',

  variants: {
    level: {
      1: {
        fontSize: '$5xl',
        mt: '$6',
        mb: '$4',
      },
      2: {
        fontSize: '$4xl',
        mt: '$5',
        mb: '$3',
      },
      3: {
        fontSize: '$3xl',
        mt: '$4',
        mb: '$3',
      },
      4: {
        fontSize: '$2xl',
        mt: '$3',
        mb: '$2',
      },
      5: {
        fontSize: '$xl',
        mt: '$2',
        mb: '$1',
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
        fontWeight: 400,
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
