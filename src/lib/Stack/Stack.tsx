import Box from '../Box';
import { styled } from '../stitches.config';
import { gaps } from '../theme/variants';

const Stack = styled(Box, {
  display: 'flex',

  variants: {
    space: gaps,
    align: {
      left: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
      right: {
        alignItems: 'flex-end',
      },
    },
    flow: {
      initial: {
        flexDirection: 'column',
      },
      reverse: {
        flexDirection: 'column-reverse',
      },
    },
    display: {
      block: {
        display: 'flex',
      },
      inline: {
        display: 'inline-flex',
      },
    },
  },
});

Stack.defaultProps = {
  space: 'none',
  flow: 'initial',
  wrap: 'nowrap',
  align: 'left',
};

export default Stack;
