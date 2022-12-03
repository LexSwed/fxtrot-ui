import type { ComponentProps } from 'react';
import { styled, keyframes } from '../stitches.config';

interface Props extends ComponentProps<typeof Main> {}

export const Spinner = ({ size = 'md', ...props }: Props) => {
  return (
    <Main size={size} {...props} viewBox="0 0 50 50" role="progressbar" aria-valuemin={0} aria-valuemax={100}>
      <Circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
    </Main>
  );
};

const rotate = keyframes({
  '100%': {
    transform: 'rotate(360deg)',
  },
});

const dash = keyframes({
  '0%': {
    strokeDasharray: '1, 150',
    strokeDashoffset: '0',
  },
  '50%': {
    strokeDasharray: '90, 150',
    strokeDashoffset: '-35',
  },
  '100%': {
    strokeDasharray: '90, 150',
    strokeDashoffset: '-124',
  },
});

const Main = styled('svg', {
  animation: `${rotate} 2s linear infinite`,
  variants: {
    size: {
      sm: {
        size: '$5',
      },
      md: {
        size: '$8',
      },
      lg: {
        size: '$16',
      },
      xl: {
        size: '$24',
      },
    },
  },
});

const Circle = styled('circle', {
  stroke: 'currentColor',
  strokeLinecap: 'round',
  animation: `${dash} 1.5s ease-in-out infinite`,
});
