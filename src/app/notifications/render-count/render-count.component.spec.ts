import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationBatchService } from '../notification-batch.service';
import { RenderCountComponent } from './render-count.component';

describe('RenderCountComponent (C3 characterization)', () => {
  let component: RenderCountComponent;
  let fixture: ComponentFixture<RenderCountComponent>;
  let service: NotificationBatchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenderCountComponent],
      providers: [NotificationBatchService],
    }).compileComponents();

    service = TestBed.inject(NotificationBatchService);
    service.resetCounters();

    fixture = TestBed.createComponent(RenderCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with render count 1 and handler count 0', () => {
    expect(component.renderCount).toBe(1);
    expect(component.handlerCount).toBe(0);
  });

  it('should display counts in the template', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('[data-testid="render-count"]')?.textContent).toContain('Renders: 1');
    expect(el.querySelector('[data-testid="handler-count"]')?.textContent).toContain('Handlers: 0');
  });

  it('onParentClick should increment both handler and render counts', () => {
    component.onParentClick();
    fixture.detectChanges();
    expect(component.handlerCount).toBe(1);
    expect(component.renderCount).toBe(2);
  });

  it('onChildClick without bubble-zone ancestor should still invoke 5 rapid toggles', () => {
    const btn = fixture.nativeElement.querySelector('[data-testid="rapid-toggle-btn"]');
    btn.click();
    fixture.detectChanges();
    expect(service.getHandlerInvocationCount()).toBe(5);
  });

  it('onChildClick within bubble-zone should also trigger parent handler', () => {
    const bubbleZone = fixture.nativeElement.querySelector('[data-testid="bubble-zone"]');
    bubbleZone.click();
    fixture.detectChanges();
    expect(service.getHandlerInvocationCount()).toBe(1);
  });

  it('should have proper aria-label on the panel', () => {
    const panel = fixture.nativeElement.querySelector('[data-testid="render-count-panel"]');
    expect(panel.getAttribute('aria-label')).toBe('Event timing diagnostics');
  });
});
