import type { StitchesVariants } from '@stitches/core';
import { styled } from '../stitches.config';
import { gaps } from '../theme/variants';

export const flex = <T extends Parameters<typeof styled>[0]>(tag: T) =>
  styled(tag, {
    variants: {
      gap: gaps,
      display: {
        flex: {
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
      main: {
        'start': {
          justifyContent: 'flex-start',
        },
        'center': {
          justifyContent: 'center',
        },
        'end': {
          justifyContent: 'flex-end',
        },
        'stretch': {
          justifyContent: 'stretch',
        },
        'space-between': {
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
  });

const Flex = styled(flex('div'), {
  '& > *': {
    m: 0,
  },
});

export type FlexVariants = StitchesVariants<typeof Flex>;

export default Flex;
