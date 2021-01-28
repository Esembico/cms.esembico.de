import { bindActionCreators } from 'redux';
import stateRegister from '../../register/stateRegister';

export default function getMappers(entity) {
  const mapStateToProps = (state) => {
    const {
      getError,
      getStatus,
      getCurrentPageData,
      getLastPage,
      getCurrentPage,
      getSelectedId,
      getSelectedData,
      getEditedData,
      getTotalItems,
      getLastEditedField
    } = stateRegister.getSelectors(entity);
    const error = getError(state);
    const status = getStatus(state);
    const data = getCurrentPageData(state);
    const lastPage = getLastPage(state);
    const currentPage = getCurrentPage(state);
    const selectedId = getSelectedId(state);
    const selectedData = getSelectedData(state);
    const editedData = getEditedData(state);
    const totalItems = getTotalItems(state);
    const lastEditedField = getLastEditedField(state);
    return {
      error,
      status,
      data,
      lastPage,
      currentPage,
      selectedId,
      selectedData,
      editedData,
      totalItems,
      lastEditedField
    };
  };

  const mapDispatchToProps = (dispatch) => {
    const {
      fetchAction,
      getPageAction,
      selectItemAction,
      setEditedDataAction,
      updateEditedDataAction,
      commitDataAction,
      deleteItemAction
    } = stateRegister.getActions(entity);
    return bindActionCreators(
      {
        fetchData: fetchAction,
        selectPage: getPageAction,
        selectItem: selectItemAction,
        setEditedData: setEditedDataAction,
        updateEditedData: updateEditedDataAction,
        commitData: commitDataAction,
        deleteItem: deleteItemAction
      },
      dispatch
    );
  };

  return { mapStateToProps, mapDispatchToProps };
}
