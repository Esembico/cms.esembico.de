export default function getActions(entity, endpoint) {
  const actionEntity = entity.replace(" ", "_").toUpperCase();
  const getPageAction = (page) => {
    return (dispatch) => {
      dispatch({ type: `FETCH_${actionEntity}_PENDING` });
      fetch(`${process.env.REACT_APP_API_URL}/${endpoint}/?format=json&page=${page}`)
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
    return (dispatch) => {
      // POST Data to server
      dispatch({ type: `UPDATE_${actionEntity}`, data });
    };
  };

  return {
    getPageAction,
    fetchAction,
    selectItemAction,
    setEditedDataAction,
    updateEditedDataAction,
    commitDataAction,
  };
}
