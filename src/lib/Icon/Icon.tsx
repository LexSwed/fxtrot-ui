import { styled } from '../stitches.config';

const IconBox = styled('svg', {
  flexShrink: 0,
  variants: {
    size: {
      'xs': {
        size: '$2',
      },
      'sm': {
        size: '$3',
      },
      'md': {
        size: '$4',
      },
      'base': {
        size: '$4',
      },
      'lg': {
        size: '$5',
      },
      'xl': {
        size: '$6',
      },
      '2xl': {
        size: '$12',
      },
      '3xl': {
        size: '$16',
      },
      '4xl': {
        size: '$20',
      },
      '5xl': {
        size: '$24',
      },
      '6xl': {
        size: '$32',
      },
    },
  },
});

const Icon: React.FC<React.ComponentPropsWithRef<typeof IconBox> & { as: React.ElementType }> = ({
  size = 'md',
  ...props
}) => <IconBox size={size} {...props} />;

export default Icon;
