import { AlertState } from './alert';
import { AuthState } from './auth';
import { PageState } from './pageState';

export interface ReduxStore {
  auth: AuthState;
  alert: AlertState;
  pageState: PageState;
}

export interface ActionType {
  type: string;
}
