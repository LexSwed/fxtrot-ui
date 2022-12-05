import { Column, Text, useIsomorphicLayoutEffect } from '@fxtrot/ui';
import { type ComponentProps, useRef, useState } from 'react';

type Styles = {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  fontFamily: string;
};

export const TextWithComputedStyle = ({ textStyle = 'body-md' }: ComponentProps<typeof Text>) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [style, setStyle] = useState<Styles>({
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
    <Column gap="sm">
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
