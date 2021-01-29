import { DataState } from './state';

export interface SelectIdActionType {
  type: string;
  selectedId: number | null;
}

export interface SetPageActionType {
  type: string;
  page: number;
}

export interface SetEditedDataActionType {
  type: string;
  id: number;
}

export interface UpdateDataActionType {
  type: string;
  data: any;
}

export interface UpdateEditedDataActionType {
  type: string;
  field: string;
  value: any;
  trackField: boolean;
}

export interface UpdateActionType {
  type: string;
  data: any;
  new: boolean;
}

export interface FetchPendingActionType {
  type: string;
}

export interface SetFilteredDataActionType {
  type: string;
  data: Array<any>;
}

export interface FetchSuccessActionType {
  type: string;
  payload: any;
}

export interface FetchErrorActionType {
  type: string;
  error: any;
}

export interface SetStatusActionType {
  type: string;
  status: string;
}

export type DataActionType =
  | SelectIdActionType
  | SetPageActionType
  | SetEditedDataActionType
  | UpdateDataActionType
  | UpdateEditedDataActionType
  | UpdateActionType
  | FetchPendingActionType
  | SetFilteredDataActionType
  | FetchSuccessActionType
  | FetchErrorActionType
  | SetStatusActionType;

export interface ReducerFunction {
  (state: DataState, action: DataActionType): DataState;
}
