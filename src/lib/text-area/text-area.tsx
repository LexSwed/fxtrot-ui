import {
  type ChangeEvent,
  type ChangeEventHandler,
  type ComponentProps,
  forwardRef,
  type Ref,
  useEffect,
  useRef,
} from 'react';
import { classed as css } from '@tw-classed/core';
import { clsx } from 'clsx';

import { Column, type FlexVariants } from '../flex/flex';
import { FormFieldWrapper, Hint, Label, useFormField } from '../form-field';
import { fieldBoxCss, type FieldVariants } from '../form-field/form-field';
import { useForkRef } from '../utils/hooks';

import styles from './text-area.module.css';

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
          <textarea
            rows={1}
            {...props}
            {...ariaProps}
            defaultValue={defaultValue}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            ref={refs}
            className={clsx(fieldBoxCss({ validity, size, variant }), textfieldCss({ size }))}
          />
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

TextArea.displayName = 'TextArea';

interface Props extends FlexVariants, FieldVariants, Omit<ComponentProps<'textarea'>, 'wrap' | 'onChange'> {
  label?: string;
  secondaryLabel?: string;
  hint?: string;
  validity?: 'valid' | 'invalid';
  inputRef?: Ref<HTMLTextAreaElement>;
  onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
}

function autosize(el: HTMLTextAreaElement) {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight + 2}px`;
}

const textfieldCss = css(styles['text-area'], {
  variants: {
    size: {
      sm: styles['size--sm'],
      md: styles['size--md'],
      lg: styles['size--lg'],
      xl: styles['size--xl'],
    },
  },
});
