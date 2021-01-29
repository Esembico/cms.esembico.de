import { DataState, IdLookup } from './types/state';
import {
  DataActionType,
  SelectIdActionType,
  SetPageActionType,
  SetEditedDataActionType,
  UpdateDataActionType,
  UpdateEditedDataActionType,
  UpdateActionType,
  FetchSuccessActionType,
  SetFilteredDataActionType,
  FetchErrorActionType,
  SetStatusActionType,
  ReducerFunction
} from './types/reducer';

const initialState: DataState = {
  allIds: [],
  byIds: {},
  byPage: {},
  error: null,
  status: 'idle',
  lastPage: 1,
  currentPage: 1,
  totalItems: 0,
  selectedId: null,
  editedData: null,
  filteredData: [],
  pageLoaded: {},
  lastEditedField: null
};

export default function createReducer(entity: string): ReducerFunction {
  const actionEntity = entity.replace(' ', '_').toUpperCase();
  const reducer = (state = initialState, action: DataActionType) => {
    switch (action.type) {
      case `SELECT_${actionEntity}_ID`:
        const selectIdAction = action as SelectIdActionType;
        return {
          ...state,
          selectedId: selectIdAction.selectedId
        };
      case `SET_PAGE_${actionEntity}`:
        const setPageAction = action as SetPageActionType;
        return {
          ...state,
          currentPage: setPageAction.page
        };
      case `SET_EDITED_DATA_${actionEntity}`:
        const setEditedDataAction = action as SetEditedDataActionType;
        const editedData =
          setEditedDataAction.id === -1
            ? {}
            : state.byIds[setEditedDataAction.id];
        return {
          ...state,
          editedData
        };
      case `UPDATE_DATA_${actionEntity}`:
        const updateDataAction = action as UpdateDataActionType;
        const newIds = state.allIds;
        if (!newIds.includes(updateDataAction.data.id)) {
          newIds.push(updateDataAction.data.id);
        }
        return {
          ...state,
          allIds: newIds,
          byIds: {
            ...state.byIds,
            [updateDataAction.data.id]: updateDataAction.data
          }
        };
      case `UPDATE_EDITED_DATA_${actionEntity}`:
        const updateEditedDataAction = action as UpdateEditedDataActionType;
        const newData = {
          ...state.editedData,
          [updateEditedDataAction.field]: updateEditedDataAction.value
        };
        return {
          ...state,
          editedData: newData,
          lastEditedField: updateEditedDataAction.trackField
            ? updateEditedDataAction.field
            : state.lastEditedField
        };
      case `UPDATE_${actionEntity}`:
        const updateAction = action as UpdateActionType;
        const page1 = state.byPage[1];
        if (updateAction.new) {
          page1.unshift(updateAction.data.id);
        }
        return {
          ...state,
          byIds: {
            ...state.byIds,
            [updateAction.data.id]: updateAction.data
          },
          pageLoaded: {}
        };
      case `FETCH_${actionEntity}_PENDING`:
        return {
          ...state,
          status: 'loading'
        };
      case `SET_FILTERED_DATA_${actionEntity}`:
        const setFilteredDataAction = action as SetFilteredDataActionType;
        return {
          ...state,
          filteredData: setFilteredDataAction.data
        };
      case `FETCH_${actionEntity}_SUCCESS`:
        const fetchSuccessAction = action as FetchSuccessActionType;
        const ids: Array<number> = [];
        const newLookup: IdLookup = {};
        const pageItems: Array<number> = [];
        const { data, page, nextPage } = fetchSuccessAction.payload;
        data.forEach((item: { id: number }) => {
          pageItems.push(item.id);
          ids.push(item.id);
          newLookup[item.id] = item;
        });

        const lookup = { ...state.byIds, ...newLookup };

        const newLastPage = Math.max(
          state.lastPage,
          nextPage || state.lastPage
        );

        return {
          ...state,
          allIds: ids,
          byIds: lookup,
          byPage: { ...state.byPage, [page]: pageItems },
          status: 'idle',
          lastPage: newLastPage,
          currentPage: page,
          totalItems: fetchSuccessAction.payload.count,
          pageLoaded: {
            ...state.pageLoaded,
            [page]: Date.now()
          }
        };
      case `FETCH_${actionEntity}_ERROR`:
        const fetchErrorAction = action as FetchErrorActionType;
        return {
          ...state,
          error: fetchErrorAction.error,
          status: 'idle'
        };
      case `SET_STATUS_${actionEntity}`:
        const setStatusAction = action as SetStatusActionType;
        return {
          ...state,
          status: setStatusAction.status
        };
      default:
        return state;
    }
  };

  return reducer;
}
