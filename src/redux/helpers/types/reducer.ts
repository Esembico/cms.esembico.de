import { Data, DataState, FieldValue, StateError } from './state';

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
  data: Data;
}

export interface UpdateEditedDataActionType {
  type: string;
  field: string;
  value: FieldValue;
  trackField: boolean;
}

export interface UpdateActionType {
  type: string;
  data: Data;
  new: boolean;
}

export interface FetchPendingActionType {
  type: string;
}

export interface SetFilteredDataActionType {
  type: string;
  data: Array<Data>;
}

export interface FetchPayload {
  data: Array<Data>;
  page: number;
  nextPage: number;
  count: number;
}

export interface FetchSuccessActionType {
  type: string;
  payload: FetchPayload;
}

export interface FetchErrorActionType {
  type: string;
  error: StateError;
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
