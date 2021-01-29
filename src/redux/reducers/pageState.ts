import { SET_SIDEBAR_VISIBLE } from '../actionTypes';
import { DispatchActionFunction } from '../helpers/types/actions';
import {
  PageState,
  SetSidebarVisibleActionType,
  PageStateActionType
} from './types/pageState';

const initialState: PageState = {
  sidebarVisible: true
};

export function setSidebarVisibleAction(
  visible: boolean
): DispatchActionFunction {
  return (dispatch: (action: SetSidebarVisibleActionType) => void) => {
    dispatch({ type: SET_SIDEBAR_VISIBLE, visible });
  };
}

export default function reducer(
  state = initialState,
  action: PageStateActionType
): PageState {
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
