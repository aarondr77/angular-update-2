import { Injectable } from '@angular/core';
import { NotificationPreference } from '../models';

/**
 * C3 timing-sensitive specimen — deliberately under-tested at baseline.
 * Tracks handler invocations vs render cycles for event-bubbling scenarios.
 */
@Injectable({ providedIn: 'root' })
export class NotificationBatchService {
  private handlerInvocationCount = 0;
  private renderCycleCount = 0;
  private defaultsRegistered = false;

  registerDefaults(): void {
    this.defaultsRegistered = true;
  }

  isInitialized(): boolean {
    return this.defaultsRegistered;
  }

  getDefaultPreferences(): NotificationPreference[] {
    return [
      {
        id: 'email-statements',
        label: 'Monthly statement emails',
        enabled: true,
        category: 'email',
      },
      {
        id: 'sms-alerts',
        label: 'Critical account SMS alerts',
        enabled: true,
        category: 'sms',
      },
      {
        id: 'inapp-servicing',
        label: 'In-app servicing updates',
        enabled: false,
        category: 'inApp',
      },
      {
        id: 'email-marketing',
        label: 'Product marketing emails',
        enabled: false,
        category: 'email',
      },
    ];
  }

  recordHandlerInvocation(): void {
    this.handlerInvocationCount += 1;
  }

  recordRenderCycle(): number {
    this.renderCycleCount += 1;
    return this.renderCycleCount;
  }

  getHandlerInvocationCount(): number {
    return this.handlerInvocationCount;
  }

  getRenderCycleCount(): number {
    return this.renderCycleCount;
  }

  resetCounters(): void {
    this.handlerInvocationCount = 0;
    this.renderCycleCount = 0;
  }

  processRapidToggle(enabled: boolean): boolean {
    this.recordHandlerInvocation();
    return enabled;
  }
}
