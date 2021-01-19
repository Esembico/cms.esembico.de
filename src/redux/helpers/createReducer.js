const initialState = {
  allIds: [],
  byIds: {},
  byPage: {},
  error: null,
  status: "idle",
  lastPage: 1,
  currentPage: 1,
  lastLoaded: 0,
  selectedId: null,
  editedData: null,
};

export default function createReducer(entity) {
  const actionEntity = entity.replace(" ", "_").toUpperCase();
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case `SELECT_${actionEntity}_ID`:
        return {
          ...state,
          selectedId: action.selectedId,
        };
      case `SET_EDITED_DATA_${actionEntity}`:
        const editedData = action.id === -1 ? {} : state.byIds[action.id];
        return {
          ...state,
          editedData,
        };
      case `UPDATE_EDITED_DATA_${actionEntity}`:
        const newData = { ...state.editedData, [action.field]: action.value };
        return {
          ...state,
          editedData: newData,
        };
      case `UPDATE_${actionEntity}`:
        return {
          ...state,
          byIds: {
            ...state.byIds,
            [action.data.id]: action.data,
          },
        };
      case `FETCH_${actionEntity}_PENDING`:
        return {
          ...state,
          status: "loading",
        };
      case `FETCH_${actionEntity}_SUCCESS`:
        const ids = [];
        const lookup = {};
        const pageItems = [];
        const { data, page, nextPage } = action.payload;
        data.forEach((member) => {
          pageItems.push(member.id);
          ids.push(member.id);
          lookup[member.id] = member;
        });

        const newLastPage = Math.max(
          state.lastPage,
          nextPage || state.lastPage
        );

        return {
          ...state,
          allIds: ids,
          byIds: lookup,
          byPage: { ...state.byPage, [page]: pageItems },
          status: "idle",
          lastPage: newLastPage,
          currentPage: page,
          lastLoaded: Date.now(),
        };
      case `FETCH_${actionEntity}_ERROR`:
        return {
          ...state,
          error: action.error,
          status: "idle",
        };
      default:
        return state;
    }
  };

  return reducer;
}
