import { DataState, DataStore } from './state';

export interface Selectors {
  [name: string]: any;
}

export interface GetState {
  (store: DataStore): DataState;
}

export interface GetList {
  (store: DataStore): Array<any>;
}

export interface GetById {
  (store: DataStore, id: number): any;
}

export interface Get {
  (store: DataStore): any;
}

export interface GetPage {
  (store: DataStore, page: number): Array<any>;
}

export interface GetCurrentPage {
  (store: DataStore): number;
}

export interface GetLastPage {
  (store: DataStore): number;
}

export interface GetCurrentPageData {
  (store: DataStore): any;
}

export interface GetStatus {
  (store: DataStore): string;
}

export interface GetError {
  (store: DataStore): any;
}

export interface GetSelectedId {
  (store: DataStore): number | null;
}

export interface GetSelectedData {
  (store: DataStore): any;
}

export interface GetEditedData {
  (store: DataStore): any;
}

export interface GetFilteredData {
  (store: DataStore): Array<any>;
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
