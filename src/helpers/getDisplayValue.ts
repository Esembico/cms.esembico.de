import { Data } from '../redux/helpers/types/state';
import { ResolveValueFromDataFunction } from '../types/stateRegister';

export default function getDisplayValue(
  data: Data,
  displayDefinition: string | ResolveValueFromDataFunction
): string | number | Data {
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
