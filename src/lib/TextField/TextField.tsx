import React, { useMemo } from 'react';
import type { FlexVariants } from '../Flex';
import { styled } from '../stitches.config';
import { HiOutlineCalendar, HiCheck, HiOutlineExclamationCircle, HiX } from 'react-icons/hi';
import Icon from '../Icon';
import Label from '../Label';
import { FormField, HintBox, Hint, useFormField } from '../FormField/FormField';
import { InteractiveBox, validityVariant, IconWrapper, iconStyles } from './shared';
import { StitchesProps } from '@stitches/react';
import { IconType } from 'react-icons/lib';

const Input = styled(InteractiveBox, {
  '::placeholder': {
    color: '$borderStill',
  },
  ':disabled': {
    color: '$textDisabled',
    borderColor: '$surfaceDisabled',
    bc: '$surfaceDisabled',
  },

  '&[type="number"]::-webkit-inner-spin-button, &[type="number"]::-webkit-outer-spin-button': {
    '-webkit-appearance': 'inner-spin-button !important',
    'appearance': 'inner-spin-button !important',
  },

  '&[type="date"]': {
    'backgroundImage': 'none',
    '::-webkit-calendar-picker-indicator': {
      backgroundImage: 'none',
      m: 0,
      p: 0,
      ...iconStyles,
    },
  },

  '&[type="search"]': {
    '::-webkit-search-cancel-button': {
      appearance: 'none',
      m: 0,
      p: 0,
      ...iconStyles,
    },
    [`&:placeholder-shown + ${IconWrapper}`]: {
      opacity: 0,
    },
  },

  'variants': {
    hasIcon: {
      true: {
        pr: '$8',
      },
    },
  },
});

const InputWrapper = styled('div', {
  position: 'relative',
  width: '100%',

  variants: {
    validity: validityVariant,
  },
});

const icons: Record<string, React.ElementType> = {
  date: HiOutlineCalendar,
  valid: HiCheck,
  invalid: HiOutlineExclamationCircle,
  search: HiX,
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

const TextField = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      label,
      secondaryLabel,
      hint,
      main,
      cross,
      flow,
      display,
      space,
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
      icon,
      inputRef,
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

    const iconRight = icon || icons[validity || type];

    return (
      <FormField
        main={main}
        cross={cross}
        flow={flow}
        display={display}
        space={space}
        css={css}
        style={style}
        className={className}
        hasHint={!!hint}
        ref={ref}
      >
        {label && <Label label={label} secondary={secondaryLabel} htmlFor={ariaProps.id} disabled={disabled} />}
        <HintBox>
          <InputWrapper validity={validity}>
            <Input
              {...props}
              {...ariaProps}
              defaultValue={defaultValue ? `${defaultValue}` : defaultValue}
              disabled={disabled}
              value={value ? `${value}` : value}
              onChange={handleChange}
              hasIcon={Boolean(iconRight)}
              inputMode={inputMode[type]}
              type={type}
              variant={variant}
              ref={inputRef}
            />
            {iconRight && (
              <IconWrapper>
                <Icon as={iconRight} size="md" />
              </IconWrapper>
            )}
          </InputWrapper>
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

export default TextField;

type InputProps = StitchesProps<typeof Input>;
type Props = Omit<InputProps, 'onChange' | 'type' | 'value' | 'defaultValue' | 'children'> &
  FlexVariants & {
    label?: string;
    secondaryLabel?: string;
    hint?: string;
    validity?: 'valid' | 'invalid';
    inputRef?: React.Ref<HTMLInputElement>;
    icon?: IconType;
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

type NumberChange = (value: number, event: React.ChangeEvent<HTMLInputElement>) => void;
type DateChange = (value: Date | null, event: React.ChangeEvent<HTMLInputElement>) => void;
type StringChange = (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
