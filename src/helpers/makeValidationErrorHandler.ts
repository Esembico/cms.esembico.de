import { Data } from '../redux/helpers/types/state';
import { InputErrors } from '../types/stateRegister';
import {
  RequiredHandler,
  ValidationErrorHandler
} from './types/makeValidationErrorHandler';

export default function makeValidationErrorHandler(
  errors: Record<string, InputErrors>,
  data: Data
): ValidationErrorHandler {
  const required: RequiredHandler = (name, property) => {
    if (!data[property]) {
      if (!errors[property]) {
        errors[property] = [];
      }
      errors[property].push(`${name} is required`);
    }
  };

  const requireNumber: RequiredHandler = (name, property) => {
    const value = data[property];
    if (value && isNaN(value as number)) {
      if (!errors[property]) {
        errors[property] = [];
      }
      errors[property].push(`${name} should be a number`);
    }
  };

  const requireUrl: RequiredHandler = (name, property) => {
    const value = data[property];
    try {
      // eslint-disable-next-line no-new
      new URL(value as string, 'http://esembico.de');
    } catch {
      if (!errors[property]) {
        errors[property] = [];
      }
      errors[property].push(`${name} should be a valid url`);
    }
  };

  return { required, requireNumber, requireUrl };
}
