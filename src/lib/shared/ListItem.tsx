import { flexCss, FlexVariants } from '../Flex/Flex';
import { styled } from '../stitches.config';
import { Text } from '../Text';

const flexDefaultProps: FlexVariants = {
  gap: 'sm',
  cross: 'center',
};

export const ListItem = styled('div', flexCss, {
  'width': '100%',
  'px': '$3',
  'font': '$default',
  'fontSize': '$sm',
  'lineHeight': 1,
  'br': '$sm',
  'cursor': 'default',
  'userSelect': 'none',
  'flexShrink': 0,
  'transition': '0.1s ease-in-out',
  'bc': 'transparent',
  'color': '$onBackground',
  'focusRingInset': '$surface1',
  '&:hover': {
    bc: '$surface1',
  },
  '&:focus': {
    bc: '$surface2',
  },
  '&:active, [data-focused="true"], [data-highlighted]': {
    bc: '$surface2',
  },
  [`& ${Text}`]: {
    fontSize: 'inherit',
    lineHeight: 'inherit',
  },
  '&:disabled,[data-disabled="true"]': {
    color: '$onDisabled',
  },

  'variants': {
    size: {
      sm: {
        height: '$8',
      },
      md: {
        height: '$base',
      },
      lg: {
        height: '$base',
      },
    },
  },
  'defaultVariants': {
    ...flexDefaultProps,
    size: 'md',
  },
});

export function focusOnMouseOver(e: React.MouseEvent<HTMLElement, MouseEvent>) {
  e.currentTarget.focus({
    preventScroll: true,
  });
}
