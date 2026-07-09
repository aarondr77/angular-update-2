import { Store } from '@ngrx/store';
import { NotificationBatchService } from '../../notifications/notification-batch.service';
import * as NotificationsActions from '../../store/notifications/notifications.actions';
import { initializeNotifications } from './notification.initializer';

/**
 * Characterization baseline (A2 specimen — classic APP_INITIALIZER).
 * Later hops may migrate APP_INITIALIZER to provideAppInitializer; this pins the
 * initializer's runtime effect (register defaults + dispatch success) so the
 * behavior is provably preserved. KB policy 2 (behavior-preserving path on upgrade).
 */
describe('initializeNotifications (characterization baseline)', () => {
  it('registers defaults and dispatches loadPreferencesSuccess with default preferences', async () => {
    const batchService = new NotificationBatchService();
    const registerSpy = jest.spyOn(batchService, 'registerDefaults');
    const dispatch = jest.fn();
    const store = { dispatch } as unknown as Store;

    const init = initializeNotifications(batchService, store);
    await init();

    expect(registerSpy).toHaveBeenCalledTimes(1);
    expect(batchService.isInitialized()).toBe(true);
    expect(dispatch).toHaveBeenCalledWith(
      NotificationsActions.loadPreferencesSuccess({
        preferences: batchService.getDefaultPreferences(),
      })
    );
  });

  it('resolves the returned promise', async () => {
    const batchService = new NotificationBatchService();
    const store = { dispatch: jest.fn() } as unknown as Store;
    await expect(initializeNotifications(batchService, store)()).resolves.toBeUndefined();
  });
});
