import { createReducer, on } from '@ngrx/store';
import { NotificationPreference } from '../../models';
import * as NotificationsActions from './notifications.actions';

export interface NotificationsState {
  preferences: NotificationPreference[];
  loaded: boolean;
}

export const initialState: NotificationsState = {
  preferences: [],
  loaded: false,
};

export const notificationsReducer = createReducer(
  initialState,
  on(NotificationsActions.loadPreferencesSuccess, (state, { preferences }) => ({
    ...state,
    preferences,
    loaded: true,
  })),
  on(NotificationsActions.togglePreference, (state, { id }) => ({
    ...state,
    preferences: state.preferences.map((pref) =>
      pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
    ),
  }))
);
