const generateHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  return headers;
};

export default function getActions(entity, endpoint) {
  const actionEntity = entity.replace(" ", "_").toUpperCase();
  const getPageAction = (page) => {
    return (dispatch) => {
      dispatch({ type: `FETCH_${actionEntity}_PENDING` });
      fetch(`${process.env.REACT_APP_API_URL}/${endpoint}/?page=${page}`, {
        headers: generateHeaders(),
      })
        .then((res) => res.json())
        .then((json) => {
          dispatch({
            type: `FETCH_${actionEntity}_SUCCESS`,
            payload: {
              data: json.results,
              page,
              nextPage: json.next,
            },
          });
          return json.results;
        })
        .catch((err) => {
          dispatch({ type: `FETCH_${actionEntity}_ERROR`, error: err });
        });
    };
  };

  const setFilteredDataAction = (search) => {
    return (dispatch) => {
      fetch(`${process.env.REACT_APP_API_URL}/${endpoint}/?search=${search}`, {
        headers: generateHeaders(),
      })
        .then((res) => res.json())
        .then((json) => {
          dispatch({
            type: `SET_FILTERED_DATA_${actionEntity}`,
            data: json.results,
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
    return (dispatch) => {
      dispatch({ type: `SET_EDITED_DATA_${actionEntity}`, id });
    };
  };

  const updateEditedDataAction = (field, value) => {
    return (dispatch) => {
      dispatch({ type: `UPDATE_EDITED_DATA_${actionEntity}`, field, value });
    };
  };

  const commitDataAction = (data) => {
    return (dispatch, stateGetter) => {
      const state = stateGetter();
      const token = state.auth.token;
      fetch(
        `${process.env.REACT_APP_API_URL}/${endpoint}/${
          data.id ? `${data.id}/` : "/"
        }`,
        {
          method: data.id ? "PUT" : "POST",
          headers: generateHeaders(token),
          body: JSON.stringify(data),
        }
      )
        .then((res) => res.json())
        .then((json) => {
          dispatch({ type: `UPDATE_${actionEntity}`, data: json });
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
  };
}
