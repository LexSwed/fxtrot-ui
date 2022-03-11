import React from 'react';

import { styled } from '../stitches.config';
import { Text } from '../Text';
import { Flex } from '../Flex';

const Main = styled(Text, {
  lineHeight: 1,
  fontWeight: 500,
  flexShrink: 0,
  cursor: 'default',
  userSelect: 'none',

  variants: {
    disabled: {
      true: {
        color: '$text--disabled',
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

export const LabelWrapper = styled('label', Flex, {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export interface Props extends React.ComponentProps<typeof LabelWrapper> {
  label: React.ReactNode;
  secondary?: React.ReactNode;
  disabled?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, Props>(({ label, secondary, disabled, ...props }, ref) => {
  return (
    <LabelWrapper {...props} cross="center" gap="xs" display="inline" ref={ref as any}>
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

Label.displayName = 'Label';
