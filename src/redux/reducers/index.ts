import { combineReducers } from 'redux';
import auth from './auth';
import pageState from './pageState';
import stateRegister from '../../register/stateRegister';

export default combineReducers({
  ...stateRegister.getReducers(),
  auth,
  pageState
});
