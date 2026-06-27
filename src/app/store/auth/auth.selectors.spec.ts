import {
  selectAuthError,
  selectAuthLoading,
  selectAuthUser,
  selectIsAuthenticated,
} from './auth.selectors';
import { initialState } from './auth.reducer';

describe('authSelectors', () => {
  const user = { username: 'a', token: 't', displayName: 'A' };

  it('selects auth user', () => {
    expect(selectAuthUser({ auth: { ...initialState, user } })).toEqual(user);
  });

  it('selects loading state', () => {
    expect(selectAuthLoading({ auth: { ...initialState, loading: true } })).toBe(true);
  });

  it('selects error state', () => {
    expect(selectAuthError({ auth: { ...initialState, error: 'fail' } })).toBe('fail');
  });

  it('selects authenticated flag', () => {
    expect(selectIsAuthenticated({ auth: { ...initialState, user } })).toBe(true);
    expect(selectIsAuthenticated({ auth: initialState })).toBe(false);
  });
});
