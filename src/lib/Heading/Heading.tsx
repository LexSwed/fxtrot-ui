import React from 'react';
import { useDialog } from '../Dialog/utils';
import { styled } from '../stitches.config';

export const HeadingText = styled('h1', {
  fontFamily: '$heading',
  margin: 0,
  lineHeight: 1,
  color: '$text',

  variants: {
    as: {
      h1: {
        textSize: '$2xl',
        textTransform: 'uppercase',
      },
      h2: {
        textSize: '$2xl',
      },
      h3: {
        textSize: '$xl',
      },
      h4: {
        textSize: '$lg',
      },
      h5: {
        textSize: '$lg',
        textTransform: 'uppercase',
      },
      h6: {
        textSize: '$md',
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
    as: 'h1',
    variant: 'default',
  },
  {
    fontWeight: 900,
  }
);

const Heading: React.FC<React.ComponentPropsWithRef<typeof HeadingText>> = ({
  variant = 'default',
  as = 'h1',
  ...props
}) => {
  const { seed } = useDialog() || {};
  return <HeadingText variant={variant} as={as} id={seed?.('heading')} {...props} />;
};

export default Heading;
