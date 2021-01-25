import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function SelectImpl({
  label,
  value,
  options,
  errors,
  onChange
}) {
  return (
    <FormControl error={errors} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select displayEmpty fullWidth value={value} onChange={onChange}>
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
      <FormHelperText>{errors}</FormHelperText>
    </FormControl>
  );
}
