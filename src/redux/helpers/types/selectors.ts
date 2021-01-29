import { Data, DataState, DataStore, StateError } from './state';

export interface Selectors {
  [name: string]: Selector;
  getError: GetError;
  getState: GetState;
  getList: GetList;
  getById: GetById;
  get: Get;
  getPage: GetPage;
  getCurrentPage: GetCurrentPage;
  getCurrentPageData: GetCurrentPageData;
  getLastPage: GetLastPage;
  getSelectedData: GetSelectedData;
  getEditedData: GetEditedData;
  getStatus: GetStatus;
  getSelectedId: GetSelectedId;
  getFilteredData: GetFilteredData;
  getPageLastLoaded: GetPageLastLoaded;
  getTotalItems: GetTotalItems;
  getLastEditedField: GetLastEditedField;
}

export type Selector =
  | GetError
  | GetState
  | GetList
  | GetById
  | Get
  | GetPage
  | GetCurrentPage
  | GetCurrentPageData
  | GetLastPage
  | GetSelectedData
  | GetEditedData
  | GetStatus
  | GetSelectedId
  | GetFilteredData
  | GetPageLastLoaded
  | GetTotalItems
  | GetLastEditedField;

export interface GetState {
  (store: DataStore): DataState;
}

export interface GetList {
  (store: DataStore): Array<number>;
}

export interface GetById {
  (store: DataStore, id: number): Data | Record<string, never>;
}

export interface Get {
  (store: DataStore): Array<Data | Record<string, never>>;
}

export interface GetPage {
  (store: DataStore, page: number): Array<number>;
}

export interface GetCurrentPage {
  (store: DataStore): number;
}

export interface GetLastPage {
  (store: DataStore): number;
}

export interface GetCurrentPageData {
  (store: DataStore): Array<Data | Record<string, never>>;
}

export interface GetStatus {
  (store: DataStore): string;
}

export interface GetError {
  (store: DataStore): StateError;
}

export interface GetSelectedId {
  (store: DataStore): number | null;
}

export interface GetSelectedData {
  (store: DataStore): Data | Record<string, never>;
}

export interface GetEditedData {
  (store: DataStore): Data | null;
}

export interface GetFilteredData {
  (store: DataStore): Array<Data>;
}

export interface GetPageLastLoaded {
  (store: DataStore, page: number): number;
}

export interface GetTotalItems {
  (store: DataStore): number;
}

export interface GetLastEditedField {
  (store: DataStore): string | null;
}
