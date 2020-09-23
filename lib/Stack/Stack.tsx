import { styled } from '../stitches.config';
import { gaps } from '../theme/space';

const Stack = styled('div', {
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
};

export default Stack;
