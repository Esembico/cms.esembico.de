import { Actions } from '../redux/helpers/types/actions';
import { Mappers } from '../redux/helpers/types/mappers';
import { Selectors } from '../redux/helpers/types/selectors';

export interface ValidateData {
  (data?: any): any | void;
}
export interface Property {
  header: string;
  display: any | string;
}
export interface ResolveValueFromDataFunction {
  (data?: any): string;
}
export interface Column {
  header: string;
  display: string | ResolveValueFromDataFunction;
}
export interface EditorEntry {
  type: string;
  label?: string | ResolveValueFromDataFunction;
  name: string;
  required?: boolean;
  key?: string;
  base?: string;
  value?: ResolveValueFromDataFunction;
  to?: string;
  multiline?: boolean;
  if?: any;
}
export interface State {
  [key: string]: any;
  header: string;
  actions: Actions;
  selectors: Selectors;
  mappers: Mappers;
  reducer: any;
  validateData: ValidateData;
  editor: any;
  icon?: JSX.Element;
  columns?: Array<Column>;
}
export interface States {
  [key: string]: State;
}
export interface Options {
  singularName?: string;
  icon?: JSX.Element;
  columns?: Array<Column>;
  primaryProperty?: Property;
  validateData?: ValidateData;
  editor?: Array<EditorEntry>;
  buildValidationFromEditor?: boolean;
  endpoint?: string;
  header?: string;
  getNextPageNumber?: any;
}
export interface Link {
  text: string;
  to: string;
  icon?: any;
}
export interface Route {
  name: string;
  listPath: string;
  editPath: string;
  listComponent: any;
  editComponent: any;
}
export interface Reducers {
  [key: string]: any;
}
