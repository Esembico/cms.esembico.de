import { SET_TOKEN, SET_USERNAME, SET_AUTH_ERROR } from "../actionTypes";
import { generateHeaders, fetchWrapper } from "../../helpers/api";

const localToken = localStorage.getItem("token");

const initialState = {
  token: localToken,
  username: null,
};

export function validateAuthAction() {
  return (dispatch, stateGetter) => {
    const state = stateGetter();
    fetchWrapper(`${process.env.REACT_APP_API_URL}/current-user/`, {
      headers: generateHeaders(state.auth.token),
    })
      .then((json) => {
        dispatch({ type: SET_USERNAME, username: json.username });
      })
      .catch((error) => {
        dispatch({ type: SET_TOKEN, token: null });
        dispatch({ type: SET_AUTH_ERROR, error });
      });
  };
}

export function authAction(username, password) {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.non_field_errors) {
          dispatch({ type: SET_AUTH_ERROR, error: json.non_field_errors });
        } else {
          dispatch({ type: SET_TOKEN, token: json.token });
          dispatch({ type: SET_USERNAME, username });
        }
      })
      .catch((err) => {
        dispatch({ type: SET_AUTH_ERROR, error: err });
      });
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      localStorage.setItem("token", action.token);
      return {
        ...state,
        token: action.token,
      };
    case SET_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
