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
        fontSize: '$2xl',
        textTransform: 'uppercase',
        mt: '$3',
        mb: '$5',
      },
      h2: {
        fontSize: '$2xl',
        mt: '$2',
        mb: '$4',
      },
      h3: {
        fontSize: '$xl',
        mt: '$2',
        mb: '$4',
      },
      h4: {
        fontSize: '$lg',
        mt: '$1',
        mb: '$3',
      },
      h5: {
        fontSize: '$lg',
        textTransform: 'uppercase',
        mt: '$1',
        mb: '$2',
      },
      h6: {
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
