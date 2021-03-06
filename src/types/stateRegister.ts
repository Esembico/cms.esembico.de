import { FC } from 'react';
import { SelectOption } from '../components/types/components';
import { EditorProps } from '../helpers/types/makeEditor';
import { EditPageProps } from '../helpers/types/makeEditPage';
import { ListPageProps } from '../helpers/types/makeListPage';
import { Actions } from '../redux/helpers/types/actions';
import { Mappers } from '../redux/helpers/types/mappers';
import { ReducerFunction } from '../redux/helpers/types/reducer';
import { Selectors } from '../redux/helpers/types/selectors';
import { Data, FieldValue } from '../redux/helpers/types/state';
import * as H from 'history';

export type InputErrors = Array<string>;

export interface ValidateData {
  (data: Data): Record<string, InputErrors> | Record<string, never>;
}
export interface ResolveValueFromDataFunction {
  (data: Data): string;
}
export interface Property {
  header: string;
  display: string | ResolveValueFromDataFunction;
}
export interface Column {
  header: string;
  display: string | ResolveValueFromDataFunction;
}

export interface IfFunction {
  (data: Data): boolean;
}

export type FieldProp = string | number | Data | null;

export interface FieldProps {
  [key: string]: FieldValue;
}

export interface FieldPropsFunction {
  (data: Data): FieldProps;
}

export interface EditorEntryBase {
  label: string | ResolveValueFromDataFunction;
  name: string;
  key?: string;
  if?: IfFunction;
  fieldProps?: FieldPropsFunction;
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

export interface BooleanEditorEntry extends EditorEntryBase {
  type: 'boolean';
  required?: boolean;
}

export type EditorEntry =
  | TextEditorEntry
  | NumberEditorEntry
  | SelectEditorEntry
  | UrlEditorEntry
  | ReferenceEditorEntry
  | MarkdownEditorEntry
  | GeneratedEditorEntry
  | ImagePreviewEditorEntry
  | BooleanEditorEntry;

export type StateOption =
  | number
  | string
  | Record<string, unknown>
  | Mappers
  | ReducerFunction
  | ValidateData
  | FC<EditorProps>
  | JSX.Element
  | Array<Column>
  | Property
  | undefined
  | boolean
  | GetNextPageNumber
  | Selectors
  | Array<EditorAction>;
export interface State {
  [option: string]: StateOption;
  header: string;
  actions: Actions;
  selectors: Selectors;
  mappers: Mappers;
  reducer: ReducerFunction;
  validateData: ValidateData;
  editor: FC<EditorProps>;
  icon?: JSX.Element;
  columns?: Array<Column>;
  primaryProperty?: Property;
  buildValidationFromEditor?: boolean;
  getNextPageNumber?: GetNextPageNumber;
  editorActions: Array<EditorAction>;
}
export interface States {
  [key: string]: State;
}
export interface GetNextPageNumberParams {
  [key: string]: string | number;
}
export interface GetNextPageNumber {
  (json: GetNextPageNumberParams): number | null;
}

export interface ActionDialogOptions {
  title?: string;
  text?: string;
  show: boolean;
  component?: JSX.Element;
  actions?: Array<EditorAction>;
}

export interface EditorActionParams {
  props: EditPageProps;
  id: number | string;
  entity: string;
  errors: InputErrors;
  history: H.History<unknown>;
}

export interface EditorAction {
  name: string;
  text: string;
  isSubmitAction?: boolean;
  buttonColor?: 'default' | 'inherit' | 'primary' | 'secondary';
  onClick?: (
    params: EditorActionParams,
    showDialog: (options: ActionDialogOptions) => void,
    closeDialog: () => void
  ) => void;
  loading?: (status: string) => boolean;
  disabled?: (params: EditorActionParams) => boolean;
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
  getNextPageNumber?: GetNextPageNumber;
  model?: string;
  editorActions?: Array<EditorAction>;
}
export interface Link {
  text: string;
  to: string;
  icon?: JSX.Element;
}
export interface Route {
  name: string;
  listPath: string;
  editPath: string;
  listComponent: FC<ListPageProps>;
  editComponent: FC<EditPageProps>;
}
export interface Reducers {
  [key: string]: ReducerFunction;
}
