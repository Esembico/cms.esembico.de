export default function getSelectors(entity) {
  const getState = (store) => {
    return store[entity];
  };

  const getList = (store) => {
    return getState(store) ? getState(store).allIds : [];
  };

  const getById = (store, id) => {
    return getState(store) ? { ...getState(store).byIds[id], id } : {};
  };

  const get = (store) => {
    return getList(store).map((id) => getById(store, id));
  };

  const getPage = (store, page) => {
    const pageData = getState(store) ? getState(store).byPage[page] : [];
    return pageData || [];
  };

  const getCurrentPage = (store) => {
    return getState(store) ? getState(store).currentPage : 1;
  };

  const getLastPage = (store) => {
    return getState(store) ? getState(store).lastPage : 1;
  };

  const getCurrentPageData = (store) => {
    const currentPage = getCurrentPage(store);
    return getPage(store, currentPage).map((id) => getById(store, id));
  };

  const getStatus = (store) => {
    return getState(store) ? getState(store).status : 'idle';
  };

  const getError = (store) => {
    return getState(store) ? getState(store).error : null;
  };

  const getSelectedId = (store) => {
    return getState(store) ? getState(store).selectedId : null;
  };

  const getSelectedData = (store) => {
    return getSelectedId(store) ? getById(store, getSelectedId(store)) : {};
  };

  const getEditedData = (store) => {
    return getState(store) ? getState(store).editedData : null;
  };

  const getFilteredData = (store) => {
    return getState(store) ? getState(store).filteredData : [];
  };

  const getPageLastLoaded = (store, page) => {
    const state = getState(store);
    if (!state) {
      return 0;
    }
    return state.pageLoaded[page] ? state.pageLoaded[page] : 0;
  };

  return {
    getState,
    getList,
    getById,
    get,
    getPage,
    getCurrentPage,
    getLastPage,
    getCurrentPageData,
    getStatus,
    getError,
    getSelectedId,
    getSelectedData,
    getEditedData,
    getFilteredData,
    getPageLastLoaded
  };
}
