import { SET_TOKEN, SET_USERNAME, SET_AUTH_ERROR } from '../actionTypes';
import { generateHeaders, fetchWrapper } from '../../helpers/api';
import {
  AuthActionType,
  AuthState,
  SetAuthErrorActionType,
  SetTokenActionType,
  SetUsernameActionType
} from './types/auth';
import { DispatchActionFunction } from '../helpers/types/actions';

const localToken = localStorage.getItem('token');

const initialState: AuthState = {
  token: localToken,
  username: null,
  error: null
};

export function logoutAction(): DispatchActionFunction {
  return (
    dispatch: (action: SetTokenActionType | SetUsernameActionType) => void
  ) => {
    dispatch({ type: SET_TOKEN, token: null });
    dispatch({ type: SET_USERNAME, username: null });
  };
}

export function validateAuthAction(): DispatchActionFunction {
  return (
    dispatch: (
      action:
        | SetTokenActionType
        | SetUsernameActionType
        | SetAuthErrorActionType
    ) => void,
    stateGetter: () => any
  ) => {
    const state = stateGetter();
    fetchWrapper(`${process.env.REACT_APP_API_URL}/current-user/`, {
      headers: generateHeaders(state.auth.token)
    })
      .then((json) => {
        dispatch({ type: SET_USERNAME, username: json.username });
      })
      .catch((error) => {
        dispatch({ type: SET_TOKEN, token: null });
        dispatch({ type: SET_AUTH_ERROR, error });
      });
  };
}

export function authAction(
  username: string,
  password: string
): DispatchActionFunction {
  return (
    dispatch: (
      action:
        | SetAuthErrorActionType
        | SetTokenActionType
        | DispatchActionFunction
    ) => void
  ) => {
    fetchWrapper(`${process.env.REACT_APP_API_URL}/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then((json) => {
        if (json.non_field_errors) {
          dispatch({ type: SET_AUTH_ERROR, error: json.non_field_errors });
        } else {
          dispatch({ type: SET_TOKEN, token: json.token });
          dispatch(validateAuthAction());
        }
      })
      .catch((error) => {
        dispatch({ type: SET_AUTH_ERROR, error });
      });
  };
}

export default function reducer(
  state = initialState,
  action: AuthActionType
): AuthState {
  switch (action.type) {
    case SET_TOKEN:
      if (action.token) {
        localStorage.setItem('token', action.token);
      } else {
        localStorage.removeItem('token');
      }
      return {
        ...state,
        token: action.token
      };
    case SET_USERNAME:
      return {
        ...state,
        username: action.username
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
