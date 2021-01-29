import React from 'react';
import TextField from '@material-ui/core/TextField';
import { TextFieldProps } from '../types/components';

export default function TextFieldImpl({
  value,
  label,
  errors,
  ...other
}: TextFieldProps): JSX.Element {
  const classes = [];
  if (value) {
    classes.push('has-value');
  }
  if (errors) {
    classes.push('has-errors');
  }
  return (
    <TextField
      error={!!errors}
      label={label}
      value={value || ''}
      helperText={errors?.join('\n')}
      fullWidth={true}
      margin='normal'
      {...other}
    />
  );
}
