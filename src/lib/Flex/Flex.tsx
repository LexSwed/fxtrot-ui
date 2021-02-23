import { styled } from '../stitches.config';
import { gaps } from '../theme/variants';

export const flexProps = {
  variants: {
    gap: gaps,
    inline: {
      true: {
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
    main: {
      start: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'flex-end',
      },
      stretch: {
        justifyContent: 'stretch',
      },
      spread: {
        justifyContent: 'space-between',
      },
    },
    cross: {
      start: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'flex-end',
      },
      stretch: {
        alignItems: 'stretch',
      },
    },
  },
  defaultVariants: {
    gap: 'none',
    flow: 'column',
    wrap: 'nowrap',
    display: 'flex',
  },
} as const;

const Flex = styled('div', {
  'display': 'flex',

  '&>h1, &>h2, &>h3, &>h4, &>h5, &>h6': {
    mt: 0,
    mb: 0,
  },

  ...flexProps,
});

export default Flex;
