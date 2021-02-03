import { ValidateAuthFunction } from '../redux/reducers/types/auth';
import { Theme } from '../redux/reducers/types/pageState';

export interface AppProps {
  validateAuth: ValidateAuthFunction;
  themeName: Theme;
}
