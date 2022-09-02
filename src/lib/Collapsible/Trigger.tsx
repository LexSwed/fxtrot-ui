import React from 'react';
import * as Rdx from '@radix-ui/react-collapsible';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import { styled } from '../stitches.config';
import { Icon } from '../Icon';
import { flexCss } from '../Flex/Flex';
import type { CssStyles } from '../stitches.config';

interface TriggerProps extends React.ComponentProps<typeof StyledTrigger> {
  css?: CssStyles;
}
export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  ({ children, flow = 'row', cross = 'center', main = 'space-between', ...props }, ref) => {
    return (
      <StyledTrigger flow={flow} cross={cross} main={main} {...props} ref={ref}>
        {children}
        <Icon css={chevronIconStyle} as={ChevronDownIcon} />
      </StyledTrigger>
    );
  }
);

const chevronIconStyle: CssStyles = {
  transition: 'transform 0.14s ease-in-out',
};

const StyledTrigger = styled(Rdx.Trigger, flexCss, {
  'width': '100%',
  'cursor': 'default',
  'br': '$md',
  'transition': '0.2s ease-in-out',
  'transitionProperty': 'border-color, background-color',
  'border': '1px solid transparent',
  'fontFamily': '$default',
  'whiteSpace': 'nowrap',
  'flexShrink': 0,
  '&[disabled],[aria-disabled="true"]': {
    pointerEvents: 'none',
  },
  'focusRing': ['$outline', '2px'],

  '&[data-state="open"]': {
    [`& > ${Icon}`]: {
      transform: 'rotate(180deg)',
    },
  },
  'variants': {
    variant: {
      flat: {
        'bc': 'transparent',
        'color': '$onSurface',
        'border': '1px solid transparent',
        '@hover': {
          '&:where(:hover, :focus)': {
            bc: '$surface1',
            borderColor: '$surface2',
          },
        },
        '&:where(:active, [data-state="open"])': {
          bc: '$surface2',
          borderColor: '$surface3',
        },
        '&:disabled': {
          color: '$onDisabled',
          borderColor: '$disabled',
          bc: '$disabled',
        },
      },
    },
    size: {
      xs: {
        minHeight: '$6',
        px: '$2',
      },
      sm: {
        minHeight: '$8',
        px: '$2',
      },
      md: {
        minHeight: '$base',
        px: '$3',
      },
      lg: {
        minHeight: '$12',
        px: '$4',
      },
    },
  },
  'defaultVariants': {
    variant: 'flat',
    size: 'md',
  },
});
