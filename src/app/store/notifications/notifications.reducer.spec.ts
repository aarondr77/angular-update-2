import { notificationsReducer, initialState } from './notifications.reducer';
import * as NotificationsActions from './notifications.actions';

describe('notificationsReducer', () => {
  it('loads preferences', () => {
    const prefs = [{ id: 'a', label: 'A', enabled: true, category: 'email' as const }];
    const state = notificationsReducer(
      initialState,
      NotificationsActions.loadPreferencesSuccess({ preferences: prefs })
    );
    expect(state.preferences).toEqual(prefs);
    expect(state.loaded).toBe(true);
  });

  it('toggles preference', () => {
    const prefs = [{ id: 'a', label: 'A', enabled: true, category: 'email' as const }];
    const loaded = notificationsReducer(
      initialState,
      NotificationsActions.loadPreferencesSuccess({ preferences: prefs })
    );
    const state = notificationsReducer(loaded, NotificationsActions.togglePreference({ id: 'a' }));
    expect(state.preferences[0].enabled).toBe(false);
  });
});
