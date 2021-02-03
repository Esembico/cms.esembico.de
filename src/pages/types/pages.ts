import { AuthFunction } from '../../redux/reducers/types/auth';
import { Theme } from '../../redux/reducers/types/pageState';

export interface LoginProps {
  auth: AuthFunction;
  token: string | null;
}

export interface SettingsProps {
  themeName: Theme;
  setTheme: (theme: Theme) => void;
}
