import { ReactNode } from 'react';
import { Data } from '../../redux/helpers/types/state';
import { Column, Link } from '../../types/stateRegister';

export type InputErrors = Array<string>;

export interface HeaderProps {
  children: ReactNode;
  loading?: boolean;
}

export interface ButtonWithLoadingProps {
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: any;
  color?: 'inherit' | 'default' | 'primary' | 'secondary';
}

export interface ListItemLinkProps {
  icon?: JSX.Element;
  primary: string;
  to: string;
  exact?: boolean;
}

export interface PrivateRouteProps {
  token: string | null;
  component: any;
  exact?: boolean;
  path: string;
}

export interface DrawerContentProps {
  handleDrawerClose: any;
  classes: any;
  entityLinks: Array<Link>;
}

export interface BaseProps {
  children: ReactNode;
  token: string | null;
  sidebarVisible: boolean;
  setSidebarVisible: any;
  logout: any;
}

export interface PageData {
  current: number;
  last: number;
}

export interface DataTableProps {
  data: Array<Data>;
  columns: Array<Column>;
  pageData: PageData;
  totalItems: number;
  onPageChange: any;
  onSelect: any;
  selected: number | null;
  className: string;
}

export interface ColumnProps {
  children: ReactNode;
  width: number;
}

export interface ContainerProps {
  children: ReactNode;
}

export interface RowProps {
  children: ReactNode;
}

export interface ImagePreviewProps {
  value: string;
  base?: string;
}

export interface InputErrorsProps {
  errors: InputErrors;
}

export interface MarkdownEditorProps {
  label: string;
  value: string;
  onChange: any;
  errors: InputErrors;
}

export interface CodeRendererParams {
  language: string;
  value: any;
}

export interface SearchableFieldProps {
  label: string;
  entity: string;
  value: Data;
  onChange: any;
  errors: InputErrors;
  required?: boolean;
}

export interface SelectOption {
  value: string;
  display: string;
}

export interface SelectProps {
  label: string;
  value: string;
  options: Array<SelectOption>;
  errors: InputErrors;
  onChange: any;
  required?: boolean;
}

export interface TextFieldProps {
  label: string;
  value: string;
  errors: InputErrors;
  multiline?: boolean;
  onChange: any;
  required?: boolean;
  type?: string;
  InputProps?: any;
}
