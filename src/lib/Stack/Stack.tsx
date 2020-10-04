import Box from '../Box';
import { styled } from '../stitches.config';
import { gaps } from '../theme/variants';

const Stack = styled(Box, {
  display: 'flex',

  variants: {
    space: gaps,
    display: {
      block: {
        display: 'flex',
      },
      inline: {
        display: 'inline-flex',
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
    flow: {
      'row': {
        flexDirection: 'row',
      },
      'row-reverse': {
        flexDirection: 'row-reverse',
      },
      'column': {
        flexDirection: 'column',
      },
      'column-reverse': {
        flexDirection: 'column-reverse',
      },
    },
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
      stretch: {
        alignItems: 'stretch',
      },
    },
    alignY: {
      top: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      bottom: {
        justifyContent: 'flex-end',
      },
      stretch: {
        justifyContent: 'stretch',
      },
    },
  },
});

const rowStyles = {
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
    stretch: {
      justifyContent: 'stretch',
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
};

Object.entries(rowStyles).forEach(([prop, variants]) => {
  Object.entries(variants).forEach(([variant, styles]) => {
    Stack.compoundVariant(
      {
        flow: 'row',
        [prop]: variant,
      },
      styles as any
    );
    Stack.compoundVariant(
      {
        flow: 'row-reverse',
        [prop]: variant,
      },
      styles as any
    );
  });
});

Stack.defaultProps = {
  space: 'none',
  flow: 'column',
  wrap: 'nowrap',
  align: 'left',
};

export default Stack;
