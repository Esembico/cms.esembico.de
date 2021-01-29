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
  [key: number]: any;
}
export interface DataState {
  allIds: Array<number>;
  byIds: IdLookup;
  byPage: PageLookup;
  currentPage: number;
  lastPage: number;
  status: string;
  error: any;
  selectedId: number | null;
  editedData: Object | null;
  filteredData: Array<Object>;
  pageLoaded: PageLoadedLookup;
  totalItems: number;
  lastEditedField: string | null;
}
