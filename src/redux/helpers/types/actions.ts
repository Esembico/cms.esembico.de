import { AnyAction } from 'redux';
import { Data, DataStore, FieldValue } from './state';

export interface GetPageAction {
  (page: number, forceReload?: boolean): DispatchActionFunction;
}

export interface DeleteItemAction {
  (id: number, callback: FetchSuccessCallback): DispatchActionFunction;
}

export interface SetFilteredDataAction {
  (search: string): DispatchActionFunction;
}

export interface SelectItemAction {
  (id: number): DispatchActionFunction;
}

export interface SetEditedDataAction {
  (id: number): DispatchActionFunction;
}

export interface UpdateEditedDataAction {
  (
    field: string,
    value: FieldValue,
    trackField?: boolean
  ): DispatchActionFunction;
}

export interface CommitDataAction {
  (data: Data, callback: FetchSuccessCallback): DispatchActionFunction;
}

export type ActionFunction =
  | GetPageAction
  | DeleteItemAction
  | SetFilteredDataAction
  | SelectItemAction
  | SetEditedDataAction
  | UpdateEditedDataAction
  | CommitDataAction;

export interface Actions {
  [name: string]: ActionFunction;
}

export interface GetState {
  (): DataStore;
}

export interface DispatchFunction {
  (action: DispatchActionFunction | AnyAction): void;
}

export interface DispatchActionFunction {
  (dispatch: DispatchFunction, getState: GetState): void;
}

export interface JsonResponse {
  [key: string]: string;
}

export interface FetchSuccessCallback {
  (json?: JsonResponse): void;
}
