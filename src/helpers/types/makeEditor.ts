export interface UpdateEvent {
  (field: string, newValue: any, trackField?: boolean): void;
}

export interface CreateFieldForPropertyParams {
  property: any;
  data: any;
  onUpdate: UpdateEvent;
  errors: any;
  lastEditedField: string | null;
}

export interface MakeEditorParams {
  properties: any;
}

export interface EditorProps {
  data: any;
  onUpdate: UpdateEvent;
  errors: any;
  lastEditedField: string | null;
}
