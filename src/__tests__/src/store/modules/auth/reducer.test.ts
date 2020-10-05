import reducer from '../../../../../store/modules/auth/reducer';

describe('[REDUCER]: Auth', () => {
  it('It should add auth values when call action with type @auth/SIGN_IN_SUCCESS', () => {
    const previousState = {
      expires_in: null,
      token_type: null,
      access_token: null,
    };

    const payload = {
      access_token: 'TOKEN',
      token_type: 'BEARER',
      expires_in: 3600,
    };

    const state = reducer(previousState, {
      type: '@auth/SIGN_IN_SUCCESS',
      payload,
    });

    expect(state).toEqual(payload);
  });

  it('It should clean auth values when call action with type @auth/SIGN_OUT', () => {
    const initialState = {
      expires_in: null,
      token_type: null,
      access_token: null,
    };

    const previousState = {
      access_token: 'TOKEN',
      token_type: 'BEARER',
      expires_in: 3600,
    };

    const state = reducer(previousState, { type: '@auth/SIGN_OUT' });

    expect(state).toEqual(initialState);
  });
});
