import { NotificationBatchService } from './notification-batch.service';

describe('NotificationBatchService — characterization baseline', () => {
  let service: NotificationBatchService;

  beforeEach(() => {
    service = new NotificationBatchService();
  });

  describe('initialization', () => {
    it('starts uninitialized', () => {
      expect(service.isInitialized()).toBe(false);
    });

    it('marks initialized after registerDefaults()', () => {
      service.registerDefaults();
      expect(service.isInitialized()).toBe(true);
    });
  });

  describe('getDefaultPreferences', () => {
    it('returns exactly 4 preferences', () => {
      const prefs = service.getDefaultPreferences();
      expect(prefs).toHaveLength(4);
    });

    it('returns preferences with correct ids', () => {
      const prefs = service.getDefaultPreferences();
      expect(prefs.map((p) => p.id)).toEqual([
        'email-statements',
        'sms-alerts',
        'inapp-servicing',
        'email-marketing',
      ]);
    });

    it('has email-statements and sms-alerts enabled by default', () => {
      const prefs = service.getDefaultPreferences();
      expect(prefs[0].enabled).toBe(true);
      expect(prefs[1].enabled).toBe(true);
      expect(prefs[2].enabled).toBe(false);
      expect(prefs[3].enabled).toBe(false);
    });

    it('assigns correct categories', () => {
      const prefs = service.getDefaultPreferences();
      expect(prefs.map((p) => p.category)).toEqual(['email', 'sms', 'inApp', 'email']);
    });
  });

  describe('counter behavior', () => {
    it('starts with zero handler invocations', () => {
      expect(service.getHandlerInvocationCount()).toBe(0);
    });

    it('starts with zero render cycles', () => {
      expect(service.getRenderCycleCount()).toBe(0);
    });

    it('increments handler count on recordHandlerInvocation()', () => {
      service.recordHandlerInvocation();
      service.recordHandlerInvocation();
      expect(service.getHandlerInvocationCount()).toBe(2);
    });

    it('increments and returns render cycle count', () => {
      const first = service.recordRenderCycle();
      const second = service.recordRenderCycle();
      expect(first).toBe(1);
      expect(second).toBe(2);
      expect(service.getRenderCycleCount()).toBe(2);
    });

    it('resets both counters to zero', () => {
      service.recordHandlerInvocation();
      service.recordRenderCycle();
      service.resetCounters();
      expect(service.getHandlerInvocationCount()).toBe(0);
      expect(service.getRenderCycleCount()).toBe(0);
    });
  });

  describe('processRapidToggle', () => {
    it('records a handler invocation on each call', () => {
      service.processRapidToggle(true);
      service.processRapidToggle(false);
      service.processRapidToggle(true);
      expect(service.getHandlerInvocationCount()).toBe(3);
    });

    it('returns the enabled value passed in', () => {
      expect(service.processRapidToggle(true)).toBe(true);
      expect(service.processRapidToggle(false)).toBe(false);
    });

    it('simulates 5 rapid toggles matching RenderCountComponent behavior', () => {
      for (let i = 0; i < 5; i++) {
        service.processRapidToggle(i % 2 === 0);
      }
      expect(service.getHandlerInvocationCount()).toBe(5);
    });
  });
});
