import type { StitchesProps } from '@stitches/react';
import React from 'react';

import { FlexBox, FlexType } from '../Flex';
import { styled } from '../stitches.config';
import Text from '../Text';

const Main = styled(Text, {
  lineHeight: 1,
  fontWeight: 600,
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

const Wrapper = styled(FlexBox as FlexType<'label'>, {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

interface Props extends StitchesProps<typeof Wrapper> {
  label: React.ReactNode;
  secondary?: React.ReactNode;
  disabled?: boolean;
}

const Label: React.FC<Props> = ({ label, children: _ignore, secondary, ref, as = 'label', disabled, ...props }) => {
  return (
    <Wrapper {...props} flow="row" cross="center" space="xs" display="inline" as={as} ref={ref as any}>
      <Main size="xs" disabled={disabled}>
        {label}
      </Main>
      {secondary && (
        <Secondary size="xs" tone="light">
          {secondary}
        </Secondary>
      )}
    </Wrapper>
  );
};

export default Label;
