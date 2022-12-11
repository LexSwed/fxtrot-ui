import { ComponentProps, ElementType, forwardRef, useMemo } from 'react';
import { useId } from '@radix-ui/react-id';
import { clsx } from 'clsx';

import { Text } from '../text';
import type { PolyProps, PolyRef } from '../utils/polymorphic';
import { Flex, FlexVariants } from '../flex/flex';

import styles from './form-field.module.css';

export const FormField = forwardRef(function FormField<C extends ElementType = 'div'>(
  {
    cross = 'stretch',
    flow = 'column',
    display = 'inline',
    gap = 'xs',
    className,
    ...props
  }: PolyProps<C, FlexVariants>,
  ref: PolyRef<C>
) {
  return (
    <Flex
      cross={cross}
      flow={flow}
      display={display}
      gap={gap}
      className={clsx(styles['form-field'], className)}
      {...props}
      ref={ref}
    />
  );
});

export type FormFieldValidity = {
  validity?: keyof typeof tonesMap;
};

const tonesMap: Record<'valid' | 'invalid', ComponentProps<typeof Text>['tone']> = {
  valid: 'success',
  invalid: 'danger',
};

interface HintProps extends ComponentProps<typeof Text> {
  validity?: FormFieldValidity['validity'];
}

export const Hint = ({ validity, className, children, ...props }: HintProps) => {
  return (
    <Text
      textStyle="body-sm"
      title={typeof children === 'string' ? children : undefined}
      tone={validity ? tonesMap[validity] : 'light'}
      aria-live="polite"
      className={clsx(styles.hint, className)}
      {...props}
    >
      {children}
    </Text>
  );
};

export function useFormField({ id, hint, label }: { id?: string; hint?: string; label?: string }): InputAriaProps {
  let newId = useId(id);

  return useMemo(
    () => ({
      'id': newId,
      'aria-describedby': hint ? `${newId}-hint` : undefined,
      'aria-labelledby': label ? `${newId}-label` : undefined,
    }),
    [hint, newId, label]
  );
}

interface InputAriaProps {
  'id': string;
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
}
