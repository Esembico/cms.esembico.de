import stateRegister from '../../register/stateRegister';
import { generateHeaders, fetchWrapper } from '../../helpers/api';

export default function getActions(entity, endpoint) {
  const actionEntity = entity.replace(' ', '_').toUpperCase();

  const getPageAction = (page, forceLoad) => {
    return (dispatch, storeGetter) => {
      const store = storeGetter();
      const getPageLastLoaded = stateRegister.getSelector(
        entity,
        'getPageLastLoaded'
      );
      const lastLoaded = getPageLastLoaded(store, page);

      const diff = Date.now() - lastLoaded;

      if (!forceLoad && diff < 60000) {
        dispatch({ type: `SET_PAGE_${actionEntity}`, page });
        return;
      }

      dispatch({ type: `FETCH_${actionEntity}_PENDING` });
      fetchWrapper(
        `${process.env.REACT_APP_API_URL}/${endpoint}/?page=${page}`,
        {
          headers: generateHeaders()
        }
      )
        .then((json) => {
          const getNextPageNumber = stateRegister.getOption(
            entity,
            'getNextPageNumber'
          );
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

  const deleteItemAction = (id) => {
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
        })
        .catch((error) => {
          dispatch({ type: `FETCH_${actionEntity}_ERROR`, error });
        });
    };
  };

  const setFilteredDataAction = (search) => {
    return (dispatch) => {
      fetchWrapper(
        `${process.env.REACT_APP_API_URL}/${endpoint}/?search=${search}`,
        {
          headers: generateHeaders()
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

  const selectItemAction = (id) => {
    return (dispatch) => {
      dispatch({ type: `SELECT_${actionEntity}_ID`, selectedId: id });
    };
  };

  const setEditedDataAction = (id) => {
    return (dispatch, storeGetter) => {
      const store = storeGetter();
      if (id === -1 || store[entity].allIds.includes(id)) {
        dispatch({ type: `SET_EDITED_DATA_${actionEntity}`, id });
      } else {
        fetchWrapper(`${process.env.REACT_APP_API_URL}/${endpoint}/${id}/`)
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

  const updateEditedDataAction = (field, value) => {
    return (dispatch) => {
      dispatch({ type: `UPDATE_EDITED_DATA_${actionEntity}`, field, value });
    };
  };

  const commitDataAction = (data) => {
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
