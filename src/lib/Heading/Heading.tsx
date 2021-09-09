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
        mt: '$3',
        mb: '$5',
      },
      2: {
        fontSize: '$4xl',
        mt: '$2',
        mb: '$4',
      },
      3: {
        fontSize: '$3xl',
        mt: '$2',
        mb: '$4',
      },
      4: {
        fontSize: '$2xl',
        mt: '$1',
        mb: '$3',
      },
      5: {
        fontSize: '$xl',
        mt: '$1',
        mb: '$2',
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
