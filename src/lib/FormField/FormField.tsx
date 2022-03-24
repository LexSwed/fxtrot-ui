import React, { useMemo } from 'react';
import { useId } from '@radix-ui/react-id';

import { Flex } from '../Flex/Flex';
import { LabelWrapper } from '../Label/Label';
import { styled } from '../stitches.config';
import { Text } from '../Text';

export const FormField = styled(Flex, {
  position: 'relative',
  width: '100%',

  [`& > ${LabelWrapper}`]: {
    pl: '1px',
  },

  variants: {
    hasHint: {
      true: {
        pb: '$5',
      },
    },
  },
  defaultVariants: {
    main: 'stretch',
    cross: 'stretch',
    flow: 'column',
    display: 'inline',
    gap: 'xs',
  } as any,
});

export const HintBox = styled('div', {
  display: 'flex',
  position: 'relative',
  minWidth: 0,
  flex: 2,
});

const HintText = styled(Text, {
  position: 'absolute',
  minWidth: 0,
  bottom: '0',
  transform: 'translateY(calc(100% + 4px))',
  maxWidth: '-webkit-fill-available',
  pl: '1px',
  cursor: 'default',
});

export interface FormFieldProps extends React.ComponentProps<typeof FormField> {
  validity?: keyof typeof tonesMap;
}

const tonesMap: Record<'valid' | 'invalid', React.ComponentProps<typeof Text>['tone']> = {
  valid: 'success',
  invalid: 'danger',
};

interface HintProps extends React.ComponentProps<typeof Text> {
  validity?: FormFieldProps['validity'];
}

export const Hint: React.FC<HintProps> = ({ validity, children, ...props }) => {
  return (
    <HintText
      lineClamp={1}
      textStyle="hint"
      title={typeof children === 'string' ? children : undefined}
      tone={validity ? tonesMap[validity] : 'light'}
      {...props}
    >
      {children}
    </HintText>
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
