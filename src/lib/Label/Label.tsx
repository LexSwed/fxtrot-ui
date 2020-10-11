import React from 'react';
import { styled } from '../stitches.config';
import Flex from '../Flex';
import Text from '../Text';

const Main = styled(Text, {
  lineHeight: 1,
  fontWeight: 600,
  flexShrink: 0,

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

const Wrapper = styled(Flex, {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

type Props = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
  label: React.ReactNode;
  secondary?: React.ReactNode;
  disabled?: boolean;
  as?: React.ComponentProps<typeof Wrapper>['as'];
};

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
