import { Data, FieldValue } from '../../redux/helpers/types/state';
import { EditorEntry, InputErrors } from '../../types/stateRegister';

export interface UpdateEvent {
  (field: string, newValue: FieldValue, trackField?: boolean): void;
}

export interface CreateFieldForPropertyParams {
  property: EditorEntry;
  data: Data;
  onUpdate: UpdateEvent;
  errors: InputErrors;
  lastEditedField: string | null;
}

export interface MakeEditorParams {
  properties: Array<EditorEntry>;
}

export interface EditorProps {
  data: Data;
  onUpdate: UpdateEvent;
  errors: Record<string, InputErrors>;
  lastEditedField: string | null;
}
