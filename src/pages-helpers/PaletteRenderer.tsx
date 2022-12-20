import { Column, Text, Row } from '@fxtrot/ui';
import defaultTheme from 'src/lib/theme-provider/default-theme.cjs';
import type { Theme } from 'src/lib/theme-provider/types';
import { CopyButton } from './CopyButton';

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
  color: keyof Theme['colors'];
  className?: string;
};
export const ColorBox = ({ color, className }: ColorBoxProps) => {
  return (
    <div className={`w-1/4 flex-1 grow-0 basis-1/4 p-2 last-of-type:grow ${className}`}>
      <Column className="h-full">
        <Text textStyle="label-sm">{color}</Text>
        <Text textStyle="mono-sm">{defaultTheme.colors[color]}</Text>
        <div className="self-end mt-auto">
          <CopyButton label="Copy color token" text={color} />
        </div>
      </Column>
    </div>
  );
};
