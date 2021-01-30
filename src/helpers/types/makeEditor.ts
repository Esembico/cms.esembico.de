import { Data } from '../../redux/helpers/types/state';
import { EditorEntry } from '../../types/stateRegister';

export interface UpdateEvent {
  (field: string, newValue: any, trackField?: boolean): void;
}

export interface CreateFieldForPropertyParams {
  property: EditorEntry;
  data: Data;
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
