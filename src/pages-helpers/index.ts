import { classed } from '@tw-classed/react';

export const ExampleBox = classed(
  'div',
  'bg-primary/10 border-2 border-dashed border-primary/60 h-[50px] min-w-[50px] grid place-items-center text-on-surface-variant text-sm'
);

export { TextWithComputedStyle } from './TextWithComputedStyle';

export { CopyButton } from './CopyButton';
export { MainLayout } from './MainLayout/MainLayout';
