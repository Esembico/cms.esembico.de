import { AuthFunction } from '../../redux/reducers/types/auth';

export interface LoginProps {
  auth: AuthFunction;
  token: string | null;
}
