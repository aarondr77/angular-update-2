import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';

const mockOrders = [
  {
    id: 'ORD-1001',
    symbol: 'AAPL',
    side: 'Buy' as const,
    quantity: 5000,
    status: 'Open' as const,
    desk: 'Institutional' as const,
    trader: 'J. Smith',
    notional: 750000,
    lastUpdated: '2024-01-15T10:30:00Z',
    executionHistory: [100000, 200000, 450000],
  },
  {
    id: 'ORD-1002',
    symbol: 'MSFT',
    side: 'Sell' as const,
    quantity: 2000,
    status: 'Review' as const,
    desk: 'Standard' as const,
    trader: 'A. Chen',
    notional: 620000,
    lastUpdated: '2024-01-15T11:00:00Z',
    executionHistory: [310000, 620000],
  },
];

describe('DashboardComponent — characterization baseline (snapshot)', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [SharedModule, RouterTestingModule, NoopAnimationsModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: 'selectAllOrders', value: mockOrders },
            { selector: 'selectOrdersLoading', value: false },
            { selector: 'selectOrdersError', value: null },
            { selector: 'selectOrderCount', value: 2 },
            { selector: 'selectAuthUser', value: { displayName: 'Test Analyst' } },
          ],
          initialState: {
            orders: {
              ids: ['ORD-1001', 'ORD-1002'],
              entities: {
                'ORD-1001': mockOrders[0],
                'ORD-1002': mockOrders[1],
              },
              loading: false,
              loaded: true,
              error: null,
              selectedOrderId: null,
            },
            auth: {
              user: { username: 'analyst', token: 'fake', displayName: 'Test Analyst' },
              loading: false,
              error: null,
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders the Material table with correct column headers', () => {
    const el: HTMLElement = fixture.nativeElement;
    const headers = Array.from(el.querySelectorAll('th')).map((th) => th.textContent?.trim());
    expect(headers).toEqual(['Order ID', 'Symbol', 'Side', 'Status', 'Desk', 'Notional', 'Trader']);
  });

  it('renders order rows with correct data-testid attributes', () => {
    const el: HTMLElement = fixture.nativeElement;
    const rows = el.querySelectorAll('[data-testid^="order-row-"]');
    expect(rows.length).toBe(2);
    expect(rows[0].getAttribute('data-testid')).toBe('order-row-ORD-1001');
    expect(rows[1].getAttribute('data-testid')).toBe('order-row-ORD-1002');
  });

  it('renders toolbar with Trade Blotter title', () => {
    const el: HTMLElement = fixture.nativeElement;
    const toolbar = el.querySelector('mat-toolbar');
    expect(toolbar?.textContent).toContain('Trade Blotter');
  });

  it('renders user display name', () => {
    const el: HTMLElement = fixture.nativeElement;
    const userLabel = el.querySelector('.user-label');
    expect(userLabel?.textContent?.trim()).toBe('Test Analyst');
  });

  it('renders mat-chip-list for status column', () => {
    const el: HTMLElement = fixture.nativeElement;
    const chipLists = el.querySelectorAll('mat-chip-list');
    expect(chipLists.length).toBeGreaterThan(0);
  });

  it('matches DOM snapshot', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('[data-testid="dashboard-page"]')?.innerHTML).toMatchSnapshot();
  });
});
