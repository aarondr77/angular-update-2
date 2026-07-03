import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { OrderDetailComponent } from './order-detail.component';
import { SharedModule } from '../shared/shared.module';
import { LegacyTrendModule } from '@bofa/legacy-trend-widget';

const mockOrder = {
  id: 'ORD-1001',
  symbol: 'AAPL',
  side: 'Buy' as const,
  quantity: 5000,
  status: 'Open' as const,
  desk: 'Institutional' as const,
  trader: 'J. Smith',
  notional: 750000,
  lastUpdated: '2024-01-15T10:30:00Z',
  executionHistory: [100000, 200000, 450000, 750000],
};

describe('OrderDetailComponent — characterization baseline (snapshot)', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailComponent],
      imports: [SharedModule, LegacyTrendModule, RouterTestingModule, NoopAnimationsModule],
      providers: [
        provideMockStore({
          initialState: {
            orders: {
              ids: ['ORD-1001'],
              entities: { 'ORD-1001': mockOrder },
              loading: false,
              loaded: true,
              error: null,
              selectedOrderId: 'ORD-1001',
            },
          },
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'ORD-1001' } },
            paramMap: of({ get: () => 'ORD-1001' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders the order detail page', () => {
    const el: HTMLElement = fixture.nativeElement;
    const page = el.querySelector('[data-testid="order-detail-page"]');
    expect(page).toBeTruthy();
  });

  it('displays order symbol and side in header card', () => {
    const el: HTMLElement = fixture.nativeElement;
    const title = el.querySelector('mat-card-title');
    expect(title?.textContent).toContain('AAPL');
    expect(title?.textContent).toContain('Buy');
  });

  it('displays order ID and desk in subtitle', () => {
    const el: HTMLElement = fixture.nativeElement;
    const subtitle = el.querySelector('mat-card-subtitle');
    expect(subtitle?.textContent).toContain('ORD-1001');
    expect(subtitle?.textContent).toContain('Institutional');
  });

  it('renders the status badge with correct class', () => {
    const el: HTMLElement = fixture.nativeElement;
    const badge = el.querySelector('[data-testid="order-status-badge"]');
    expect(badge).toBeTruthy();
    expect(badge?.textContent?.trim()).toBe('Open');
    expect(badge?.classList.contains('open')).toBe(true);
  });

  it('renders flex-layout attributes on detail body', () => {
    const el: HTMLElement = fixture.nativeElement;
    const detailBody = el.querySelector('.detail-body');
    expect(detailBody).toBeTruthy();
    expect(detailBody?.getAttribute('fxLayout')).toBe('row');
  });

  it('renders order overview fields', () => {
    const el: HTMLElement = fixture.nativeElement;
    const labels = Array.from(el.querySelectorAll('.label')).map((l) => l.textContent?.trim());
    expect(labels).toContain('Notional');
    expect(labels).toContain('Quantity');
    expect(labels).toContain('Trader');
    expect(labels).toContain('Last Updated');
  });

  it('renders execution history list items', () => {
    const el: HTMLElement = fixture.nativeElement;
    const items = el.querySelectorAll('.timeline li');
    expect(items.length).toBe(4);
    expect(items[0].textContent).toContain('Slice 1');
  });

  it('renders the legacy trend widget', () => {
    const el: HTMLElement = fixture.nativeElement;
    const trend = el.querySelector('[data-testid="legacy-trend"]');
    expect(trend).toBeTruthy();
  });

  it('renders back button', () => {
    const el: HTMLElement = fixture.nativeElement;
    const backBtn = el.querySelector('[data-testid="back-btn"]');
    expect(backBtn).toBeTruthy();
    expect(backBtn?.textContent).toContain('Back to Blotter');
  });

  it('matches DOM snapshot of the order detail page', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('[data-testid="order-detail-page"]')?.innerHTML).toMatchSnapshot();
  });
});
