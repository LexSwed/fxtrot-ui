import { ElementType, forwardRef } from 'react';

import { styled, CssStyles } from '../stitches.config';
import type { ForwardRefComponent } from '../utils/polymorphic';

const Div = styled('div', {});

export const Box = forwardRef(({ children, css = {}, ...props }, ref) => {
  const { styles, attrs } = Object.entries(props).reduce(
    (res, [key, value]: [any, any]) => {
      if (VALID_ITEMS.has(key)) {
        // css props should override any values passed directly, e.g. p="$2" and css={{ p: '$4' }} should keep p="$4"
        if (!css[key]) {
          res.styles[key] = value;
        }
      } else {
        res.attrs[key] = value;
      }

      return res;
    },
    { styles: { ...css }, attrs: {} } as { styles: NonNullable<Props['css']>; attrs: any }
  );
  return (
    <Div css={styles} {...attrs} ref={ref}>
      {children}
    </Div>
  );
}) as BoxComponent;

Box.displayName = 'Box';

type BoxComponent = ForwardRefComponent<'div', Props>;

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
  'alignItems',
  'alignSelf',
  'border',
  'borderBottom',
  'borderColor',
  'borderLeft',
  'borderRadius',
  'borderRight',
  'borderTop',
  'borderWidth',
  'bottom',
  'boxShadow',
  'color',
  'display',
  'flex',
  'flexBasis',
  'flexGrow',
  'flexShrink',
  'gap',
  'grid',
  'gridArea',
  'gridAutoColumns',
  'gridAutoFlow',
  'gridAutoRows',
  'gridColumn',
  'gridColumnEnd',
  'gridColumnStart',
  'gridRow',
  'gridRowEnd',
  'gridRowStart',
  'gridTemplate',
  'gridTemplateAreas',
  'gridTemplateColumns',
  'gridTemplateRows',
  'placeItems',
  'height',
  'justifyContent',
  'justifySelf',
  'flexFlow',
  'left',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'order',
  'overflow',
  'position',
  'right',
  'shadow',
  'size',
  'textAlign',
  'textSize',
  'top',
  'whiteSpace',
  'width',
  'zIndex',
] as const;

/** Not all properties supported */
export interface Props extends CustomField {}

type CustomField = {
  [prop in typeof acceptedProperties[number]]?: CssStyles[prop];
} & {
  css?: CssStyles;
  as?: ElementType;
};

const VALID_ITEMS = new Set<keyof CssStyles>(acceptedProperties);
