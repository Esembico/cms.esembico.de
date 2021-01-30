import { Data } from '../redux/helpers/types/state';
import { ResolveValueFromDataFunction } from '../types/stateRegister';

export default function getLabelText(
  label: string | ResolveValueFromDataFunction,
  data: Data
): string {
  if (typeof label === 'function') {
    return label(data);
  }

  return label;
}
