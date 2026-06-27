import { ordersReducer, initialState, ordersAdapter } from './orders.reducer';
import * as OrdersActions from './orders.actions';
import { Order } from '../../models';

const mockOrders: Order[] = [
  {
    id: 'ORD-1',
    symbol: 'AAPL',
    side: 'Buy',
    quantity: 1000,
    status: 'Open',
    desk: 'Standard',
    trader: 'A',
    notional: 100,
    lastUpdated: '2024-01-01',
    executionHistory: [90, 95, 100],
  },
  {
    id: 'ORD-2',
    symbol: 'MSFT',
    side: 'Sell',
    quantity: 500,
    status: 'Review',
    desk: 'Institutional',
    trader: 'B',
    notional: 200,
    lastUpdated: '2024-01-02',
    executionHistory: [180, 190, 200],
  },
];

describe('ordersReducer', () => {
  it('should set loading on loadOrders', () => {
    const state = ordersReducer(initialState, OrdersActions.loadOrders());
    expect(state.loading).toBe(true);
  });

  it('should populate entities on success', () => {
    const state = ordersReducer(
      initialState,
      OrdersActions.loadOrdersSuccess({ orders: mockOrders })
    );
    expect(ordersAdapter.getSelectors().selectAll(state)).toHaveLength(2);
    expect(state.loaded).toBe(true);
    expect(state.loading).toBe(false);
  });

  it('should store selected order id', () => {
    const state = ordersReducer(initialState, OrdersActions.selectOrder({ id: 'ORD-1' }));
    expect(state.selectedOrderId).toBe('ORD-1');
  });
});
