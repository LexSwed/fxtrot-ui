import { clsx } from 'clsx';
import { ComponentProps, forwardRef } from 'react';
import { FloatingList } from '../shared/floating-list';

import styles from './popover.module.css';

interface PopoverBoxProps extends ComponentProps<'div'> {}

export const PopoverBox = forwardRef<HTMLDivElement, PopoverBoxProps>(({ className, ...props }, ref) => {
  return <FloatingList className={clsx(styles.popover, className)} {...props} ref={ref} />;
});
