import * as ToggleGroup from '@radix-ui/react-toggle-group';
import flattenChildren from 'react-keyed-flatten-children';
import clsx from 'clsx';

import { ToggleButton } from '../toggle-button-1';
import { ComponentProps, ForwardedRef, forwardRef, isValidElement, ReactElement, ReactNode } from 'react';
import { flex, FlexVariants } from '../flex-1/flex';

import styles from './action-group.module.css';

type Props<T> = FlexVariants &
  Omit<
    T extends { type: 'single' } ? ToggleGroup.ToggleGroupSingleProps : ToggleGroup.ToggleGroupMultipleProps,
    'direction' | 'rovingFocus' | 'as'
  > & {
    children?: ReactNode;
  };

export const ActionGroup = forwardRef(
  <T extends {}>(
    { children, type, gap = 'none', value, className, ...props }: Props<T>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <ToggleGroup.Root
        type={type || 'single'}
        value={value}
        className={clsx(flex({ gap, ...props }), className)}
        {...props}
        ref={ref}
      >
        {flattenChildren(children).map((child, i) => {
          if (isValidElement(child) && child.type === ToggleButton) {
            return (
              <ToggleGroup.Item
                asChild
                value={
                  (child as ReactElement<ComponentProps<typeof ToggleButton>, typeof ToggleButton>).props
                    .value as string
                }
                key={child.key}
                className={gap === 'none' ? styles['action-group-item--no-gap'] : undefined}
              >
                {child}
              </ToggleGroup.Item>
            );
          }
          return child;
        })}
      </ToggleGroup.Root>
    );
  }
);
