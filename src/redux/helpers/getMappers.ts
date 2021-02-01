import { bindActionCreators } from 'redux';
import stateRegister from '../../register/stateRegister';
import { Mappers } from './types/mappers';
import { addAlertAction } from '../reducers/alert';
import { hasModelPermission } from '../reducers/selectors/auth';

export default function getMappers(entity: string, model: string): Mappers {
  const mapStateToProps = (state: any) => {
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
    const canDelete = hasModelPermission(state, model, 'delete');
    const canAdd = hasModelPermission(state, model, 'add');
    const canChange = hasModelPermission(state, model, 'change');
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
      lastEditedField,
      canAdd,
      canDelete,
      canChange
    };
  };

  const mapDispatchToProps = (dispatch: any) => {
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
        deleteItem: deleteItemAction,
        addAlert: addAlertAction
      },
      dispatch
    );
  };

  return { mapStateToProps, mapDispatchToProps };
}
