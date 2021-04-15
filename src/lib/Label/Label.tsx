import React from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

import { styled } from '../stitches.config';
import Text from '../Text';
import Flex from '../Flex';
import type { StitchesVariants } from '@stitches/core';

const Main = styled(Text, {
  lineHeight: 1,
  fontWeight: 500,
  flexShrink: 0,
  cursor: 'default',
  userSelect: 'none',

  variants: {
    disabled: {
      true: {
        color: '$textDisabled',
      },
      false: {
        color: '$text',
      },
    },
  },
});

const Secondary = styled(Text, {
  lineHeight: 1,
  fontWeight: 400,
});

export const LabelWrapper = styled(Flex, {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  defaultVariants: {
    gap: 'none',
    display: 'flex',
    flow: 'column',
    wrap: 'nowrap',
  },
});

interface Props extends StitchesVariants<typeof LabelWrapper> {
  label: React.ReactNode;
  secondary?: React.ReactNode;
  disabled?: boolean;
}

type LabelComponent = Polymorphic.ForwardRefComponent<'label', Props>;

const Label: LabelComponent = React.forwardRef(({ label, secondary, disabled, ...props }: Props, ref) => {
  return (
    <LabelWrapper {...props} flow="row" cross="center" gap="xs" display="inline" ref={ref as any}>
      <Main size="sm" disabled={disabled}>
        {label}
      </Main>
      {secondary && (
        <Secondary size="sm" tone="light">
          {secondary}
        </Secondary>
      )}
    </LabelWrapper>
  );
});

export default Label;
