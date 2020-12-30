import React from 'react';
import type { StitchesProps } from '@stitches/react';

import { useDialog } from '../Dialog/utils';
import { styled } from '../stitches.config';

export const HeadingText = styled('h1', {
  fontFamily: '$heading',
  margin: 0,
  lineHeight: 1,
  color: '$text',

  variants: {
    level: {
      1: {
        fontSize: '$2xl',
        mt: '$3',
        mb: '$5',
      },
      2: {
        fontSize: '$2xl',
        mt: '$2',
        mb: '$4',
      },
      3: {
        fontSize: '$xl',
        mt: '$2',
        mb: '$4',
      },
      4: {
        fontSize: '$lg',
        mt: '$1',
        mb: '$3',
      },
      5: {
        fontSize: '$lg',
        textTransform: 'uppercase',
        mt: '$1',
        mb: '$2',
      },
      6: {
        fontSize: '$md',
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
});

HeadingText.compoundVariant(
  {
    level: 1,
    variant: 'default',
  },
  {
    fontWeight: 800,
  }
);

interface Props extends Omit<StitchesProps<typeof HeadingText>, 'as'> {}

const Heading = React.forwardRef<HTMLHeadingElement, Props>(({ variant = 'default', level = 1, ...props }, ref) => {
  const { seed } = useDialog() || {};
  return (
    <HeadingText variant={variant} as={`h${level}` as any} level={level} id={seed?.('heading')} {...props} ref={ref} />
  );
});

export default Heading;
