import { PageState, Theme } from '../types/pageState';
import { ReduxStore } from '../types/base';

export const getState = (store: ReduxStore): PageState => {
  return store.pageState;
};

export const isSidebarVisible = (store: ReduxStore): boolean => {
  return getState(store) ? getState(store).sidebarVisible : true;
};

export const getThemeName = (store: ReduxStore): Theme => {
  return getState(store) ? getState(store).themeName : 'system';
};
