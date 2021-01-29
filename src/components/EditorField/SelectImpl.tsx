import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { SelectProps } from '../types/components';

export default function SelectImpl({
  label,
  value,
  options,
  errors,
  onChange,
  required
}: SelectProps): JSX.Element {
  return (
    <FormControl required={required} error={!!errors} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        required={required}
        displayEmpty
        fullWidth
        value={value}
        onChange={onChange}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.display}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{errors?.join('\n')}</FormHelperText>
    </FormControl>
  );
}
