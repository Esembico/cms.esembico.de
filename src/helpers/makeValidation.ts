import { EditorEntry } from '../types/stateRegister';
import getLabelText from './getLabelText';
import makeValidationErrorHandler from './makeValidationErrorHandler';
import { Validation } from './types/makeValidation';

export default function makeValidation(editor: Array<EditorEntry>): Validation {
  return (data) => {
    const errors = {};
    const { required, requireNumber, requireUrl } = makeValidationErrorHandler(
      errors,
      data
    );
    editor.forEach((field) => {
      if (!field.if || field.if(data)) {
        const label = getLabelText(field.label, data);
        if (field.required) {
          required(label, field.name);
        }
        if (field.type === 'number') {
          requireNumber(label, field.name);
        }
        if (field.type === 'url') {
          requireUrl(label, field.name);
        }
      }
    });

    return errors;
  };
}
