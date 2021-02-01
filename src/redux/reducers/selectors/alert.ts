import { AlertData, AlertState } from '../types/alert';
import { ReduxStore } from '../types/base';

export const getState = (store: ReduxStore): AlertState => {
  return store.alert;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAlerts = (store: ReduxStore): Record<string, AlertData> => {
  return getState(store).alerts;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAlertList = (store: ReduxStore): Array<AlertData> => {
  return Object.values(getAlerts(store));
};
