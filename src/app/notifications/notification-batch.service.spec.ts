import { TestBed } from '@angular/core/testing';
import { NotificationBatchService } from './notification-batch.service';

/**
 * Characterization tests — locks baseline behavior before upgrade.
 * C3 specimen: timing-sensitive service.
 */
describe('NotificationBatchService (characterization)', () => {
  let service: NotificationBatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationBatchService);
  });

  it('should start uninitialized', () => {
    expect(service.isInitialized()).toBe(false);
  });

  it('should become initialized after registerDefaults', () => {
    service.registerDefaults();
    expect(service.isInitialized()).toBe(true);
  });

  it('should return 4 default preferences with correct structure', () => {
    const prefs = service.getDefaultPreferences();
    expect(prefs).toHaveLength(4);
    expect(prefs[0]).toEqual({
      id: 'email-statements',
      label: 'Monthly statement emails',
      enabled: true,
      category: 'email',
    });
    expect(prefs[1]).toEqual({
      id: 'sms-alerts',
      label: 'Critical account SMS alerts',
      enabled: true,
      category: 'sms',
    });
    expect(prefs[2]).toEqual({
      id: 'inapp-servicing',
      label: 'In-app servicing updates',
      enabled: false,
      category: 'inApp',
    });
    expect(prefs[3]).toEqual({
      id: 'email-marketing',
      label: 'Product marketing emails',
      enabled: false,
      category: 'email',
    });
  });

  it('should start counters at zero', () => {
    expect(service.getHandlerInvocationCount()).toBe(0);
    expect(service.getRenderCycleCount()).toBe(0);
  });

  it('should increment handler invocation count', () => {
    service.recordHandlerInvocation();
    service.recordHandlerInvocation();
    expect(service.getHandlerInvocationCount()).toBe(2);
  });

  it('should increment render cycle count and return new value', () => {
    const first = service.recordRenderCycle();
    const second = service.recordRenderCycle();
    expect(first).toBe(1);
    expect(second).toBe(2);
    expect(service.getRenderCycleCount()).toBe(2);
  });

  it('should reset both counters', () => {
    service.recordHandlerInvocation();
    service.recordRenderCycle();
    service.resetCounters();
    expect(service.getHandlerInvocationCount()).toBe(0);
    expect(service.getRenderCycleCount()).toBe(0);
  });

  it('processRapidToggle should record a handler invocation and return the enabled value', () => {
    expect(service.processRapidToggle(true)).toBe(true);
    expect(service.processRapidToggle(false)).toBe(false);
    expect(service.getHandlerInvocationCount()).toBe(2);
  });

  it('rapid toggle sequence (5 calls) should produce 5 handler invocations', () => {
    for (let i = 0; i < 5; i++) {
      service.processRapidToggle(i % 2 === 0);
    }
    expect(service.getHandlerInvocationCount()).toBe(5);
  });
});
