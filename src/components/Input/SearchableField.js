import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { useDispatch, useStore } from 'react-redux';
import getDisplayValue from '../../helpers/getDisplayValue';
import stateRegister from '../../register/stateRegister';

export default function SearchableField({
  label,
  entity,
  value,
  onChange,
  errors
}) {
  const state = useStore().getState();
  const setFilteredDataAction = stateRegister.getAction(
    entity,
    'setFilteredDataAction'
  );

  const getFilteredDataSelector = stateRegister.getSelector(
    entity,
    'getFilteredData'
  );

  const data = getFilteredDataSelector(state);

  const primaryProperty = stateRegister.getOption(entity, 'primaryProperty');
  const dispatch = useDispatch();

  const onInputChange = (e, value) => {
    dispatch(setFilteredDataAction(value));
  };

  return (
    <React.Fragment>
      <Autocomplete
        options={data}
        getOptionLabel={(option) =>
          getDisplayValue(option, primaryProperty.display)
        }
        onChange={(_, newValue) => {
          onChange(newValue);
        }}
        onInputChange={onInputChange}
        value={value}
        renderInput={(params) => (
          <TextField
            error={!!errors}
            helperText={errors?.join('\n')}
            {...params}
            label={label}
            margin='normal'
          />
        )}
        getOptionSelected={(option, value) => option.id === value.id}
      />
    </React.Fragment>
  );
}
