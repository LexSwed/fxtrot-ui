import { Column, Text, Row, Box } from '@fxtrot/ui';
import { CopyButton } from './CopyButton';
import { lightColors } from '../lib/theme/default';

type Props = {
  children: React.ReactNode;
};
export const Palette = ({ children }: Props) => {
  return (
    <Row gap="1" css={{ overflowX: 'auto' }}>
      {children}
    </Row>
  );
};

type ColorBoxProps = {
  color: keyof typeof lightColors;
  textColor: keyof typeof lightColors;
};
export const ColorBox = ({ color, textColor }: ColorBoxProps) => {
  const token = `$${color}`;
  return (
    <Box
      css={{
        'bc': token,
        'color': `$${textColor}`,
        'p': '$2',
        'height': '100px',
        'width': '25%',
        'flex': '0 1 25%',
        '&:last-of-type': {
          flexGrow: 1,
        },
      }}
    >
      <Column css={{ height: '100%' }}>
        <Text textStyle="label-sm" weight={600}>
          {color}
        </Text>
        <Text textStyle="mono-sm">{lightColors[color]}</Text>
        <Box alignSelf="flex-end" mt="auto">
          <CopyButton label="Copy color token" text={token} color={`$${textColor}`} />
        </Box>
      </Column>
    </Box>
  );
};
