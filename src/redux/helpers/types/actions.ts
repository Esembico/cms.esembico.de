export interface Actions {
  [name: string]: any;
}

export interface DispatchActionFunction {
  (dispatch: any, getState?: any): any;
}

export interface FetchSuccessCallback {
  (json?: any): void;
}
