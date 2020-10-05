import { AuthState, AuthAction } from './types';

const initialState: AuthState = {
  expires_in: null,
  token_type: null,
  access_token: null,
};

export default function auth(
  state = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return {
        ...state,
        access_token: action.payload.access_token,
        token_type: action.payload.token_type,
        expires_in: action.payload.expires_in,
      };
    case '@auth/SIGN_OUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
