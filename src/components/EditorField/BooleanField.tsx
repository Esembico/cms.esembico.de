import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import { BooleanFieldProps } from '../types/components';

export default function BooleanField({
  label,
  checked,
  onChange,
  errors
}: BooleanFieldProps): JSX.Element {
  return (
    <FormGroup row>
      <FormControl error={!!errors}>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={onChange} />}
          label={label}
        />
        <FormHelperText>{errors?.join('\n')}</FormHelperText>
      </FormControl>
    </FormGroup>
  );
}
