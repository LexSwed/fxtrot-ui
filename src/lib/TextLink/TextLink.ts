import { styled } from '../stitches.config';
import { textSize, font } from '../theme/variants';

const TextLink = styled('a', {
  'color': '$primaryStill',
  'textDecoration': 'none',
  'boxSizing': 'border-box',
  'cursor': 'pointer',
  'fontWeight': 600,
  ':hover': {
    textDecoration: 'underline',
  },
  ':focus': {
    textDecoration: 'underline',
  },
  ':visited': {
    color: '$primaryActive',
  },

  'variants': {
    font,
    size: textSize,
  },
});

TextLink.defaultProps = {
  font: 'default',
  size: 'base',
};

export default TextLink;
