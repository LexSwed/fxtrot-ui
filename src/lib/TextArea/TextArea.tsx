import React, { useEffect, useLayoutEffect, useRef } from 'react';

import type { FlexVariants } from '../Flex/Flex';
import { FormField, Hint, HintBox, useFormField } from '../FormField/FormField';
import Label from '../Label';
import { styled } from '../stitches.config';
import { InputProps, InteractiveBox } from '../TextField/shared';
import { useForkRef } from '../utils/hooks';

export const TextArea = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      label,
      secondaryLabel,
      hint,
      main,
      cross,
      flow,
      display,
      gap,
      css,
      style,
      className,
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
    const innerRef = useRef<HTMLTextAreaElement>(null);
    const ariaProps = useFormField({ id, hint });

    useEffect(() => {
      if (innerRef.current) {
        autosize(innerRef.current);
      }
    }, []);

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      const el = e.currentTarget;
      onChange?.(el.value, e);
      autosize(el);
    };

    const refs = useForkRef(inputRef, innerRef);

    return (
      <FormField
        main={main}
        cross={cross}
        flow={flow}
        display={display}
        gap={gap}
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
          <TextAreaField
            rows={1}
            validity={validity}
            {...props}
            {...ariaProps}
            defaultValue={defaultValue}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            variant={variant}
            ref={refs}
            fieldSize={size}
            as={'textarea' as any}
          />
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

TextArea.displayName = 'TextArea';

type Props = Pick<InputProps, 'size' | 'variant' | 'validity' | 'css'> &
  React.ComponentProps<'textarea'> &
  FlexVariants & {
    label?: string;
    secondaryLabel?: string;
    hint?: string;
    validity?: 'valid' | 'invalid';
    inputRef?: React.Ref<HTMLTextAreaElement>;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };

const TextAreaField = styled(InteractiveBox, {
  resize: 'none',
  pr: '$0 !important',
  py: '$2',
  height: 'auto',
  maxHeight: '10em',
});

function autosize(el: HTMLTextAreaElement) {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight + 2}px`;
}
