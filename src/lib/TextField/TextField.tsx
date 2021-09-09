import React, { useMemo } from 'react';
import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { CalendarIcon, ExclamationCircleIcon } from '@heroicons/react/outline';

import type { FlexVariants } from '../Flex/Flex';
import { FormField, Hint, HintBox, useFormField } from '../FormField/FormField';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { InputField, IconWrapper, InputProps } from './shared';

export const TextField = React.forwardRef<HTMLDivElement, Props>(
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
      css,
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

      return (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <FormField
        main={main}
        cross={cross}
        flow={flow}
        display={display}
        gap={gap}
        wrap={wrap}
        css={css}
        style={style}
        className={className}
        hasHint={!!hint}
        ref={ref}
      >
        {label !== undefined && (
          <Label label={label} secondary={secondaryLabel} htmlFor={ariaProps.id} disabled={disabled} />
        )}
        <HintBox>
          <InputField
            validity={validity}
            {...props}
            {...ariaProps}
            defaultValue={defaultValue ? `${defaultValue}` : defaultValue}
            disabled={disabled}
            value={value ? `${value}` : value}
            onChange={handleChange}
            inputMode={inputMode[type]}
            type={type}
            variant={variant}
            inputRef={inputRef}
            size={size}
          >
            {iconRight && (
              <IconWrapper>
                <Icon as={iconRight} size="md" />
              </IconWrapper>
            )}
          </InputField>
          {hint && (
            <Hint id={ariaProps['aria-describedby']} validity={validity}>
              {hint}
            </Hint>
          )}
        </HintBox>
      </FormField>
    );
  }
);

TextField.displayName = 'TextField';

type Props = Omit<InputProps, 'onChange' | 'type' | 'value' | 'defaultValue' | 'children'> &
  FlexVariants & {
    label?: string;
    secondaryLabel?: string;
    hint?: string;
    validity?: 'valid' | 'invalid';
    inputRef?: React.Ref<HTMLInputElement>;
  } & OnChange;

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
  (value: number, event: React.ChangeEvent<HTMLInputElement>): void;
}
interface DateChange {
  (value: Date | null, event: React.ChangeEvent<HTMLInputElement>): void;
}
interface StringChange {
  (value: string, event: React.ChangeEvent<HTMLInputElement>): void;
}

const icons: Record<string, React.ElementType> = {
  date: CalendarIcon,
  valid: CheckIcon,
  invalid: ExclamationCircleIcon,
  search: XIcon,
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
