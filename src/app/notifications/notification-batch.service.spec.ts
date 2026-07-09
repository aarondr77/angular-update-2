import { TestBed } from '@angular/core/testing';
import { NotificationBatchService } from './notification-batch.service';

/**
 * Characterization baseline (C3 timing specimen — deliberately under-tested at baseline).
 * Locks current handler/render counting and default-preference behavior so that any
 * drift introduced by an Angular hop (e.g. zone event-coalescing) is caught by a test,
 * not found in production. KB policy 8: pin silent behavior before the hop.
 */
describe('NotificationBatchService (characterization baseline)', () => {
  let service: NotificationBatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationBatchService);
  });

  it('starts uninitialized until registerDefaults is called', () => {
    expect(service.isInitialized()).toBe(false);
    service.registerDefaults();
    expect(service.isInitialized()).toBe(true);
  });

  it('returns the four default preferences in fixed order with fixed enabled state', () => {
    const prefs = service.getDefaultPreferences();
    expect(prefs.map((p) => p.id)).toEqual([
      'email-statements',
      'sms-alerts',
      'inapp-servicing',
      'email-marketing',
    ]);
    expect(prefs.map((p) => p.enabled)).toEqual([true, true, false, false]);
    expect(prefs.map((p) => p.category)).toEqual(['email', 'sms', 'inApp', 'email']);
  });

  it('increments handler invocations by exactly one per record', () => {
    expect(service.getHandlerInvocationCount()).toBe(0);
    service.recordHandlerInvocation();
    service.recordHandlerInvocation();
    expect(service.getHandlerInvocationCount()).toBe(2);
  });

  it('returns a monotonically increasing render-cycle count', () => {
    expect(service.recordRenderCycle()).toBe(1);
    expect(service.recordRenderCycle()).toBe(2);
    expect(service.getRenderCycleCount()).toBe(2);
  });

  it('processRapidToggle records a handler invocation and echoes the enabled flag', () => {
    expect(service.processRapidToggle(true)).toBe(true);
    expect(service.processRapidToggle(false)).toBe(false);
    expect(service.getHandlerInvocationCount()).toBe(2);
  });

  it('resetCounters clears handler and render counters but not registration', () => {
    service.registerDefaults();
    service.recordHandlerInvocation();
    service.recordRenderCycle();
    service.resetCounters();
    expect(service.getHandlerInvocationCount()).toBe(0);
    expect(service.getRenderCycleCount()).toBe(0);
    expect(service.isInitialized()).toBe(true);
  });
});
