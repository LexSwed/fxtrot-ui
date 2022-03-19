import { flexCss, FlexVariants } from '../Flex/Flex';
import { styled } from '../stitches.config';
import { Text } from '../Text';

const flexDefaultProps: FlexVariants = {
  gap: 'sm',
  cross: 'center',
};

export const ListItem = styled('div', flexCss, {
  'px': '$3',
  'font': '$default',
  'fontSize': '$sm',
  'lineHeight': 1,
  'br': '$sm',
  'outline': 'none',
  'cursor': 'default',
  'border': '1px solid transparent',
  'userSelect': 'none',
  'flexShrink': 0,
  'transition': '0.1s ease-in-out',
  'bc': '$shape',
  'color': '$text',
  '&:focus:not(:active), &:hover': {
    bc: '$shape--hover',
  },
  '&:active': {
    bc: '$shape--active',
  },
  [`& ${Text}`]: {
    fontSize: 'inherit',
    lineHeight: 'inherit',
  },
  '&[data-focused="true"]': {
    bc: '$shape--hover',
  },
  '&[data-disabled="true"]': {
    color: '$text--disabled',
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
