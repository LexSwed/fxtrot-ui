import React, { useMemo } from 'react';
import { StitchesProps } from '@stitches/react';
import { styled } from '../stitches.config';
import type { CssProperties } from '../utils';

const Div = styled('div', {});

type Props = Omit<StitchesProps<typeof Div>, 'as'> &
  CssProperties & {
    as?: keyof JSX.IntrinsicElements | React.ReactElement;
  };

const Box: React.FC<Props> = ({ children, css, ...props }) => {
  const [style, attrs] = useMemo(
    () =>
      Object.entries(props).reduce(
        (res, [key, value]: [any, any]) => {
          if (VALID_ITEMS.has(key) && value) {
            res[0][key] = value;
          } else {
            res[1][key] = value;
          }

          return res;
        },
        [{}, {}] as [any, any]
      ),
    Object.values(props) //eslint-disable-line
  );
  return <Div css={Object.assign(style, css)} {...attrs} children={children} />;
};

export default Box;

const VALID_ITEMS = new Set<keyof CssProperties>([
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
]);
