import type { IStyledComponent, StitchesProps, StitchesVariants } from '@stitches/react';
import React from 'react';

import { styled } from '../stitches.config';
import { gaps } from '../theme/variants';

export const FlexBox = styled('div', {
  'display': 'flex',

  '&>h1, &>h2, &>h3, &>h4, &>h5, &>h6': {
    mt: 0,
    mb: 0,
  },

  'variants': {
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
});

export interface Props extends StitchesProps<typeof FlexBox> {}

const Flex = React.forwardRef<unknown, Props>(
  ({ space = 'none', flow = 'column', wrap = 'nowrap', main = 'start', cross = 'start', ...props }, ref) => {
    return <FlexBox space={space} flow={flow} wrap={wrap} main={main} cross={cross} {...props} ref={ref as any} />;
  }
);

export default Flex;

export type FlexVariants = StitchesVariants<typeof FlexBox>;
export type FlexProps = StitchesProps<typeof FlexBox>;
export type FlexType<C extends React.ElementType = 'div'> = typeof FlexBox extends IStyledComponent<
  any,
  infer Variants,
  infer Config
>
  ? IStyledComponent<C, Variants, Config>
  : never;
