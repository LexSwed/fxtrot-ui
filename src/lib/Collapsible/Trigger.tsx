import React from 'react';
import * as Rdx from '@radix-ui/react-collapsible';
import { ChevronDownIcon } from '@heroicons/react/outline';

import { styled } from '../stitches.config';
import { Icon } from '../Icon';
import { IconBox } from '../Icon/Icon';
import { flexCss } from '../Flex/Flex';
import type { CssStyles } from '../stitches.config';

interface TriggerProps extends React.ComponentProps<typeof StyledTrigger> {
  css?: CssStyles;
}
export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  ({ children, flow = 'row', cross = 'center', main = 'space-between', ...props }, ref) => {
    return (
      <Rdx.Trigger asChild>
        <StyledTrigger flow={flow} cross={cross} main={main} {...props} ref={ref}>
          {children}
          <Icon css={chevronIconStyle} as={ChevronDownIcon} />
        </StyledTrigger>
      </Rdx.Trigger>
    );
  }
);

const chevronIconStyle: CssStyles = {
  transition: 'transform 0.14s ease-in-out',
};

const StyledTrigger = styled('button', flexCss, {
  'width': '100%',
  'cursor': 'default',
  'br': '$md',
  'transition': '0.2s ease-in-out',
  'fontFamily': '$default',
  'border': '1px solid transparent',
  'whiteSpace': 'nowrap',
  'flexShrink': 0,
  '&[disabled],[aria-disabled="true"]': {
    pointerEvents: 'none',
  },

  '&[data-state="open"]': {
    [`& > ${IconBox}`]: {
      transform: 'rotate(180deg)',
    },
  },
  'variants': {
    variant: {
      flat: {
        'bc': '$shape',
        'color': '$text',
        'focusRing': '$focusRing',
        '&:hover': {
          bc: '$shape--hover',
        },
        '&:focus': {
          bc: '$shape--hover',
          borderColor: '$border--light',
        },
        '&:active, &[data-state="open"]': {
          bc: '$shape--active',
        },
        '&:disabled': {
          color: '$text--disabled',
          borderColor: 'transparent',
          bc: 'transparent',
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
