export type StateError = Error | string | null;

export interface Data {
  [key: string]: string | number | Data;
  id: number;
}
export interface PageLookup {
  [key: number]: Array<number>;
}
export interface PageLoadedLookup {
  [key: number]: number;
}
export interface DataStore {
  [key: string]: any;
}
export interface IdLookup {
  [key: number]: Data;
}
export interface DataState {
  allIds: Array<number>;
  byIds: IdLookup;
  byPage: PageLookup;
  currentPage: number;
  lastPage: number;
  status: string;
  error: StateError;
  selectedId: number | null;
  editedData: Data | null;
  filteredData: Array<Data>;
  pageLoaded: PageLoadedLookup;
  totalItems: number;
  lastEditedField: string | null;
}
