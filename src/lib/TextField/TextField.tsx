import React, { useMemo } from 'react';
import Label from '../Label';
import Flex from '../Flex';
import { styled } from '../stitches.config';
import { HiOutlineCalendar, HiCheck, HiOutlineExclamationCircle, HiX } from 'react-icons/hi';
import Icon from '../Icon';
import Text from '../Text';
import { StylesObject } from '../types/helpers';
import { useUID } from 'react-uid';

const iconStyles: StylesObject = {
  position: 'absolute',
  top: 0,
  right: 0,
  size: '$base',
};

const IconWrapper = styled('div', {
  ...iconStyles,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  transition: '0.1s ease-in',
});

const Input = styled('input', {
  'fontSize': '$sm',
  'lineHeight': '$base',
  'width': '100%',
  'px': '$2',
  'display': 'inline-flex',
  'height': '$base',
  'transition': '0.2s ease-in-out',
  'bc': '$surfaceStill',
  'outline': 'none',
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
    variant: {
      boxed: {
        'border': '1px solid $borderStill',
        'br': '$md',
        ':hover': {
          borderColor: '$borderHover',
        },
        ':focus': {
          borderColor: '$borderActive',
          boxShadow: '0 0 0 1px $borderActive inset',
        },
      },
      underlined: {
        'borderBottom': '1px solid $borderStill',
        'borderRadius': '$md $md 0 0',
        ':hover': {
          borderColor: '$borderHover',
        },
        ':focus': {
          borderColor: '$primaryActive',
          backgroundImage: 'linear-gradient(0deg, $primaryActive 0%, $primaryActive 2%, $surfaceStill 3%)',
        },
      },
    },
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
    validity: {
      valid: {
        svg: {
          fill: '$lightGreen600',
        },
      },
      invalid: {
        svg: {
          stroke: '$red600',
        },
        [`${Input}`]: {
          'borderColor': '$red600',
          ':hover': {
            borderColor: '$red700',
          },
          ':focus': {
            borderColor: '$borderDefault',
          },
        },
      },
    },
  },
});

const icons: Record<string, React.ElementType> = {
  date: HiOutlineCalendar,
  valid: HiCheck,
  invalid: HiOutlineExclamationCircle,
  search: HiX,
};

const tonesMap: Record<NonNullable<Props['validity']>, React.ComponentProps<typeof Text>['tone']> = {
  valid: 'success',
  invalid: 'danger',
};

const TextField: React.FC<Props> = ({
  label,
  secondaryLabel,
  hint,
  main,
  cross,
  flow,
  display = 'inline',
  space = 'xs',
  css,
  style,
  className,
  type = 'text',
  onChange,
  validity,
  value,
  disabled,
  variant = 'boxed',
  id: propsId,
  ...props
}) => {
  let id = useUID();
  id = propsId ?? id;

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

  const ariaProps: InputProps = {};

  if (hint) {
    ariaProps['aria-describedby'] = `${id}-hint`;
  }
  if (label) {
    ariaProps['aria-labelledby'] = `${id}-label`;
  }

  const iconRight = icons[validity || type];

  return (
    <Flex
      main={main}
      cross={cross}
      flow={flow}
      display={display}
      space={space}
      css={css}
      style={style}
      className={className}
    >
      {label && (
        <Label label={label} secondary={secondaryLabel} id={ariaProps['aria-labelledby']} disabled={disabled} />
      )}
      <InputWrapper validity={validity}>
        <Input
          {...props}
          {...ariaProps}
          id={id}
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
        <Text size="xs" id={ariaProps['aria-labelledby']} tone={validity && tonesMap[validity]}>
          {hint}
        </Text>
      )}
    </Flex>
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
