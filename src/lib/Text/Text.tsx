import { styled } from '../stitches.config';
import { textSize, font } from '../theme/variants';

const Text = styled('span', {
  p: 0,
  m: 0,
  color: '$text',
  fontFamily: '$default',
  textSize: '$base',
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
    align: {
      start: {
        textAlign: 'start',
      },
      center: {
        textAlign: 'center',
      },
      end: {
        textAlign: 'end',
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

export default Text;
