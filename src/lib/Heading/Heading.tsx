import { styled } from '../stitches.config';

const HeadingText = styled('h1', {
  fontFamily: '$heading',
  margin: 0,
  lineHeight: 1,
  color: '$text',

  variants: {
    as: {
      h1: {
        textSize: '$3xl',
        textTransform: 'uppercase',
      },
      h2: {
        textSize: '$2xl',
      },
      h3: {
        textSize: '$2xl',
      },
      h4: {
        textSize: '$lg',
        textTransform: 'uppercase',
      },
      h5: {
        textSize: '$md',
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

const Heading: React.FC<React.ComponentPropsWithRef<typeof HeadingText>> = ({ variant = 'default', ...props }) => {
  return <HeadingText variant={variant} {...props} />;
};

export default Heading;
