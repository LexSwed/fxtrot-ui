import React from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import type { VariantProps } from '@stitches/react';

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
});

export interface Props extends VariantProps<typeof LabelWrapper> {
  label: React.ReactNode;
  secondary?: React.ReactNode;
  disabled?: boolean;
}

type LabelComponent = Polymorphic.ForwardRefComponent<'label', Props>;

export const Label = React.forwardRef(
  ({ label, secondary, disabled, as = 'label', ...props }: React.ComponentProps<LabelComponent>, ref) => {
    return (
      <LabelWrapper {...props} as={as} cross="center" gap="xs" display="inline" ref={ref as any}>
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
  }
) as LabelComponent;

Label.displayName = 'Label';
