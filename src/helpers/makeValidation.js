import getLabelText from './getLabelText';
import makeValidationErrorHandler from './makeValidationErrorHandler';

export default function makeValidation(editor) {
  return (data) => {
    const errors = {};
    const { required, requireNumber } = makeValidationErrorHandler(
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
      }
    });

    return errors;
  };
}
