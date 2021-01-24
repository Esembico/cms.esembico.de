import { SET_SIDEBAR_VISIBLE } from '../actionTypes';

const initialState = {
  sidebarVisible: false
};

export function setSidebarVisibleAction(visible) {
  return (dispatch) => {
    dispatch({ type: SET_SIDEBAR_VISIBLE, visible });
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_VISIBLE:
      return {
        ...state,
        sidebarVisible: action.visible
      };
    default:
      return state;
  }
}
