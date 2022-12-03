import { styled } from '../stitches.config';
import { Text } from '../Text';
import { Flex } from '../Flex';
import type { VariantProps } from '@stitches/react';
import { forwardRef, ReactNode } from 'react';
import type { ForwardRefComponent } from '../utils/polymorphic';

const Main = styled(Text, {
  lineHeight: 1,
  flexShrink: 0,
  cursor: 'default',
  userSelect: 'none',

  variants: {
    disabled: {
      true: {
        color: '$onDisabled',
      },
      false: {
        color: '$onBackground',
      },
    },
  },
});

const Secondary = styled(Text, {
  lineHeight: 1,
});

export const LabelWrapper = styled('label', Flex, {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export interface Props extends VariantProps<typeof LabelWrapper> {
  label: ReactNode;
  secondary?: ReactNode;
  disabled?: boolean;
}

export const Label = forwardRef(({ label, secondary, disabled, ...props }, ref) => {
  return (
    <LabelWrapper {...props} cross="center" gap="xs" display="inline" ref={ref as any}>
      <Main textStyle="label-sm" weight={500} disabled={disabled}>
        {label}
      </Main>
      {secondary && (
        <Secondary textStyle="label-sm" tone="light">
          {secondary}
        </Secondary>
      )}
    </LabelWrapper>
  );
}) as LabelComponent;

type LabelComponent = ForwardRefComponent<'label', Props>;

Label.displayName = 'Label';
