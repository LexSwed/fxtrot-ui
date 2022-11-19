import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import flattenChildren from 'react-keyed-flatten-children';

import { ToggleButton } from '../ToggleButton';
import { styled, CssStyles } from '../stitches.config';
import { buttonCss } from '../Button/Button';
import type { FlexVariants } from '../Flex/flex.css';

type Props = FlexVariants &
  Omit<
    ToggleGroup.ToggleGroupMultipleProps | ToggleGroup.ToggleGroupSingleProps,
    'direction' | 'rovingFocus' | 'as'
  > & {
    css?: CssStyles;
    children?: React.ReactNode;
  };

export const ActionGroup: React.FC<Props> = ({ children, type = 'single', gap = 'none', value = null, ...props }) => {
  return (
    <ActionGroupRoot type={type} gap={gap} value={value} {...(props as any)}>
      {flattenChildren(children).map((child, i) => {
        if (React.isValidElement(child) && child.type === ToggleButton) {
          return (
            <ToggleGroup.Item
              asChild
              value={
                (child as React.ReactElement<React.ComponentProps<typeof ToggleButton>, typeof ToggleButton>).props
                  .value as string
              }
              key={child.key}
            >
              {child}
            </ToggleGroup.Item>
          );
        }
        return child;
      })}
    </ActionGroupRoot>
  );
};
const ActionGroupRoot = styled(ToggleGroup.Root, flexCss, {
  gap: '-1px',
  compoundVariants: [
    {
      gap: 'none',
      css: {
        [`& > ${buttonCss}`]: {
          '$focusRingInset': '$surface5',
          '&[data-state]:focus': {
            zIndex: 1,
          },
          '&[data-state=on]': {
            $focusRingInset: '$surfacePrimary6',
          },
        },
        [`& > ${buttonCss}:not(:first-of-type)`]: {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
        [`& > ${buttonCss}:not(:last-of-type)`]: {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
    },
    {
      gap: 'none',
      css: {
        [`& > ${buttonCss} + ${buttonCss}`]: {
          ml: '-1px',
        },
      },
    },
  ],
});
