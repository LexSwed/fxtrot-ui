import { ChangeEvent, ComponentProps, useMemo } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { classed as css, VariantProps } from '@tw-classed/core';

import type { FlexVariants } from '../flex/flex';
import { FormField, useFormField, Label } from '../form-field';
import { Icon } from '../icon';

import styles from './checkbox.module.css';

interface CheckboxProps
  extends Omit<ComponentProps<'input'>, 'onChange' | 'value' | 'size'>,
    FlexVariants,
    VariantProps<typeof checkboxCss> {
  label?: string;
  secondaryLabel?: string;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
}

export const Checkbox = ({
  checked,
  onChange,
  style,
  className,
  flow = 'row',
  label,
  secondaryLabel,
  gap = 'xs',
  display,
  main,
  cross = 'center',
  disabled,
  id,
  size = 'sm',
  variant = 'single',
  ...props
}: CheckboxProps) => {
  const ariaProps = useFormField({ id });

  const handleChange = useMemo(() => {
    if (typeof onChange !== 'function') return;

    return (ev: ChangeEvent<HTMLInputElement>) => onChange(ev.target.checked, ev);
  }, [onChange]);

  return (
    <FormField
      className={clsx(styles['field'], className)}
      style={style}
      display={display}
      gap={gap}
      flow={flow}
      main={main}
      cross={cross}
    >
      <div className={clsx(styles['checkmark'], checkboxCss({ size, variant }))}>
        <input
          aria-checked={checked}
          checked={checked}
          {...props}
          {...ariaProps}
          className={clsx(styles.input)}
          type="checkbox"
          disabled={disabled}
          onChange={handleChange}
        />
        <div className={styles['checkmark-icon']}>
          <Icon as={CheckIcon} className={styles.icon} aria-hidden />
        </div>
      </div>
      {label !== undefined && (
        <Label
          label={label}
          size={mapLabelSize[size]}
          secondary={secondaryLabel}
          disabled={disabled}
          htmlFor={ariaProps.id}
        />
      )}
    </FormField>
  );
};

const mapLabelSize = { sm: 'sm', md: 'sm', lg: 'md' } as const;

const checkboxCss = css({
  variants: {
    size: {
      sm: styles['checkmark--sm'],
      md: styles['checkmark--md'],
      lg: styles['checkmark--lg'],
    },
    variant: {
      single: styles['checkmark--single'],
      group: styles['checkmark--group'],
    },
  },
});
