import { Component, OnInit } from '@angular/core';
import { NotificationBatchService } from '../notification-batch.service';

/**
 * C3 specimen component — no unit tests at baseline.
 */
@Component({
  selector: 'app-render-count',
  template: `
    <section
      class="render-count-panel"
      data-testid="render-count-panel"
      aria-label="Event timing diagnostics"
    >
      <p id="render-count-label">Event timing diagnostics</p>
      <span data-testid="render-count">Renders: {{ renderCount }}</span>
      <span data-testid="handler-count">Handlers: {{ handlerCount }}</span>
      <div class="bubble-zone" (click)="onParentClick()" data-testid="bubble-zone">
        <span>Bubble target zone</span>
      </div>
      <button
        type="button"
        data-testid="rapid-toggle-btn"
        (click)="onChildClick($event)"
        aria-labelledby="render-count-label"
      >
        Simulate rapid events
      </button>
    </section>
  `,
  styles: [
    `
      .render-count-panel {
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-top: 16px;
      }
      span {
        margin-right: 16px;
      }
      .bubble-zone {
        padding: 8px;
        margin: 8px 0;
        background: #f0f0f0;
        cursor: pointer;
      }
    `,
  ],
})
export class RenderCountComponent implements OnInit {
  renderCount = 0;
  handlerCount = 0;

  constructor(private batchService: NotificationBatchService) {}

  ngOnInit(): void {
    this.refreshCounts();
  }

  onParentClick(): void {
    this.batchService.recordHandlerInvocation();
    this.refreshCounts();
  }

  onChildClick(event: Event): void {
    const bubbleZone = (event.target as HTMLElement).closest('.bubble-zone');
    if (bubbleZone) {
      this.onParentClick();
    }
    for (let i = 0; i < 5; i++) {
      this.batchService.processRapidToggle(i % 2 === 0);
    }
    this.refreshCounts();
  }

  private refreshCounts(): void {
    this.renderCount = this.batchService.recordRenderCycle();
    this.handlerCount = this.batchService.getHandlerInvocationCount();
  }
}
