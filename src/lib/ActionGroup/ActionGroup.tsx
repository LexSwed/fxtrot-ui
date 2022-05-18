import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import flattenChildren from 'react-keyed-flatten-children';

import { flexCss, FlexVariants } from '../Flex/Flex';
import { ToggleButton } from '../ToggleButton';
import { styled, CssStyles } from '../stitches.config';
import { ButtonRoot } from '../Button/Button';

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
            <ToggleGroup.Item asChild value={child.props.value} key={child.key}>
              {child}
            </ToggleGroup.Item>
          );
        }
        return child;
      })}
    </ActionGroupRoot>
  );
};
const ActionGroupRoot = styled(
  ToggleGroup.Root,
  flexCss,
  {
    [`& > ${ButtonRoot}`]: {
      focusRing: '$outline',
      outlineOffset: '-3px',
    },
  },
  {
    compoundVariants: [
      {
        gap: 'none',
        css: {
          [`& > ${ButtonRoot}`]: {
            '&[data-state]:focus': {
              borderColor: 'transparent',
              zIndex: 1,
            },
          },
          [`& > ${ButtonRoot}[data-state="on"]`]: {
            outlineColor: '$surface5',
          },
          [`& > ${ButtonRoot}:not(:first-of-type)`]: {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
          [`& > ${ButtonRoot}:not(:last-of-type)`]: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        },
      },
    ],
  }
);
