import { required } from './validation';
import getLabelText from './getLabelText';

export default function makeValidation(editor) {
  return (data) => {
    const errors = {};
    editor.forEach((field) => {
      if (!field.if || field.if(data)) {
        if (field.required) {
          required(errors, getLabelText(field.label, data), data, field.name);
        }
      }
    });

    return errors;
  };
}
