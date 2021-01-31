import { ADD_ALERT, REMOVE_ALERT } from '../../actionTypes';

export interface AlertData {
  severity: 'error' | 'warning' | 'info' | 'success';
  title?: string;
  message: string;
  timestamp?: number;
}

export interface AlertState {
  alerts: Record<string, AlertData>;
}

export interface AddAlertActionType {
  type: typeof ADD_ALERT;
  id: string;
  data: AlertData;
}
export interface RemoveAlertActionType {
  type: typeof REMOVE_ALERT;
  id: string;
}

export type AlertActionType = AddAlertActionType | RemoveAlertActionType;
