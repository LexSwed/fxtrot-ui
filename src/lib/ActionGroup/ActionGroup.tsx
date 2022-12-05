import * as ToggleGroup from '@radix-ui/react-toggle-group';
import flattenChildren from 'react-keyed-flatten-children';

import { ToggleButton } from '../ToggleButton';
import { ComponentProps, isValidElement, ReactElement, ReactNode } from 'react';
import { classed } from '@tw-classed/react';
import { flex, FlexVariants } from '../flex/flex';

type Props = FlexVariants &
  Omit<
    ToggleGroup.ToggleGroupMultipleProps | ToggleGroup.ToggleGroupSingleProps,
    'direction' | 'rovingFocus' | 'as'
  > & {
    children?: ReactNode;
  };

export const ActionGroup = ({ children, type = 'single', gap = 'none', value, ...props }: Props) => {
  return (
    <ActionGroupRoot type={type} gap={gap} value={value} {...(props as any)}>
      {flattenChildren(children).map((child, i) => {
        if (isValidElement(child) && child.type === ToggleButton) {
          return (
            <ToggleGroup.Item
              asChild
              value={
                (child as ReactElement<ComponentProps<typeof ToggleButton>, typeof ToggleButton>).props.value as string
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
const ActionGroupRoot = classed(ToggleGroup.Root, flex);
