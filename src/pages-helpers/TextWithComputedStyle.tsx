import React from 'react';
import { Column, Text, useIsomorphicLayoutEffect } from '@fxtrot/ui';

type Styles = {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  fontFamily: string;
};

export const TextWithComputedStyle = ({ textStyle = 'body-md' }: React.ComponentProps<typeof Text>) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [style, setStyle] = React.useState<Styles>({
    fontSize: '',
    lineHeight: '',
    fontWeight: '',
    fontFamily: '',
  });
  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    const computedStyle = window.getComputedStyle(ref.current);
    setStyle({
      fontSize: computedStyle.getPropertyValue('font-size'),
      lineHeight: computedStyle.getPropertyValue('line-height'),
      fontWeight: computedStyle.getPropertyValue('font-weight'),
      fontFamily: computedStyle.getPropertyValue('font-family').split(',')[0],
    });
  }, []);

  return (
    <Column gap="2">
      <Text textStyle={textStyle} ref={ref}>
        {textStyle as string}
      </Text>
      <Text
        textStyle="mono-sm"
        tone="light"
      >{`${style.fontFamily} ${style.fontSize}/${style.lineHeight} ${style.fontWeight}`}</Text>
    </Column>
  );
};
