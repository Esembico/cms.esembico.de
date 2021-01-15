import { bindActionCreators } from "redux";
import getSelectors from "./getSelectors";
import getActions from "./getActions";

export default function getMappers(entity, endpoint) {
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
    } = getSelectors(entity);
    const error = getError(state);
    const status = getStatus(state);
    const data = getCurrentPageData(state);
    const lastPage = getLastPage(state);
    const currentPage = getCurrentPage(state);
    const selectedId = getSelectedId(state);
    const selectedData = getSelectedData(state);
    const editedData = getEditedData(state);
    return {
      error,
      status,
      data,
      lastPage,
      currentPage,
      selectedId,
      selectedData,
      editedData,
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
    } = getActions(entity, endpoint);
    return bindActionCreators(
      {
        fetchData: fetchAction,
        selectPage: getPageAction,
        selectItem: selectItemAction,
        setEditedData: setEditedDataAction,
        updateEditedData: updateEditedDataAction,
        commitData: commitDataAction,
      },
      dispatch
    );
  };

  return { mapStateToProps, mapDispatchToProps };
}
