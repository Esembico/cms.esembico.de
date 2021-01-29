export interface MakeEditPageParams {
  Editor: any;
  entity: string;
}

export interface EditPageProps {
  editedData: any;
  selectPage: any;
  selectedId: number | null;
  setEditedData: any;
  updateEditedData: any;
  commitData: any;
  deleteItem: any;
  status: string;
  lastEditedField: string | null;
}
