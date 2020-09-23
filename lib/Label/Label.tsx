import React from 'react';
import { Inline } from '..';
import { styled } from '../stitches.config';

const Main = styled('span', {
  textSize: '$md',
  fontWeight: 600,
});

const Secondary = styled('span', {
  textSize: '$md',
  color: '$gray600',
  fontWeight: 400,
});

type Props = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
  label: React.ElementType;
  secondary: React.ElementType;
};

const Label: React.FC<Props> = ({ label, children: _ignore, secondary, ref, ...props }) => {
  return (
    <Inline {...props} space="xs" display="inline" as="label" ref={ref as any}>
      <Main>{label}</Main>
      <Secondary>{secondary}</Secondary>
    </Inline>
  );
};

export default Label;
