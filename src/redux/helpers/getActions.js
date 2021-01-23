import stateRegister from "../../register/StateRegister";
import { generateHeaders, fetchWrapper } from "../../helpers/api";

export default function getActions(entity, endpoint) {
  const actionEntity = entity.replace(" ", "_").toUpperCase();
  const getPageAction = (page) => {
    return (dispatch) => {
      dispatch({ type: `FETCH_${actionEntity}_PENDING` });
      fetchWrapper(
        `${process.env.REACT_APP_API_URL}/${endpoint}/?page=${page}`,
        {
          headers: generateHeaders(),
        }
      )
        .then((json) => {
          const getNextPageNumber = stateRegister.getOption(
            entity,
            "getNextPageNumber"
          );
          const nextPage = getNextPageNumber(json);
          dispatch({
            type: `FETCH_${actionEntity}_SUCCESS`,
            payload: {
              data: json.results,
              page,
              nextPage,
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
      fetchWrapper(
        `${process.env.REACT_APP_API_URL}/${endpoint}/?search=${search}`,
        {
          headers: generateHeaders(),
        }
      )
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
      fetchWrapper(
        `${process.env.REACT_APP_API_URL}/${endpoint}/${
          data.id ? `${data.id}/` : ""
        }`,
        {
          method: data.id ? "PUT" : "POST",
          headers: generateHeaders(token),
          body: JSON.stringify(data),
        }
      )
        .then((json) => {
          dispatch({
            type: `UPDATE_${actionEntity}`,
            data: json,
            new: !data.id,
          });
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
