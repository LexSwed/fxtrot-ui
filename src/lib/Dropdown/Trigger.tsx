import React from 'react';
import Button from '../Button';
import { FormField, useFormField } from '../FormField/FormField';

type FormFieldProps = React.ComponentProps<typeof FormField>;

type Props = FormFieldProps & {
  value?: string;
  id?: string;
};

const Trigger: React.FC<Props> = ({
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
  id,
  validity,
  disabled,
  value,
}) => {
  const ariaProps = useFormField({ id, hint });

  return (
    <FormField
      label={label}
      secondaryLabel={secondaryLabel}
      hint={hint}
      main={main}
      cross={cross}
      flow={flow}
      display={display}
      space={space}
      css={css}
      style={style}
      className={className}
      disabled={disabled}
      validity={validity}
      {...ariaProps}
    >
      <Button variant="outline">{value}</Button>
    </FormField>
  );
};

export default Trigger;
