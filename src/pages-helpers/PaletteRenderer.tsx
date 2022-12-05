import { Column, Text, Row } from '@fxtrot/ui';
import { CopyButton } from './CopyButton';
import colors from '../lib/colors.cjs';

type Props = {
  children: React.ReactNode;
};
export const Palette = ({ children }: Props) => {
  return (
    <Row gap="xs" cross="stretch" className="overflow-x-auto">
      {children}
    </Row>
  );
};

type ColorBoxProps = {
  color: keyof typeof colors;
  textColor: keyof typeof colors;
  className?: string;
};
export const ColorBox = ({ color, textColor, className }: ColorBoxProps) => {
  return (
    <div className={`w-1/4 flex-1 grow-0 basis-1/4 p-2 last-of-type:grow ${className}`}>
      <Column className="h-full">
        <Text textStyle="label-sm" weight={600}>
          {color}
        </Text>
        <Text textStyle="mono-sm">{colors[color]}</Text>
        <div className="self-end mt-auto">
          <CopyButton label="Copy color token" text={color} color={`$${textColor}`} />
        </div>
      </Column>
    </div>
  );
};
