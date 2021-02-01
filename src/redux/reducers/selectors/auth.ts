import { AuthState, Permission } from '../types/auth';
import { ReduxStore } from '../types/base';

export const getState = (store: ReduxStore): AuthState => {
  return store.auth;
};

export const getToken = (store: ReduxStore): string | null => {
  return getState(store) ? getState(store).token : null;
};

export const getUsername = (store: ReduxStore): string | null => {
  return getState(store) ? getState(store).username : null;
};

export const isSuperuser = (store: ReduxStore): boolean => {
  return getState(store) ? getState(store).superuser : false;
};

export const getPermissions = (store: ReduxStore): Array<Permission> => {
  return getState(store) ? getState(store).permissions : [];
};

export const hasPermission = (store: ReduxStore, codename: string): boolean => {
  if (isSuperuser(store)) {
    return true;
  }
  const permissions = getPermissions(store);
  const foundPermission = permissions.find(
    (permission) => permission.codename === codename
  );

  return !!foundPermission;
};

export const hasModelPermission = (
  store: ReduxStore,
  model: string,
  type: 'add' | 'change' | 'delete' | 'view'
): boolean => {
  return hasPermission(store, `${type}_${model}`);
};
