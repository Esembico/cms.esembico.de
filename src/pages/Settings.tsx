import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import Header from '../components/Header';
import { getThemeName } from '../redux/reducers/selectors/pageState';
import { setThemeAction } from '../redux/reducers/pageState';
import { ReduxStore } from '../redux/reducers/types/base';
import { SettingsProps } from './types/pages';
import { Theme } from '../redux/reducers/types/pageState';

const Settings = ({ themeName, setTheme }: SettingsProps) => {
  return (
    <React.Fragment>
      <Header>Settings</Header>
      <FormControl fullWidth>
        <InputLabel id='theme'>Theme</InputLabel>
        <Select
          labelId='theme'
          value={themeName}
          onChange={(e) => setTheme(e.target.value as Theme)}
        >
          <MenuItem value='system'>System</MenuItem>
          <MenuItem value='dark'>Dark</MenuItem>
          <MenuItem value='light'>Light</MenuItem>
        </Select>
      </FormControl>
    </React.Fragment>
  );
};

const mapStateToProps = (state: ReduxStore) => {
  const themeName = getThemeName(state);
  return {
    themeName
  };
};

const mapDipatchToProps = (dispatch: Dispatch<AnyAction>) => {
  const setTheme = setThemeAction;
  return bindActionCreators({ setTheme }, dispatch);
};

export default connect(mapStateToProps, mapDipatchToProps)(Settings);
