import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Order } from '../../models';
import * as OrdersActions from './orders.actions';

export interface OrdersState extends EntityState<Order> {
  loading: boolean;
  loaded: boolean;
  error: string | null;
  selectedOrderId: string | null;
}

export const ordersAdapter = createEntityAdapter<Order>({
  selectId: (order) => order.id,
  sortComparer: (a, b) => a.symbol.localeCompare(b.symbol),
});

export const initialState: OrdersState = ordersAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
  selectedOrderId: null,
});

export const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.loadOrders, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) =>
    ordersAdapter.setAll(orders, {
      ...state,
      loading: false,
      loaded: true,
      error: null,
    })
  ),
  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(OrdersActions.selectOrder, (state, { id }) => ({
    ...state,
    selectedOrderId: id,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } = ordersAdapter.getSelectors();
