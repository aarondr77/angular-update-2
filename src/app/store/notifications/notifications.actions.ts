import { createAction, props } from '@ngrx/store';
import { NotificationPreference } from '../../models';

export const loadPreferences = createAction('[Notifications] Load Preferences');
export const loadPreferencesSuccess = createAction(
  '[Notifications] Load Preferences Success',
  props<{ preferences: NotificationPreference[] }>()
);
export const togglePreference = createAction(
  '[Notifications] Toggle Preference',
  props<{ id: string }>()
);
