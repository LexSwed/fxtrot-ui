import { type ComponentProps, forwardRef, useMemo } from 'react';
import { useId } from '@radix-ui/react-id';
import { clsx } from 'clsx';

import { classed as css, type VariantProps } from '@tw-classed/core';
import { Text } from '../text';
import type { ForwardRefComponent } from '../utils/polymorphic';
import { Flex, type FlexVariants } from '../flex/flex';

import styles from './form-field.module.css';

interface FormFieldProps extends FlexVariants {}

export const FormFieldWrapper = forwardRef(
  ({ cross = 'stretch', flow = 'column', display = 'inline', gap = 'xs', as = 'div', className, ...props }, ref) => {
    return (
      <Flex
        cross={cross}
        flow={flow}
        display={display}
        gap={gap}
        className={clsx(styles['form-field'], className)}
        as={as}
        {...props}
        ref={ref}
      />
    );
  }
) as ForwardRefComponent<'div', FormFieldProps>;

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
export type FieldVariants = VariantProps<typeof fieldBoxCss>;
export const fieldBoxCss = css(styles.field, {
  variants: {
    variant: {
      boxed: styles['variant--boxed'],
      flat: styles['variant--flat'],
      underlined: styles['variant--underlined'],
    },
    size: {
      sm: styles['size--sm'],
      md: styles['size--md'],
      lg: styles['size--lg'],
      xl: styles['size--xl'],
    },
    validity: {
      valid: styles['validity--valid'],
      invalid: styles['validity--invalid'],
    },
  },
});
