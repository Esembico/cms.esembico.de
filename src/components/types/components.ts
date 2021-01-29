import { ReactNode } from 'react';
import { Column, Link } from '../../types/stateRegister';

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
  data: any;
  columns: Array<Column>;
  pageData: PageData;
  totalItems: number;
  onPageChange: any;
  onSelect: any;
  selected: any;
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
  errors: any;
}

export interface MarkdownEditorProps {
  label: string;
  value: string;
  onChange: any;
  errors: any;
}

export interface CodeRendererParams {
  language: string;
  value: any;
}

export interface SearchableFieldProps {
  label: string;
  entity: string;
  value: any;
  onChange: any;
  errors: any;
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
  errors: any;
  onChange: any;
  required?: boolean;
}

export interface TextFieldProps {
  label: string;
  value: string;
  errors: any;
  multiline?: boolean;
  onChange: any;
  required?: boolean;
  type?: string;
  InputProps?: any;
}
