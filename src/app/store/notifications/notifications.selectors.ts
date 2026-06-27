import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationsState } from './notifications.reducer';

export const selectNotificationsState = createFeatureSelector<NotificationsState>('notifications');

export const selectAllPreferences = createSelector(
  selectNotificationsState,
  (state) => state.preferences
);

export const selectEnabledPreferenceCount = createSelector(
  selectAllPreferences,
  (prefs) => prefs.filter((p) => p.enabled).length
);
