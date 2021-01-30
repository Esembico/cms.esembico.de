export type FieldValue = string | number | Data | null;

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
  [key: string]: DataState;
}
export interface IdLookup {
  [key: number]: Data;
}

export type DataStateProperties =
  | Array<number>
  | IdLookup
  | PageLookup
  | number
  | string
  | StateError
  | null
  | Data
  | Array<Data>
  | PageLoadedLookup;

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
  [key: string]: DataStateProperties;
}
