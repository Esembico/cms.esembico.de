import { SET_SIDEBAR_VISIBLE } from '../../actionTypes';

export interface PageState {
  sidebarVisible: boolean;
}

export interface SetSidebarVisibleActionType {
  type: typeof SET_SIDEBAR_VISIBLE;
  visible: boolean;
}

export type PageStateActionType = SetSidebarVisibleActionType;
