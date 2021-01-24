import React, { useEffect, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import getDisplayValue from '../../helpers/getDisplayValue';
import stateRegister from '../../register/stateRegister';
import TextField from './TextField';

export default function SearchableField({
  label,
  entity,
  value,
  onChange,
  errors
}) {
  const [internalValue, setInternalValue] = useState(value);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
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

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const onInputChange = (e) => {
    const value = e.target.value;
    setDropdownOpen(!!value);
    setInternalValue(value);
    dispatch(setFilteredDataAction(value));
    if (!value) {
      onChange(null);
    }
  };

  const changeSelection = (entry) => {
    setDropdownOpen(false);
    onChange(entry);
  };

  const onKeyDown = (e) => {
    let newIndex = selectedIndex;

    if (e.keyCode === 40) {
      newIndex++;
    } else if (e.keyCode === 38) {
      newIndex--;
    } else if (e.keyCode === 13) {
      changeSelection(data[selectedIndex]);
    }

    if (newIndex !== selectedIndex) {
      if (newIndex < 0) {
        newIndex = 0;
      } else if (newIndex >= data.length) {
        newIndex = data.length - 1;
      }
      setInternalValue(data[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

  const onBlur = () => {
    setDropdownOpen(false);
  };

  return (
    <React.Fragment>
      <div className='searchable-container'>
        <TextField
          label={label}
          value={getDisplayValue(internalValue, primaryProperty.display)}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          errors={errors}
        />
        {dropdownOpen && (
          <div className='searchable-field-dropdown'>
            {data.map((entry, i) => {
              return (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    changeSelection(entry);
                  }}
                  className={i === selectedIndex ? 'active' : ''}
                  key={entry.id}
                  href={`#entry-${entry.id}`}
                >
                  {getDisplayValue(entry, primaryProperty.display)}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
