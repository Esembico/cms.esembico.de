import { AlertState } from './alert';
import { AuthState } from './auth';

export interface ReduxStore {
  auth: AuthState;
  alert: AlertState;
}

export interface ActionType {
  type: string;
}
