import { ADD_ALERT, REMOVE_ALERT } from '../actionTypes';
import { DispatchActionFunction } from '../helpers/types/actions';
import {
  AddAlertActionType,
  AlertState,
  RemoveAlertActionType,
  AlertActionType,
  AlertData
} from './types/alert';

const initialState: AlertState = {
  alerts: {}
};

const generateId = (): string => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export function addAlertAction(data: AlertData): DispatchActionFunction {
  return (dispatch: (action: AddAlertActionType) => void) => {
    dispatch({
      type: ADD_ALERT,
      data: { ...data, timestamp: Date.now() },
      id: generateId()
    });
  };
}

export function removeAlertAction(id: string): DispatchActionFunction {
  return (dispatch: (action: RemoveAlertActionType) => void) => {
    dispatch({ type: REMOVE_ALERT, id });
  };
}

export default function reducer(
  state = initialState,
  action: AlertActionType
): AlertState {
  switch (action.type) {
    case ADD_ALERT:
      return {
        ...state,
        alerts: {
          ...state.alerts,
          [action.id]: action.data
        }
      };
    case REMOVE_ALERT:
      const newAlerts = state.alerts;
      delete newAlerts[action.id];
      return {
        ...state,
        alerts: newAlerts
      };
    default:
      return state;
  }
}
