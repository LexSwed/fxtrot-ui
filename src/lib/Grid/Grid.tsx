import Box from '../Box/Box';
import { gaps } from '../theme/variants';
import { styled } from '../stitches.config';

const Grid = styled(Box, {
  variants: {
    gap: gaps,
    display: {
      grid: {
        display: 'grid',
      },
      inline: {
        display: 'inline-grid',
      },
    },
  },
  defaultVariants: {
    display: 'grid',
    gap: 'none',
  },
});

export default Grid;
