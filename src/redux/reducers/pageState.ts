import { SET_SIDEBAR_VISIBLE, SET_THEME } from '../actionTypes';
import { DispatchActionFunction } from '../helpers/types/actions';
import {
  PageState,
  SetSidebarVisibleActionType,
  PageStateActionType,
  SetThemeActionType,
  Theme
} from './types/pageState';

const currentTheme = localStorage.getItem('theme') ?? 'system';

const initialState: PageState = {
  sidebarVisible: true,
  themeName: currentTheme as Theme
};

export function setSidebarVisibleAction(
  visible: boolean
): DispatchActionFunction {
  return (dispatch: (action: SetSidebarVisibleActionType) => void) => {
    dispatch({ type: SET_SIDEBAR_VISIBLE, visible });
  };
}

export function setThemeAction(theme: Theme): DispatchActionFunction {
  return (dispatch: (action: SetThemeActionType) => void) => {
    dispatch({ type: SET_THEME, theme });
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
    case SET_THEME:
      localStorage.setItem('theme', action.theme);
      return {
        ...state,
        themeName: action.theme
      };
    default:
      return state;
  }
}
