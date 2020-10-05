import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type AuthAction = ActionType<typeof actions>;

export interface AuthState {
  readonly access_token: string | null;
  readonly token_type: string | null;
  readonly expires_in: number | null;
}

// #access_token=BQB07lzj2ghVJ-Hf5weuKnZGjc_jWOGKu8ZbSCqaSWZPHbv8jUp9QYJnQzqLbrysJePr9SZkc8sxOYOjfeakQ_l9whHSKtfXR3efX7616-MlOS4Key4dVPiPQJS0zEbIQwRIXPd0Qco&token_type=Bearer&expires_in=3600