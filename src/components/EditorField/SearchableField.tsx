import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { ChangeEvent } from 'react';
import { useDispatch, useStore } from 'react-redux';
import getDisplayValue from '../../helpers/getDisplayValue';
import stateRegister from '../../register/stateRegister';
import { SearchableFieldProps } from '../types/components';
import { SetFilteredDataAction } from '../../redux/helpers/types/actions';
import { GetFilteredData } from '../../redux/helpers/types/selectors';

export default function SearchableField({
  label,
  entity,
  value,
  onChange,
  errors,
  required
}: SearchableFieldProps): JSX.Element {
  const state = useStore().getState();
  const setFilteredDataAction = stateRegister.getAction(
    entity,
    'setFilteredDataAction'
  ) as SetFilteredDataAction;

  const getFilteredDataSelector = stateRegister.getSelector(
    entity,
    'getFilteredData'
  ) as GetFilteredData;

  const data = getFilteredDataSelector(state);

  const primaryProperty = stateRegister.getOption(
    entity,
    'primaryProperty'
  ) as any;
  const dispatch = useDispatch();

  const onInputChange = (e: ChangeEvent<unknown>, value: any) => {
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
            required={required}
          />
        )}
        getOptionSelected={(option, value) => option?.id === value?.id}
      />
    </React.Fragment>
  );
}
