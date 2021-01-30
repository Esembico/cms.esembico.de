import { ChangeEvent, MouseEvent, ReactNode } from 'react';
import { Data } from '../../redux/helpers/types/state';
import { Column, Link, InputErrors } from '../../types/stateRegister';

export interface HeaderProps {
  children: ReactNode;
  loading?: boolean;
}

export interface ButtonWithLoadingProps {
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
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
  handleDrawerClose: () => void;
  classes: Record<'drawerHeader', string>;
  entityLinks: Array<Link>;
}

export interface BaseProps {
  children: ReactNode;
  token: string | null;
  sidebarVisible: boolean;
  setSidebarVisible: (visible: boolean) => void;
  logout: () => void;
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
  onPageChange: (page: number) => void;
  onSelect: (id: number) => void;
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
  width?: number | string;
  height?: number | string;
  alt?: string;
}

export interface InputErrorsProps {
  errors: InputErrors;
}

export interface MarkdownEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
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
  onChange: (newValue: Data | null) => void;
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
  onChange: (event: ChangeEvent<{ name?: string; value: unknown }>) => void;
  required?: boolean;
}

export interface TextFieldProps {
  label: string;
  value: string;
  errors: InputErrors;
  multiline?: boolean;
  onChange: (event: ChangeEvent) => void;
  required?: boolean;
  type?: string;
  InputProps?: any;
}
