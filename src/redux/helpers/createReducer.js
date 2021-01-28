const initialState = {
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

export default function createReducer(entity) {
  const actionEntity = entity.replace(' ', '_').toUpperCase();
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case `SELECT_${actionEntity}_ID`:
        return {
          ...state,
          selectedId: action.selectedId
        };
      case `SET_PAGE_${actionEntity}`:
        return {
          ...state,
          currentPage: action.page
        };
      case `SET_EDITED_DATA_${actionEntity}`:
        const editedData = action.id === -1 ? {} : state.byIds[action.id];
        return {
          ...state,
          editedData
        };
      case `UPDATE_DATA_${actionEntity}`:
        const newIds = state.allIds;
        if (!newIds.includes(action.data.id)) {
          newIds.push(action.data.id);
        }
        return {
          ...state,
          allIds: newIds,
          byIds: {
            ...state.byIds,
            [action.data.id]: action.data
          }
        };
      case `UPDATE_EDITED_DATA_${actionEntity}`:
        const newData = { ...state.editedData, [action.field]: action.value };
        return {
          ...state,
          editedData: newData,
          lastEditedField: action.trackField
            ? action.field
            : state.lastEditedField
        };
      case `UPDATE_${actionEntity}`:
        const page1 = state.byPage[1];
        if (action.new) {
          page1.unshift(action.data.id);
        }
        return {
          ...state,
          byIds: {
            ...state.byIds,
            [action.data.id]: action.data
          },
          pageLoaded: {}
        };
      case `FETCH_${actionEntity}_PENDING`:
        return {
          ...state,
          status: 'loading'
        };
      case `SET_FILTERED_DATA_${actionEntity}`:
        return {
          ...state,
          filteredData: action.data
        };
      case `FETCH_${actionEntity}_SUCCESS`:
        const ids = [];
        const newLookup = {};
        const pageItems = [];
        const { data, page, nextPage } = action.payload;
        data.forEach((member) => {
          pageItems.push(member.id);
          ids.push(member.id);
          newLookup[member.id] = member;
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
          totalItems: action.payload.count,
          pageLoaded: {
            ...state.pageLoaded,
            [page]: Date.now()
          }
        };
      case `FETCH_${actionEntity}_ERROR`:
        return {
          ...state,
          error: action.error,
          status: 'idle'
        };
      case `SET_STATUS_${actionEntity}`:
        return {
          ...state,
          status: action.status
        };
      default:
        return state;
    }
  };

  return reducer;
}
