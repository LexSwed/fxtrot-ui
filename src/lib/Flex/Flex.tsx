import React from 'react';

import { StitchesProps, StitchesVariants } from '@stitches/react';
import Box from '../Box';
import { styled } from '../stitches.config';
import { gaps } from '../theme/variants';

const FlexBox = styled(Box, {
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

const Flex = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof FlexBox> & { as?: keyof JSX.IntrinsicElements }
>(({ space = 'none', flow = 'column', wrap = 'nowrap', main = 'start', cross = 'start', ...props }, ref) => (
  <FlexBox space={space} flow={flow} wrap={wrap} main={main} cross={cross} {...props} ref={ref} />
));

export default Flex;

export type FlexVariants = StitchesVariants<typeof FlexBox>;
export type FlexProps = StitchesProps<typeof FlexBox>;
