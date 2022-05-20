import React from 'react';
import { styled } from '@fxtrot/ui';

type Props = { children: string };

export const Code = ({ children }: Props) => {
  return <InlineCodeBlock>{children}</InlineCodeBlock>;
};

const InlineCodeBlock = styled('code', {
  whiteSpace: 'break-spaces',
  bc: '$surfacePrimary5',
  color: '$primary',
  fontSize: '0.9em',
  lineHeight: 1,
  padding: '1px 3px 2px',
  br: '$xs',
  display: 'inline-block',
  verticalAlign: 'middle',
});
