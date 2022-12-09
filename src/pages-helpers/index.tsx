import { clsx } from 'clsx';
import type { ComponentProps } from 'react';

export const ExampleBox = (props: ComponentProps<'div'>) => {
  return (
    <div
      {...props}
      className={clsx(
        'grid h-[50px] min-w-[50px] place-items-center border-2 border-dashed border-primary/60 bg-primary/10 text-sm text-on-surface-variant',
        props.className
      )}
    />
  );
};

export { TextWithComputedStyle } from './TextWithComputedStyle';

export { CopyButton } from './CopyButton';
export { MainLayout } from './MainLayout/MainLayout';
