import React from 'react';
import Stack from '../Stack';
import { styled } from '../stitches.config';

const Main = styled('span', {
  fontSize: '$xs',
  lineHeight: 1,
  fontWeight: 600,
});

const Secondary = styled('span', {
  fontSize: '$xs',
  lineHeight: 1,
  color: '$gray600',
  fontWeight: 400,
});

const Wrapper = styled(Stack, {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

type Props = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
  label: React.ReactNode;
  secondary?: React.ReactNode;
};

const Label: React.FC<Props> = ({ label, children: _ignore, secondary, ref, ...props }) => {
  return (
    <Wrapper {...props} flow="row" alignY="center" space="xs" display="inline" as="label" ref={ref as any}>
      <Main>{label}</Main>
      {secondary && <Secondary>{secondary}</Secondary>}
    </Wrapper>
  );
};

export default Label;
