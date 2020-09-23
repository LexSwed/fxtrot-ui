import { styled } from '../stitches.config';
import { gaps } from '../theme/space';

const Inline = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',

  variants: {
    space: gaps,

    align: {
      left: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      right: {
        justifyContent: 'flex-end',
      },
    },
    flow: {
      initial: {
        flexDirection: 'row',
      },
      reverse: {
        flexDirection: 'row-reverse',
      },
    },
    wrap: {
      'wrap': {
        flexWrap: 'wrap',
      },
      'nowrap': {
        flexWrap: 'nowrap',
      },
      'revert': {
        flexWrap: 'revert',
      },
      'wrap-reverse': {
        flexWrap: 'wrap-reverse',
      },
    },
  },
});

Inline.defaultProps = {
  space: 'none',
  flow: 'initial',
};

export default Inline;
