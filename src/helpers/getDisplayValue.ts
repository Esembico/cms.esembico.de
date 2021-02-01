import { Data, FieldValue } from '../redux/helpers/types/state';
import { ResolveValueFromDataFunction } from '../types/stateRegister';

export default function getDisplayValue(
  data: Data,
  displayDefinition: string | ResolveValueFromDataFunction
): FieldValue {
  if (!data) {
    return '';
  }
  if (typeof data !== 'object') {
    return data;
  }
  if (typeof displayDefinition === 'string') {
    return data[displayDefinition];
  }

  if (typeof displayDefinition === 'function') {
    return displayDefinition(data);
  }

  return '';
}
