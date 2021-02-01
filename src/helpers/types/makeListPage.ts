import { Column } from '../../types/stateRegister';

export interface MakeListPageParams {
  columns: Array<Column>;
  entity: string;
}

export interface ListPageProps {
  data: any;
  status: string;
  lastPage: number;
  currentPage: number;
  totalItems: number;
  selectPage: any;
  selectItem: any;
  selectedId: number | null;
  canAdd: boolean;
}
