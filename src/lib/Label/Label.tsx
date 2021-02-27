import React from 'react';

import { flexProps } from '../Flex';
import { styled } from '../stitches.config';
import Text from '../Text';
import type { PropsOf } from '../utils/types';

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

export const LabelWrapper = styled(FlexBox as FlexType<'label'>, {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

interface Props extends PropsOf<typeof LabelWrapper> {
  label: React.ReactNode;
  secondary?: React.ReactNode;
  disabled?: boolean;
}

const Label: React.FC<Props> = ({ label, children: _ignore, secondary, ref, as = 'label', disabled, ...props }) => {
  return (
    <LabelWrapper {...props} flow="row" cross="center" space="xs" display="inline" as={as} ref={ref as any}>
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
};

export default Label;
