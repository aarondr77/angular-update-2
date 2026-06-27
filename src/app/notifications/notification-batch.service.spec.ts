import { TestBed } from '@angular/core/testing';
import { NotificationBatchService } from './notification-batch.service';

describe('NotificationBatchService (C3 characterization)', () => {
  let service: NotificationBatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationBatchService);
  });

  afterEach(() => {
    service.resetCounters();
  });

  it('should start uninitialized', () => {
    expect(service.isInitialized()).toBe(false);
  });

  it('should become initialized after registerDefaults', () => {
    service.registerDefaults();
    expect(service.isInitialized()).toBe(true);
  });

  it('should return four default preferences', () => {
    const prefs = service.getDefaultPreferences();
    expect(prefs).toHaveLength(4);
    expect(prefs.map((p) => p.id)).toEqual([
      'email-statements',
      'sms-alerts',
      'inapp-servicing',
      'email-marketing',
    ]);
  });

  it('should count handler invocations independently', () => {
    expect(service.getHandlerInvocationCount()).toBe(0);
    service.recordHandlerInvocation();
    service.recordHandlerInvocation();
    expect(service.getHandlerInvocationCount()).toBe(2);
  });

  it('should count render cycles and return the new count', () => {
    expect(service.getRenderCycleCount()).toBe(0);
    const c1 = service.recordRenderCycle();
    const c2 = service.recordRenderCycle();
    expect(c1).toBe(1);
    expect(c2).toBe(2);
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
    const result1 = service.processRapidToggle(true);
    const result2 = service.processRapidToggle(false);
    expect(result1).toBe(true);
    expect(result2).toBe(false);
    expect(service.getHandlerInvocationCount()).toBe(2);
  });

  it('rapid toggle burst of 5 should produce exactly 5 handler invocations', () => {
    for (let i = 0; i < 5; i++) {
      service.processRapidToggle(i % 2 === 0);
    }
    expect(service.getHandlerInvocationCount()).toBe(5);
  });
});
