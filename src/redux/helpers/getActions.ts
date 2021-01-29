import stateRegister from '../../register/stateRegister';
import { generateHeaders, fetchWrapper } from '../../helpers/api';
import {
  Actions,
  DispatchActionFunction,
  FetchSuccessCallback
} from './types/actions';
import { GetNextPageNumber } from '../../types/stateRegister';

export default function getActions(entity: string, endpoint: string): Actions {
  const actionEntity = entity.replace(' ', '_').toUpperCase();

  const getPageAction = (
    page: number,
    forceLoad?: boolean
  ): DispatchActionFunction => {
    return (dispatch, getState) => {
      const state = getState();
      const token = state.auth.token;
      const getPageLastLoaded = stateRegister.getSelector(
        entity,
        'getPageLastLoaded'
      );
      const lastLoaded = getPageLastLoaded(state, page);

      const diff = Date.now() - lastLoaded;

      if (!forceLoad && diff < 60000) {
        dispatch({ type: `SET_PAGE_${actionEntity}`, page });
        return;
      }

      dispatch({ type: `FETCH_${actionEntity}_PENDING` });
      fetchWrapper(
        `${process.env.REACT_APP_API_URL}/${endpoint}/?page=${page}`,
        {
          headers: generateHeaders(token)
        }
      )
        .then((json) => {
          const getNextPageNumber = stateRegister.getOption(
            entity,
            'getNextPageNumber'
          ) as GetNextPageNumber;
          const nextPage = getNextPageNumber(json);
          dispatch({
            type: `FETCH_${actionEntity}_SUCCESS`,
            payload: {
              data: json.results,
              count: json.count,
              page,
              nextPage
            }
          });
          return json.results;
        })
        .catch((err) => {
          dispatch({ type: `FETCH_${actionEntity}_ERROR`, error: err });
        });
    };
  };

  const deleteItemAction = (
    id: number,
    callback: FetchSuccessCallback
  ): DispatchActionFunction => {
    return (dispatch, storeGetter) => {
      dispatch({ type: `SET_STATUS_${actionEntity}`, status: 'deleting' });
      const store = storeGetter();
      const token = store.auth.token;
      const getCurrentPage = stateRegister.getSelector(
        entity,
        'getCurrentPage'
      );
      fetchWrapper(`${process.env.REACT_APP_API_URL}/${endpoint}/${id}/`, {
        method: 'DELETE',
        headers: generateHeaders(token)
      })
        .then(() => {
          const page = getCurrentPage(store);
          dispatch(getPageAction(page, true));
          dispatch({ type: `SET_STATUS_${actionEntity}`, status: 'idle' });
          if (callback && typeof callback === 'function') {
            callback();
          }
        })
        .catch((error) => {
          dispatch({ type: `FETCH_${actionEntity}_ERROR`, error });
        });
    };
  };

  const setFilteredDataAction = (search: string): DispatchActionFunction => {
    return (dispatch, getState) => {
      const state = getState();
      const token = state.auth.token;
      fetchWrapper(
        `${process.env.REACT_APP_API_URL}/${endpoint}/?search=${search}`,
        {
          headers: generateHeaders(token)
        }
      )
        .then((json) => {
          dispatch({
            type: `SET_FILTERED_DATA_${actionEntity}`,
            data: json.results
          });
        })
        .catch((err) => {
          dispatch({ type: `FETCH_${actionEntity}_ERROR`, error: err });
        });
    };
  };

  const fetchAction = () => {
    return getPageAction(1);
  };

  const selectItemAction = (id: number): DispatchActionFunction => {
    return (dispatch) => {
      dispatch({ type: `SELECT_${actionEntity}_ID`, selectedId: id });
    };
  };

  const setEditedDataAction = (id: number): DispatchActionFunction => {
    return (dispatch, getState) => {
      const state = getState();
      const token = state.auth.token;
      if (id === -1 || state[entity].allIds.includes(id)) {
        dispatch({ type: `SET_EDITED_DATA_${actionEntity}`, id });
      } else {
        fetchWrapper(`${process.env.REACT_APP_API_URL}/${endpoint}/${id}/`, {
          headers: generateHeaders(token)
        })
          .then((json) => {
            dispatch({ type: `UPDATE_DATA_${actionEntity}`, data: json });
            dispatch({ type: `SET_EDITED_DATA_${actionEntity}`, id });
          })
          .catch((error) => {
            dispatch({ type: `FETCH_${actionEntity}_ERROR`, error });
          });
      }
    };
  };

  const updateEditedDataAction = (
    field: string,
    value: any,
    trackField = true
  ): DispatchActionFunction => {
    return (dispatch) => {
      dispatch({
        type: `UPDATE_EDITED_DATA_${actionEntity}`,
        field,
        value,
        trackField
      });
    };
  };

  const commitDataAction = (
    data: any,
    callback: FetchSuccessCallback
  ): DispatchActionFunction => {
    return (dispatch, storeGetter) => {
      const store = storeGetter();
      const token = store.auth.token;
      dispatch({ type: `SET_STATUS_${actionEntity}`, status: 'saving' });
      fetchWrapper(
        `${process.env.REACT_APP_API_URL}/${endpoint}/${
          data.id ? `${data.id}/` : ''
        }`,
        {
          method: data.id ? 'PUT' : 'POST',
          headers: generateHeaders(token),
          body: JSON.stringify(data)
        }
      )
        .then((json) => {
          dispatch({
            type: `UPDATE_${actionEntity}`,
            data: json,
            new: !data.id
          });
          dispatch({ type: `SET_STATUS_${actionEntity}`, status: 'idle' });
          if (callback && typeof callback === 'function') {
            callback(json);
          }
        })
        .catch((err) => {
          dispatch({ type: `FETCH_${actionEntity}_ERROR`, error: err });
        });
    };
  };

  return {
    getPageAction,
    fetchAction,
    selectItemAction,
    setEditedDataAction,
    updateEditedDataAction,
    commitDataAction,
    setFilteredDataAction,
    deleteItemAction
  };
}
