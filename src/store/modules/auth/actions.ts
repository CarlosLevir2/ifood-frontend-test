import { action } from 'typesafe-actions';

export function signInRequest() {
  return action('@auth/SIGN_IN_REQUEST');
}

export function signInCallback() {
  return action('@auth/SIGN_IN_CALLBACK');
}

export function signInSuccess({
  access_token,
  token_type,
  expires_in,
}: {
  access_token: string;
  token_type: string;
  expires_in: number;
}) {
  return action('@auth/SIGN_IN_SUCCESS', {
    access_token,
    token_type,
    expires_in,
  });
}

export function signOut() {
  return action('@auth/SIGN_OUT');
}
