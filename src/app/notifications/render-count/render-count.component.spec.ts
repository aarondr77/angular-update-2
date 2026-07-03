import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RenderCountComponent } from './render-count.component';
import { NotificationBatchService } from '../notification-batch.service';

describe('RenderCountComponent — characterization baseline', () => {
  let component: RenderCountComponent;
  let fixture: ComponentFixture<RenderCountComponent>;
  let service: NotificationBatchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenderCountComponent],
      providers: [NotificationBatchService],
    }).compileComponents();

    service = TestBed.inject(NotificationBatchService);
    fixture = TestBed.createComponent(RenderCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('records one render cycle on init', () => {
    expect(component.renderCount).toBe(1);
    expect(component.handlerCount).toBe(0);
  });

  it('renders count values in the template', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('[data-testid="render-count"]')?.textContent).toContain('Renders: 1');
    expect(el.querySelector('[data-testid="handler-count"]')?.textContent).toContain('Handlers: 0');
  });

  describe('onParentClick (bubble zone)', () => {
    it('increments handler count and records a new render cycle', () => {
      component.onParentClick();
      fixture.detectChanges();

      expect(component.handlerCount).toBe(1);
      expect(component.renderCount).toBe(2);
    });

    it('accumulates across multiple parent clicks', () => {
      component.onParentClick();
      component.onParentClick();
      component.onParentClick();
      fixture.detectChanges();

      expect(component.handlerCount).toBe(3);
      expect(component.renderCount).toBe(4);
    });
  });

  describe('onChildClick', () => {
    it('triggers 5 rapid toggles plus refreshCounts render cycle', () => {
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', {
        value: document.createElement('button'),
      });

      component.onChildClick(event);
      fixture.detectChanges();

      expect(service.getHandlerInvocationCount()).toBe(5);
      expect(component.handlerCount).toBe(5);
      expect(component.renderCount).toBe(2);
    });

    it('also invokes parent handler when target is inside bubble-zone', () => {
      const bubbleZone = fixture.nativeElement.querySelector('[data-testid="bubble-zone"]');
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: bubbleZone });

      component.onChildClick(event);
      fixture.detectChanges();

      // onParentClick records 1 handler + refreshCounts (render 2), then 5 rapid toggles, then refreshCounts (render 3)
      expect(service.getHandlerInvocationCount()).toBe(6);
      expect(component.handlerCount).toBe(6);
      expect(component.renderCount).toBe(3);
    });
  });

  it('renders the bubble zone and rapid toggle button', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('[data-testid="bubble-zone"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="rapid-toggle-btn"]')).toBeTruthy();
  });

  it('has correct aria attributes', () => {
    const el: HTMLElement = fixture.nativeElement;
    const section = el.querySelector('[data-testid="render-count-panel"]');
    expect(section?.getAttribute('aria-label')).toBe('Event timing diagnostics');
  });
});
