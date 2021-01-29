import { SET_USERNAME, SET_TOKEN, SET_AUTH_ERROR } from '../../actionTypes';
import { StateError } from '../../helpers/types/state';

export interface AuthState {
  token: string | null;
  username: string | null;
  error: StateError;
}

export interface SetTokenActionType {
  type: typeof SET_TOKEN;
  token: string | null;
}
export interface SetUsernameActionType {
  type: typeof SET_USERNAME;
  username: string | null;
}
export interface SetAuthErrorActionType {
  type: typeof SET_AUTH_ERROR;
  error: StateError;
}

export type AuthActionType =
  | SetTokenActionType
  | SetUsernameActionType
  | SetAuthErrorActionType;
