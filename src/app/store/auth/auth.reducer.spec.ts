import { authReducer, initialState } from './auth.reducer';
import * as AuthActions from './auth.actions';

describe('authReducer', () => {
  it('should set loading on login', () => {
    const state = authReducer(initialState, AuthActions.login({ username: 'a', password: 'b' }));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should store user on login success', () => {
    const user = { username: 'analyst', token: 'tok', displayName: 'Jordan' };
    const state = authReducer(initialState, AuthActions.loginSuccess({ user }));
    expect(state.user).toEqual(user);
    expect(state.loading).toBe(false);
  });

  it('should clear state on logout', () => {
    const loggedIn = authReducer(
      initialState,
      AuthActions.loginSuccess({
        user: { username: 'a', token: 't', displayName: 'A' },
      })
    );
    const state = authReducer(loggedIn, AuthActions.logout());
    expect(state).toEqual(initialState);
  });
});
