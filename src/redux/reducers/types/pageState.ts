import { SET_SIDEBAR_VISIBLE, SET_THEME } from '../../actionTypes';

export type Theme = 'system' | 'dark' | 'light';

export interface PageState {
  sidebarVisible: boolean;
  themeName: Theme;
}

export interface SetSidebarVisibleActionType {
  type: typeof SET_SIDEBAR_VISIBLE;
  visible: boolean;
}

export interface SetThemeActionType {
  type: typeof SET_THEME;
  theme: Theme;
}

export type PageStateActionType =
  | SetSidebarVisibleActionType
  | SetThemeActionType;
