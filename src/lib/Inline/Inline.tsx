import Box from '../Box';
import { styled } from '../stitches.config';
import { gaps } from '../theme/variants';

const Inline = styled(Box, {
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
    alignY: {
      top: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
      bottom: {
        alignItems: 'flex-end',
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

Inline.defaultProps = {
  space: 'none',
  flow: 'initial',
  align: 'left',
  alignY: 'center',
};

export default Inline;
