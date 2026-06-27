import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotificationBatchService } from '../../notifications/notification-batch.service';
import * as NotificationsActions from '../../store/notifications/notifications.actions';

export function initializeNotifications(
  batchService: NotificationBatchService,
  store: Store
): () => Promise<void> {
  return () => {
    batchService.registerDefaults();
    store.dispatch(
      NotificationsActions.loadPreferencesSuccess({
        preferences: batchService.getDefaultPreferences(),
      })
    );
    return Promise.resolve();
  };
}

export const notificationInitializerProvider: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: initializeNotifications,
  deps: [NotificationBatchService, Store],
  multi: true,
};
