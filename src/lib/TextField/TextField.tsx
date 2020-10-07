import React, { useCallback } from 'react';
import { useUID } from 'react-uid';
import Label from '../Label';
import Flex from '../Flex';
import { styled } from '../stitches.config';
import { HiOutlineCalendar, HiCheck, HiOutlineExclamationCircle } from 'react-icons/hi';
import Icon from '../Icon';
import { StylesObject } from '../types/helpers';

const iconStyles: StylesObject = {
  position: 'absolute',
  top: 0,
  right: 0,
  size: '$base',
};

const Input = styled('input', {
  'fontSize': '$sm',
  'lineHeight': '$base',
  'width': '100%',
  'px': '$2',
  'display': 'inline-flex',
  'height': '$base',
  'transition': '0.2s ease-in-out',
  'border': '1px solid $borderStill',
  'bc': '$surfaceStill',
  'br': '$md',
  'outline': 'none',
  '::placeholder': {
    color: '$borderStill',
  },
  ':hover': {
    borderColor: '$borderHover',
  },
  ':disabled': {
    color: '$textDisabled',
    borderColor: '$surfaceDisabled',
    bc: '$surfaceDisabled',
  },
  ':focus': {
    borderColor: '$borderActive',
    boxShadow: '0 0 0 1px $borderActive inset',
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

const IconWrapper = styled('div', {
  ...iconStyles,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
});

const icons: Record<string, React.ElementType> = {
  date: HiOutlineCalendar,
  valid: HiCheck,
  invalid: HiOutlineExclamationCircle,
};

const TextField: React.FC<Props> = ({
  label,
  secondaryLabel,
  alignAxisMain,
  alignAxisCross,
  flow,
  display = 'inline',
  space = 'xs',
  id: propId,
  css,
  style,
  className,
  type,
  onChange,
  validity,
  ...props
}) => {
  const id = useUID();
  const inputId = propId || id;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (typeof onChange !== 'function') {
        return undefined;
      }
      if (type === 'number') {
        onChange(e.target.valueAsNumber, e);
      } else if (type === 'date') {
        onChange(e.target.valueAsDate, e);
      } else {
        onChange(e.target.value, e);
      }
    },
    [onChange, type]
  );

  const iconRight = icons[validity || type];

  return (
    <Flex
      alignAxisMain={alignAxisMain}
      alignAxisCross={alignAxisCross}
      flow={flow}
      display={display}
      space={space}
      css={css}
      style={style}
      className={className}
    >
      {label && <Label htmlFor={inputId} label={label} secondary={secondaryLabel} />}
      <InputWrapper validity={validity}>
        <Input {...props} onChange={handleChange} id={inputId} hasIcon={Boolean(iconRight)} type={type} />
        {iconRight && (
          <IconWrapper>
            <Icon as={iconRight} size="md" />
          </IconWrapper>
        )}
      </InputWrapper>
    </Flex>
  );
};

export default TextField;

type Props = {
  label: string;
  validity: 'valid' | 'invalid';
} & React.ComponentProps<typeof Input> &
  React.ComponentProps<typeof Flex>;
