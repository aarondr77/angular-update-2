import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { OrderDetailComponent } from './order-detail.component';
import { Order } from '../models';
import * as OrdersActions from '../store/orders/orders.actions';
import {
  selectAllOrders,
  selectOrdersLoaded,
  selectOrdersLoading,
} from '../store/orders/orders.selectors';

/**
 * Characterization baseline (C1 specimen — flex-layout / Material order-detail).
 * Locks the component's routing and store-dispatch logic so the flex-layout → CSS
 * and Material MDC migrations remain behavior-preserving. DOM/pixel behavior is
 * additionally locked by the Cypress visual-regression baseline. KB policies 5, 6.
 */
const ORDERS: Order[] = [
  {
    id: 'ORD-1001',
    symbol: 'AAPL',
    side: 'Buy',
    quantity: 15000,
    status: 'Open',
    desk: 'Institutional',
    trader: 'Sarah Chen',
    notional: 2450000,
    lastUpdated: '2024-03-15',
    executionHistory: [1, 2, 3],
  },
];

describe('OrderDetailComponent (characterization baseline)', () => {
  let component: OrderDetailComponent;
  let store: MockStore;
  let navigate: jest.Mock;

  beforeEach(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [OrderDetailComponent],
      providers: [
        provideMockStore(),
        { provide: Router, useValue: { navigate } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: new Map([['id', 'ORD-1001']]) },
            paramMap: of(new Map([['id', 'ORD-1001']])),
          },
        },
      ],
    });
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllOrders, ORDERS);
    store.overrideSelector(selectOrdersLoading, false);
    store.overrideSelector(selectOrdersLoaded, false);
    component = TestBed.createComponent(OrderDetailComponent).componentInstance;
  });

  it('resolves the order matching the route id', (done) => {
    component.order$.subscribe((order) => {
      expect(order?.id).toBe('ORD-1001');
      done();
    });
  });

  it('dispatches loadOrders when orders are not yet loaded and selectOrder for the route id', () => {
    const dispatch = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatch).toHaveBeenCalledWith(OrdersActions.loadOrders());
    expect(dispatch).toHaveBeenCalledWith(OrdersActions.selectOrder({ id: 'ORD-1001' }));
  });

  it('does not dispatch loadOrders when orders are already loaded', () => {
    store.overrideSelector(selectOrdersLoaded, true);
    const dispatch = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatch).not.toHaveBeenCalledWith(OrdersActions.loadOrders());
  });

  it('goBack navigates to the dashboard', () => {
    component.goBack();
    expect(navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('statusClass lowercases the order status', () => {
    expect(component.statusClass('Open')).toBe('open');
    expect(component.statusClass('Review')).toBe('review');
    expect(component.statusClass('Filled')).toBe('filled');
  });
});
