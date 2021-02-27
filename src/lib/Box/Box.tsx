import React from 'react';

import { styled } from '../stitches.config';
import type { CssStyles } from '../utils/types';

const Div = styled('div', {});

const Box = React.forwardRef<HTMLDivElement, Props>(({ children, css = {}, ...props }, ref) => {
  const [styles, attrs] = Object.entries(props).reduce(
    (res, [key, value]: [any, any]) => {
      if (VALID_ITEMS.has(key)) {
        res[0][key] = value;
      } else {
        res[1][key] = value;
      }

      return res;
    },
    [css, {}] as [any, any]
  );

  return (
    <Div css={styles} {...attrs} ref={ref}>
      {children}
    </Div>
  );
});

export default Box;

const acceptedProperties = [
  'tablet',
  'mobile',
  'desktop',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  'm',
  'mx',
  'my',
  'mt',
  'mr',
  'mb',
  'ml',
  'bg',
  'bc',
  'br',
  'color',
  'textAlign',
  'textSize',
  'size',
  'shadow',
  'display',
  'position',
  'top',
  'bottom',
  'left',
  'right',
  'zIndex',
  'flex',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'alignSelf',
  'justifySelf',
  'order',
  'gridTemplate',
  'gridTemplateAreas',
  'gridTemplateColumns',
  'gridTemplateRows',
  'grid',
  'gap',
  'gridAutoFlow',
  'gridAutoColumns',
  'gridAutoRows',
  'gridArea',
  'gridColumn',
  'gridRow',
  'gridColumnStart',
  'gridColumnEnd',
  'gridRowStart',
  'gridRowEnd',
  'overflow',
  'width',
  'maxWidth',
  'minWidth',
  'height',
  'maxHeight',
  'minHeight',
  'border',
  'borderWidth',
  'borderColor',
  'borderRadius',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'boxShadow',
  'whiteSpace',
] as const;

/** Not all properties supported */
interface Props extends Omit<BoxProps, 'color'>, CustomField {}

type CustomField = {
  [prop in typeof acceptedProperties[number]]?: CssStyles[prop];
};

type BoxProps = React.ComponentProps<typeof Div>;

const VALID_ITEMS = new Set<keyof CssStyles>(acceptedProperties);
