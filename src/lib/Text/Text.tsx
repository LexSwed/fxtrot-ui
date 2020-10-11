import { styled } from '../stitches.config';
import { textSize, font } from '../theme/variants';

const Text = styled('span', {
  p: 0,
  m: 0,
  color: '$text',
  variants: {
    font,
    size: textSize,
    tone: {
      light: {
        color: '$textLight',
      },
      success: {
        color: '$lightGreen600',
      },
      danger: {
        color: '$red600',
      },
    },
    ellipsis: {
      true: {
        minWidth: 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    },
  },
});

Text.defaultProps = {
  font: 'default',
  size: 'base',
};

export default Text;
