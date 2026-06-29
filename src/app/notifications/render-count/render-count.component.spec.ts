import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RenderCountComponent } from './render-count.component';
import { NotificationBatchService } from '../notification-batch.service';

/**
 * Characterization tests — locks baseline behavior of the C3 timing component.
 */
describe('RenderCountComponent (characterization)', () => {
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

  it('should initialize with render count 1 (from ngOnInit refreshCounts)', () => {
    expect(component.renderCount).toBe(1);
  });

  it('should initialize with handler count 0', () => {
    expect(component.handlerCount).toBe(0);
  });

  it('onParentClick should increment handler count and render count', () => {
    component.onParentClick();
    expect(component.handlerCount).toBe(1);
    expect(component.renderCount).toBe(2);
  });

  it('onChildClick outside bubble-zone should invoke 5 rapid toggles + refreshCounts', () => {
    const mockEvent = { target: document.createElement('button') } as unknown as Event;
    component.onChildClick(mockEvent);
    // 5 rapid toggles = 5 handler invocations
    expect(component.handlerCount).toBe(5);
    // ngOnInit refresh (1) + onChildClick refresh (1) = render count 2
    expect(component.renderCount).toBe(2);
  });

  it('onChildClick inside bubble-zone should invoke parent click + 5 rapid toggles', () => {
    const bubbleZone = document.createElement('div');
    bubbleZone.classList.add('bubble-zone');
    const target = document.createElement('button');
    bubbleZone.appendChild(target);
    const mockEvent = { target } as unknown as Event;

    component.onChildClick(mockEvent);
    // 1 parent handler invocation + 5 rapid toggles = 6 handler invocations
    expect(component.handlerCount).toBe(6);
    // ngOnInit refresh (1) + onParentClick refresh (1) + onChildClick refresh (1) = 3
    expect(component.renderCount).toBe(3);
  });

  it('DOM should display render and handler counts', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('[data-testid="render-count"]')?.textContent).toContain('Renders: 1');
    expect(el.querySelector('[data-testid="handler-count"]')?.textContent).toContain('Handlers: 0');
  });
});
