import { Column, Text, Grid, styled, Row } from '@fxtrot/ui';
import React from 'react';
import { lightColors } from 'src/lib/theme/default';
import { CopyButton } from './CopyButton';

type Props = {
  color: string;
};
export const PaletteRenderer = ({ color }: Props) => {
  const colorsMap = extractPallete(color);
  return (
    <Grid columns="repeat(auto-fill, minmax(160px, 1fr))" gap="8">
      {Object.entries(colorsMap).map(([name, color]) => (
        <ColorBlock key={name} name={name} color={color} />
      ))}
    </Grid>
  );
};

function extractPallete(suffix: string) {
  const colors: Record<string, string> = {};
  Object.entries(lightColors).forEach(([name, color]) => {
    if (name.startsWith(suffix)) {
      colors[name] = color;
    }
  });
  return colors;
}

type ColorBlockProps = {
  name: string;
  color: string;
};

const ColorBlock = ({ name, color }: ColorBlockProps) => {
  const token = `$${name}`;
  return (
    <Column gap="3" key={name}>
      <ColorBox title={name} css={{ $$boxColor: `$colors${token}` }} />
      <Column gap="1">
        <RowTextWrapper cross="center" gap="4">
          <Text textStyle="body-md" lineClamp="1" title={name}>
            {token}
          </Text>
          <StyledCopyButton text={token} color="$text" />
        </RowTextWrapper>
        <Text textStyle="mono" tone="light" lineClamp="1" title={color}>
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
  '$$boxColor': '$background',
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
