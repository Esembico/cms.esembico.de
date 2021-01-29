import {
  GetState,
  GetList,
  GetById,
  Get,
  GetPage,
  GetCurrentPage,
  GetLastPage,
  GetCurrentPageData,
  GetStatus,
  GetError,
  GetSelectedId,
  GetSelectedData,
  GetEditedData,
  GetFilteredData,
  GetPageLastLoaded,
  GetTotalItems,
  GetLastEditedField,
  Selectors
} from './types/selectors';

export default function getSelectors(entity: string): Selectors {
  const getState: GetState = (store) => {
    return store[entity];
  };

  const getList: GetList = (store) => {
    return getState(store) ? getState(store).allIds : [];
  };

  const getById: GetById = (store, id) => {
    return getState(store) ? { ...getState(store).byIds[id], id } : {};
  };

  const get: Get = (store) => {
    return getList(store).map((id: number) => getById(store, id));
  };

  const getPage: GetPage = (store, page) => {
    const pageData = getState(store) ? getState(store).byPage[page] : [];
    return pageData || [];
  };

  const getCurrentPage: GetCurrentPage = (store) => {
    return getState(store) ? getState(store).currentPage : 1;
  };

  const getLastPage: GetLastPage = (store) => {
    return getState(store) ? getState(store).lastPage : 1;
  };

  const getCurrentPageData: GetCurrentPageData = (store) => {
    const currentPage = getCurrentPage(store);
    return getPage(store, currentPage).map((id: number) => getById(store, id));
  };

  const getStatus: GetStatus = (store) => {
    return getState(store) ? getState(store).status : 'idle';
  };

  const getError: GetError = (store) => {
    return getState(store) ? getState(store).error : null;
  };

  const getSelectedId: GetSelectedId = (store) => {
    return getState(store) ? getState(store).selectedId : null;
  };

  const getSelectedData: GetSelectedData = (store) => {
    const selectedId = getSelectedId(store);
    if (selectedId) {
      return getSelectedId(store) ? getById(store, selectedId) : {};
    } else {
      return {};
    }
  };

  const getEditedData: GetEditedData = (store) => {
    return getState(store) ? getState(store).editedData : null;
  };

  const getFilteredData: GetFilteredData = (store) => {
    return getState(store) ? getState(store).filteredData : [];
  };

  const getPageLastLoaded: GetPageLastLoaded = (store, page) => {
    const state = getState(store);
    if (!state) {
      return 0;
    }
    return state.pageLoaded[page] ? state.pageLoaded[page] : 0;
  };

  const getTotalItems: GetTotalItems = (store) => {
    return getState(store) ? getState(store).totalItems : 0;
  };

  const getLastEditedField: GetLastEditedField = (store) => {
    return getState(store) ? getState(store).lastEditedField : null;
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
    getPageLastLoaded,
    getTotalItems,
    getLastEditedField
  };
}
