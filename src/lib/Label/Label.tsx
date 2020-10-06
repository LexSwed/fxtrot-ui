import React from 'react';
import { styled } from '../stitches.config';
import Flex from '../Flex';
import Text from '../Text';

const Main = styled(Text, {
  lineHeight: 1,
  fontWeight: 600,
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
};

const Label: React.FC<Props> = ({ label, children: _ignore, secondary, ref, ...props }) => {
  return (
    <Wrapper {...props} flow="row" alignAxisCross="center" space="xs" display="inline" as="label" ref={ref as any}>
      <Main size="xs">{label}</Main>
      {secondary && (
        <Secondary size="xs" tone="light">
          {secondary}
        </Secondary>
      )}
    </Wrapper>
  );
};

export default Label;
