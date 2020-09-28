import { styled } from '../stitches.config';
import { textSize, font } from '../theme/variants';

const Text = styled('span', {
  variants: {
    font,
    size: textSize,
  },
});

Text.defaultProps = {
  font: 'default',
  size: 'base',
};

export default Text;
