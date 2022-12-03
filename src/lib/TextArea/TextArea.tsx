import { ChangeEvent, ChangeEventHandler, ComponentProps, forwardRef, Ref, useEffect, useRef } from 'react';

import type { FlexVariants } from '../Flex/Flex';
import { FormField, Hint, HintBox, useFormField } from '../FormField/FormField';
import { Label } from '../Label';
import { styled, CssStyles } from '../stitches.config';
import { fieldBox, FieldBoxVariants } from '../TextField/shared';
import { useForkRef } from '../utils/hooks';

export const TextArea = forwardRef<HTMLDivElement, Props>(
  (
    {
      label,
      secondaryLabel,
      hint,
      main,
      cross,
      flow,
      wrap,
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

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
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
            size={size}
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

interface Props extends FlexVariants, FieldBoxVariants, Omit<ComponentProps<'textarea'>, 'wrap' | 'onChange'> {
  label?: string;
  secondaryLabel?: string;
  hint?: string;
  validity?: 'valid' | 'invalid';
  inputRef?: Ref<HTMLTextAreaElement>;
  onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
  css?: CssStyles;
}

const TextAreaField = styled('textarea', fieldBox, {
  resize: 'none',
  height: 'auto',
  maxHeight: '10em',

  variants: {
    size: {
      sm: {
        minHeight: '$6',
        p: '$1',
        lineHeight: '1.2em',
      },
      md: {
        minHeight: '$base',
        py: '$2',
        lineHeight: '1.5em',
      },
      lg: {
        minHeight: '$12',
        py: '$2',
        lineHeight: '1.5em',
      },
      xl: {
        minHeight: 'auto',
        py: '$2',
        lineHeight: '1.5em',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

function autosize(el: HTMLTextAreaElement) {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight + 2}px`;
}
