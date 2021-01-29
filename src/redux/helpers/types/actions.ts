import { Data } from './state';

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
  (field: string, value: any, trackField?: boolean): DispatchActionFunction;
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
  (): any;
}

export interface DispatchActionFunction {
  (dispatch: any, getState: GetState): void;
}

export interface JsonResponse {
  [key: string]: string;
}

export interface FetchSuccessCallback {
  (json?: JsonResponse): void;
}
