import { selectAllOrders, selectOrderCount, selectOrdersLoading } from './orders.selectors';
import { initialState, ordersAdapter } from './orders.reducer';
import { Order } from '../../models';

describe('ordersSelectors', () => {
  const orders: Order[] = [
    {
      id: 'ORD-1',
      symbol: 'AAPL',
      side: 'Buy',
      quantity: 100,
      status: 'Open',
      desk: 'Standard',
      trader: 'X',
      notional: 1,
      lastUpdated: '2024-01-01',
      executionHistory: [1],
    },
  ];

  const state = {
    orders: ordersAdapter.setAll(orders, {
      ...initialState,
      loaded: true,
    }),
  };

  it('selectAllOrders returns all orders', () => {
    expect(selectAllOrders(state)).toEqual(orders);
  });

  it('selectOrderCount returns count', () => {
    expect(selectOrderCount(state)).toBe(1);
  });

  it('selectOrdersLoading returns loading flag', () => {
    expect(selectOrdersLoading(state)).toBe(false);
  });
});
