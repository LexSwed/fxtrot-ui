import React from 'react';

import { flexVariants } from '../Flex/Flex';
import { styled } from '../stitches.config';
import Text from '../Text';

const Main = styled(Text, {
  lineHeight: 1,
  fontWeight: 500,
  flexShrink: 0,
  cursor: 'default',

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

export const LabelWrapper = styled('label', {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  ...flexVariants,
});

interface Props extends React.ComponentProps<typeof LabelWrapper> {
  label: React.ReactNode;
  secondary?: React.ReactNode;
  disabled?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const Label = React.forwardRef<HTMLLabelElement, Props>(
  ({ label, children: _ignore, secondary, disabled, ...props }, ref) => {
    return (
      <LabelWrapper {...props} flow="row" cross="center" gap="xs" display="inline" ref={ref}>
        <Main size="xs" disabled={disabled}>
          {label}
        </Main>
        {secondary && (
          <Secondary size="xs" tone="light">
            {secondary}
          </Secondary>
        )}
      </LabelWrapper>
    );
  }
);

export default Label;
