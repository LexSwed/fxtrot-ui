import type { IStyledComponent, StitchesProps, StitchesVariants } from '@stitches/react';
import React from 'react';

import { styled } from '../stitches.config';
import { gaps } from '../theme/variants';
import { Config, forwardRef } from '../utils/types';

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

const Flex = forwardRef<FlexProps, 'div'>(({ space = 'none', flow = 'column', wrap = 'nowrap', ...props }, ref) => {
  return <FlexBox space={space} flow={flow} wrap={wrap} {...props} ref={ref as any} />;
});

export default Flex;

export interface FlexVariants extends StitchesVariants<typeof FlexBox> {}
export interface FlexProps extends StitchesProps<typeof FlexBox> {}
export interface FlexType<C extends React.ElementType = 'div'> extends IStyledComponent<C, FlexVariants, Config> {}