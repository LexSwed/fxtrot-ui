import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import flattenChildren from 'react-keyed-flatten-children';
import { Slot } from '@radix-ui/react-slot';

import Flex from '../Flex';
import type { FlexVariants } from '../Flex/Flex';
import type { CssStyles } from '../utils/types';
import ToggleButton from '../ToggleButton';
import { styled } from '../stitches.config';
import { gaps } from '../utils/variants';
import { ButtonRoot } from '../Button/Button';

type Props = FlexVariants &
  Omit<ToggleGroup.ToggleGroupOwnProps, 'direction' | 'rovingFocus' | 'as'> & {
    css?: CssStyles;
  };

export const ActionGroup: React.FC<Props> = ({ children, type = 'single', gap = 'none', value = null, ...props }) => {
  return (
    <ToggleGroup.Root as={ActionGroupFlex} type={type} gap={gap} _gap={gap} value={value} {...(props as any)}>
      {flattenChildren(children).map((child, i) => {
        if (React.isValidElement(child) && child.type === ToggleButton) {
          return (
            <ToggleGroup.Item as={Slot} value={child.props.value} key={child.key}>
              {child}
            </ToggleGroup.Item>
          );
        }
        return child;
      })}
    </ToggleGroup.Root>
  );
};

const ActionGroupFlex = styled(Flex, {
  variants: {
    _gap: gaps,
  },
  compoundVariants: [
    {
      _gap: 'none',
      css: {
        [`& > ${ButtonRoot}`]: {
          'mx': 'calc(-1*1px/2)',
          '&:hover,&:focus': {
            zIndex: 2,
          },
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
});
