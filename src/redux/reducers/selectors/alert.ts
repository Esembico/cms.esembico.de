import { AlertData, AlertState } from '../types/alert';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getState = (store: any): AlertState => {
  return store.alert;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAlerts = (store: any): Record<string, AlertData> => {
  return getState(store).alerts;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAlertList = (store: any): Array<AlertData> => {
  return Object.values(getAlerts(store));
};
