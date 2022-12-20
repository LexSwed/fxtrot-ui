import { ComponentProps, ElementType, forwardRef, useMemo } from 'react';
import { useId } from '@radix-ui/react-id';
import { clsx } from 'clsx';

import { classed as css, VariantProps } from '@tw-classed/core';
import { Text } from '../text';
import type { PolyProps, PolyRef } from '../utils/polymorphic';
import { Flex, FlexVariants } from '../flex/flex';

import styles from './form-field.module.css';

type FormFieldWrapperProps<C extends ElementType> = PolyProps<C, FlexVariants>;
type FormFieldWrapperComponent = <C extends ElementType = 'div'>(
  props: FormFieldWrapperProps<C>
) => React.ReactElement | null;

export const FormFieldWrapper: FormFieldWrapperComponent = forwardRef(
  <C extends ElementType = 'div'>(
    {
      cross = 'stretch',
      flow = 'column',
      display = 'inline',
      gap = 'xs',
      className,
      ...props
    }: FormFieldWrapperProps<C>,
    ref: PolyRef<C>
  ) => {
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
  }
);

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
