import { Column, Text, styled, Row } from '@fxtrot/ui';
import React from 'react';
import { CopyButton } from './CopyButton';

type Props = {
  name: string;
  color: string;
};

export const ColorBlock = ({ name, color }: Props) => {
  const token = `$${name}`;
  return (
    <Column gap="3" css={{ width: '140px' }} key={name}>
      <ColorBox title={name} css={{ $$boxColor: `$colors${token}` }} />
      <Column gap="1">
        <RowTextWrapper cross="center" gap="4">
          <Text size="sm" lineClamp="1" title={name}>
            {token}
          </Text>
          <StyledCopyButton text={token} color="$text" />
        </RowTextWrapper>
        <Text size="xs" font="mono" tone="light" lineClamp="1" title={color}>
          {color}
        </Text>
      </Column>
    </Column>
  );
};
const StyledCopyButton = styled(CopyButton, {});

const RowTextWrapper = styled(Row, {
  '&:hover': {
    [`& > ${StyledCopyButton}`]: {
      opacity: 1,
      pointerEvents: 'all',
      transitionDelay: '0s',
    },
  },
  [`& > ${StyledCopyButton}`]: {
    opacity: 0,
    pointerEvents: 'none',
    transition: '0.24s ease-in-out',
    transitionDelay: '0.4s',
  },
});

const ColorBox = styled('div', {
  '$$boxColor': '$surface',
  'bc': '$$boxColor',
  'flexShrink': 0,
  'width': '50px',
  'height': '50px',
  'transition': '0.24s',
  'br': '$md',
  'boxShadow': '$xs, 0 4px 6px -1px $$boxColor',
  '&:hover': {
    boxShadow: '$xs, 0 2px 3px -1px $$boxColor',
  },
});
