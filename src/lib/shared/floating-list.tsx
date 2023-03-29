import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import styles from './floating-list.module.css';

interface Props extends ComponentProps<'div'> {}

export const FloatingList = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return <div {...props} className={clsx(styles['floating-list'], props.className)} ref={ref} />;
});
