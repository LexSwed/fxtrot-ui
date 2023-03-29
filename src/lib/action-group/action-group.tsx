import * as ToggleGroup from '@radix-ui/react-toggle-group';
import flattenChildren from 'react-keyed-flatten-children';
import { clsx } from 'clsx';

import { type ComponentProps, type ForwardedRef, forwardRef, isValidElement, type ReactElement } from 'react';
import { ToggleButton } from '../toggle-button';
import { flexCss, type FlexVariants } from '../flex/flex';

import styles from './action-group.module.css';

type Props = FlexVariants &
  Omit<ToggleGroup.ToggleGroupSingleProps | ToggleGroup.ToggleGroupMultipleProps, 'direction' | 'rovingFocus' | 'as'>;

export const ActionGroup = forwardRef(
  ({ children, type = 'single', gap = 'none', className, ...props }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      // @ts-expect-error tough kid
      <ToggleGroup.Root type={type} className={clsx(flexCss({ gap, ...props }), className)} {...props} ref={ref}>
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
