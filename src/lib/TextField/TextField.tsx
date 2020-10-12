import React, { useMemo } from 'react';
import Flex from '../Flex';
import { styled } from '../stitches.config';
import { HiOutlineCalendar, HiCheck, HiOutlineExclamationCircle, HiX } from 'react-icons/hi';
import Icon from '../Icon';
import Label from '../Label';
import { FormField, HintBox, Hint, useFormField } from '../FormField/FormField';
import { InteractiveBox, validityVariant } from './shared';
import { StylesObject } from '../types/helpers';

const iconStyles: StylesObject = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  width: '$base',
};

const IconWrapper = styled('div', {
  ...iconStyles,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  transition: '0.1s ease-in',
});

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
      ...(iconStyles as any),
    },
  },

  '&[type="search"]': {
    '::-webkit-search-cancel-button': {
      appearance: 'none',
      m: 0,
      p: 0,
      ...(iconStyles as any),
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

const TextField: React.FC<Props> = ({
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
  ...props
}) => {
  const ariaProps = useFormField({ id, hint });

  const handleChange = useMemo(() => {
    if (typeof onChange !== 'function') {
      return undefined;
    }

    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'number') {
        onChange(e.target.valueAsNumber, e);
      } else if (type === 'date') {
        onChange(e.target.valueAsDate, e);
      } else {
        onChange(e.target.value, e);
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
      space={space}
      css={css}
      style={style}
      className={className}
      hasHint={!!hint}
    >
      {label && <Label label={label} secondary={secondaryLabel} htmlFor={ariaProps.id} disabled={disabled} />}
      <HintBox>
        <InputWrapper validity={validity}>
          <Input
            {...props}
            {...ariaProps}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            hasIcon={Boolean(iconRight)}
            type={type}
            variant={variant}
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
};

export default TextField;

type InputProps = React.ComponentProps<typeof Input>;
type Props = InputProps &
  React.ComponentProps<typeof Flex> & {
    label?: string;
    secondaryLabel?: string;
    hint?: string;
    validity?: 'valid' | 'invalid';
  };
