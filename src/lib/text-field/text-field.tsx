import { forwardRef, type ChangeEvent, type Ref, type ElementType, useMemo, type ComponentProps } from 'react';
import { CheckIcon, XMarkIcon, CalendarIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

import { classed as css } from '@tw-classed/core';
import { Column, type FlexVariants } from '../flex/flex';
import { FormFieldWrapper, Hint, Label, useFormField } from '../form-field';
import { Icon } from '../icon';
import { fieldBoxCss, type FieldVariants } from '../form-field/form-field';

import styles from './text-field.module.css';

export const TextField = forwardRef<HTMLDivElement, Props>(
  (
    {
      label,
      secondaryLabel,
      hint,
      main,
      cross,
      flow,
      display,
      wrap,
      gap,
      style,
      className,
      type = 'text',
      onChange,
      validity,
      value,
      disabled,
      variant = 'boxed',
      id,
      defaultValue,
      inputRef,
      size = 'md',
      ...props
    },
    ref
  ) => {
    const ariaProps = useFormField({ id, hint });

    const handleChange = useMemo(() => {
      if (typeof onChange !== 'function') {
        return undefined;
      }

      return (e: ChangeEvent<HTMLInputElement>) => {
        switch (type) {
          case 'number':
            return (onChange as NumberChange)(e.target.valueAsNumber, e);
          case 'date':
            return (onChange as DateChange)(e.target.valueAsDate, e);
          default:
            return (onChange as StringChange)(e.target.value, e);
        }
      };
    }, [onChange, type]);

    const iconRight = icons[validity || type];

    return (
      <FormFieldWrapper
        main={main}
        cross={cross}
        flow={flow}
        display={display}
        gap={gap}
        wrap={wrap}
        style={style}
        className={className}
        ref={ref}
      >
        {label !== undefined && (
          <Label label={label} secondary={secondaryLabel} htmlFor={ariaProps.id} disabled={disabled} />
        )}
        <Column gap="xs">
          <div className={styles['input-icon-wrapper']}>
            <input
              {...props}
              {...ariaProps}
              defaultValue={defaultValue ? `${defaultValue}` : defaultValue}
              disabled={disabled}
              value={value ? `${value}` : value}
              onChange={handleChange}
              inputMode={inputMode[type]}
              type={type}
              ref={inputRef}
              className={clsx(
                styles['text-field'],
                textFieldCss({ validity }),
                fieldBoxCss({ validity, variant, size })
              )}
            />
            {iconRight && (
              <div className={styles.icon}>
                <Icon as={iconRight} size={size} />
              </div>
            )}
          </div>
          {hint && (
            <Hint id={ariaProps['aria-describedby']} validity={validity}>
              {hint}
            </Hint>
          )}
        </Column>
      </FormFieldWrapper>
    );
  }
);

TextField.displayName = 'TextField';

type InputProps = Omit<ComponentProps<'input'>, 'onChange' | 'type' | 'size' | 'value' | 'defaultValue' | 'children'>;

type Props = InputProps &
  FieldVariants &
  FlexVariants &
  OnChange & {
    label?: string;
    secondaryLabel?: string;
    hint?: string;
    validity?: 'valid' | 'invalid';
    inputRef?: Ref<HTMLInputElement>;
  };

type OnChange =
  | {
      type: 'text' | 'url' | 'tel' | 'search' | 'password' | 'email';
      value?: string;
      defaultValue?: string;
      onChange?: StringChange;
    }
  | {
      type: 'number';
      defaultValue?: number;
      value?: number;
      onChange?: NumberChange;
    }
  | {
      type: 'date';
      value?: Date;
      defaultValue?: Date;
      onChange?: DateChange;
    }
  | {
      type?: undefined;
      value?: string;
      defaultValue?: string;
      onChange?: StringChange;
    };

interface NumberChange {
  (value: number, event: ChangeEvent<HTMLInputElement>): void;
}
interface DateChange {
  (value: Date | null, event: ChangeEvent<HTMLInputElement>): void;
}
interface StringChange {
  (value: string, event: ChangeEvent<HTMLInputElement>): void;
}

const icons: Record<string, ElementType> = {
  date: CalendarIcon,
  valid: CheckIcon,
  invalid: ExclamationCircleIcon,
  search: XMarkIcon,
};

const inputMode: Record<NonNullable<Props['type']>, InputProps['inputMode']> = {
  number: 'numeric',
  tel: 'tel',
  text: 'text',
  url: 'url',
  email: 'email',
  search: 'search',
  date: undefined,
  password: undefined,
};

const textFieldCss = css({
  variants: {
    validity: {
      valid: styles.valid,
      invalid: styles.invalid,
    },
  },
});
