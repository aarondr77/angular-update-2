import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RenderCountComponent } from './render-count.component';
import { NotificationBatchService } from '../notification-batch.service';

/**
 * Characterization baseline (C3 specimen — no unit tests at baseline).
 * Locks the render/handler counting behavior driven by DOM events so that event
 * timing changes across Angular hops are caught by a test. KB policy 8.
 */
describe('RenderCountComponent (characterization baseline)', () => {
  let fixture: ComponentFixture<RenderCountComponent>;
  let component: RenderCountComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenderCountComponent],
      providers: [NotificationBatchService],
    });
    fixture = TestBed.createComponent(RenderCountComponent);
    component = fixture.componentInstance;
  });

  it('records a single render cycle on init', () => {
    fixture.detectChanges();
    expect(component.renderCount).toBe(1);
    expect(component.handlerCount).toBe(0);
  });

  it('bumps handler count once and render count once per parent click', () => {
    fixture.detectChanges();
    component.onParentClick();
    expect(component.handlerCount).toBe(1);
    expect(component.renderCount).toBe(2);
  });

  it('records 6 handler invocations for a child click inside the bubble zone', () => {
    // onChildClick: 1 (bubble parent click) + 5 (rapid toggle loop) = 6 handler invocations
    fixture.detectChanges();
    const bubbleZone: HTMLElement = fixture.debugElement.query(
      By.css('[data-testid="bubble-zone"]')
    ).nativeElement;
    const event = { target: bubbleZone } as unknown as Event;
    component.onChildClick(event);
    expect(component.handlerCount).toBe(6);
    // one render on init + one from onParentClick + one at end of onChildClick = 3
    expect(component.renderCount).toBe(3);
  });

  it('records 5 handler invocations for a child click outside the bubble zone', () => {
    fixture.detectChanges();
    const event = { target: document.createElement('div') } as unknown as Event;
    component.onChildClick(event);
    expect(component.handlerCount).toBe(5);
    expect(component.renderCount).toBe(2);
  });

  it('renders the diagnostics panel with live counts in the template', () => {
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('[data-testid="render-count"]'));
    expect(el.nativeElement.textContent).toContain('Renders: 1');
  });
});
