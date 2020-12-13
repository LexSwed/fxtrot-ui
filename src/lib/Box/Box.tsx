import type { StitchesProps } from '@stitches/react';
import React from 'react';

import { styled } from '../stitches.config';
import type { CssProperties } from '../utils';

const Div = styled('div', {});

const Box: React.FC<Props> = ({ children, css, ...props }) => {
  const [style, attrs] = Object.entries(props).reduce(
    (res, [key, value]: [any, any]) => {
      if (VALID_ITEMS.has(key)) {
        res[0][key] = value;
      } else {
        res[1][key] = value;
      }

      return res;
    },
    [{}, {}] as [any, any]
  );

  return (
    <Div css={Object.assign(style, css)} {...attrs}>
      {children}
    </Div>
  );
};

export default Box;

const acceptedProperties: readonly (keyof CssProperties)[] = [
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
export interface Props extends Omit<BoxProps, 'as' | 'translate' | 'color'>, CustomField {
  as?: JSX.IntrinsicElements | React.ElementType;
}

type CustomField = {
  [prop in typeof acceptedProperties[number]]?: CssProperties[prop];
};
type BoxProps = StitchesProps<typeof Div>;

const VALID_ITEMS = new Set<keyof CssProperties>(acceptedProperties);
