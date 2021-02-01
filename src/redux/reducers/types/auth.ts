import {
  SET_USERNAME,
  SET_TOKEN,
  SET_AUTH_ERROR,
  SET_PERMISSIONS,
  SET_SUPERUSER
} from '../../actionTypes';
import { StateError } from '../../helpers/types/state';

export interface Permission {
  id: number;
  name: string;
  codename: string;
}

export interface AuthState {
  token: string | null;
  username: string | null;
  error: StateError;
  superuser: boolean;
  permissions: Array<Permission>;
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

export interface SetPermissionsActionType {
  type: typeof SET_PERMISSIONS;
  permissions: Array<Permission>;
}

export interface SetSuperuserActionType {
  type: typeof SET_SUPERUSER;
  superuser: boolean;
}

export type AuthActionType =
  | SetTokenActionType
  | SetUsernameActionType
  | SetAuthErrorActionType
  | SetPermissionsActionType
  | SetSuperuserActionType;

export interface ValidateAuthFunction {
  (): void;
}

export interface AuthFunction {
  (username: string, password: string): void;
}
