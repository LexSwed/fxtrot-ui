import React from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

import { styled, CssStyles } from '../stitches.config';

const Div = styled('div', {});

export const Box = React.forwardRef(({ children, css = {}, ...props }, ref) => {
  const [styles, attrs] = Object.entries(props).reduce(
    (res, [key, value]: [any, any]) => {
      if (VALID_ITEMS.has(key)) {
        // css props should override any values passed directly, e.g. p="$2" and css={{ p: '$4' }} should keep p="$4"
        if (!css[key]) {
          res[0][key] = value;
        }
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
}) as BoxComponent;

Box.displayName = 'Box';

type BoxComponent = Polymorphic.ForwardRefComponent<'div', Props>;

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
  'justifyContent',
  'alignItems',
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
export interface Props extends CustomField {}

type CustomField = {
  [prop in typeof acceptedProperties[number]]?: CssStyles[prop];
} & {
  css?: CssStyles;
  as?: React.ElementType;
};

const VALID_ITEMS = new Set<keyof CssStyles>(acceptedProperties);
