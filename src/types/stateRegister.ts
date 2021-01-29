import { SelectOption } from '../components/types/components';
import { Actions } from '../redux/helpers/types/actions';
import { Mappers } from '../redux/helpers/types/mappers';
import { Selectors } from '../redux/helpers/types/selectors';

export type InputErrors = Array<string>;

export interface ValidateData {
  (data?: any): InputErrors | Record<string, never>;
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

export interface EditorEntryBase {
  label: string | ResolveValueFromDataFunction;
  name: string;
  key?: string;
  if?: any;
}

export interface TextEditorEntry extends EditorEntryBase {
  type: 'text';
  required?: boolean;
  multiline?: boolean;
}

export interface NumberEditorEntry extends EditorEntryBase {
  type: 'number';
  required?: boolean;
}

export interface SelectEditorEntry extends EditorEntryBase {
  type: 'select';
  required?: boolean;
  options: Array<SelectOption>;
}

export interface UrlEditorEntry extends EditorEntryBase {
  type: 'url';
  required?: boolean;
}

export interface ReferenceEditorEntry extends EditorEntryBase {
  type: 'reference';
  required?: boolean;
  to: string;
}

export interface MarkdownEditorEntry extends EditorEntryBase {
  type: 'markdown';
  required?: boolean;
}

export interface GeneratedEditorEntry extends EditorEntryBase {
  type: 'generated';
  value: ResolveValueFromDataFunction;
  dependsOn: Array<string>;
  required?: boolean;
}

export interface ImagePreviewEditorEntry extends EditorEntryBase {
  type: 'image-preview';
  base?: string;
  required?: false;
}

export type EditorEntry =
  | TextEditorEntry
  | NumberEditorEntry
  | SelectEditorEntry
  | UrlEditorEntry
  | ReferenceEditorEntry
  | MarkdownEditorEntry
  | GeneratedEditorEntry
  | ImagePreviewEditorEntry;

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
