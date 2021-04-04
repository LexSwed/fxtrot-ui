import type { StitchesVariants } from '@stitches/core';

import { styled } from '../stitches.config';
import {
  flexCrossAxisAlignment,
  flexDisplayVariant,
  flexFlowVariant,
  flexMainAxisAlignment,
  flexWrapVariant,
  gaps,
} from '../utils/variants';

type FlexProps = {
  display: typeof flexDisplayVariant;
  gap: typeof gaps;
  flow: typeof flexFlowVariant;
  wrap: typeof flexWrapVariant;
  main: typeof flexMainAxisAlignment;
  cross: typeof flexCrossAxisAlignment;
};

export const flexVariants: FlexProps = {
  display: flexDisplayVariant,
  gap: gaps,
  flow: flexFlowVariant,
  wrap: flexWrapVariant,
  main: flexMainAxisAlignment,
  cross: flexCrossAxisAlignment,
};

const Flex = styled('div', {
  '& > *': {
    m: 0,
  },
  'variants': flexVariants,
  'defaultVariants': {
    gap: 'none',
    display: 'flex',
    flow: 'column',
    wrap: 'nowrap',
  },
});

export type FlexVariants = StitchesVariants<typeof Flex>;

export default Flex;
