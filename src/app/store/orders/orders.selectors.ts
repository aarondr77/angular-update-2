import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState, selectAll, selectEntities } from './orders.reducer';

export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

export const selectAllOrders = createSelector(selectOrdersState, selectAll);
export const selectOrderEntities = createSelector(selectOrdersState, selectEntities);
export const selectOrdersLoading = createSelector(selectOrdersState, (state) => state.loading);
export const selectOrdersLoaded = createSelector(selectOrdersState, (state) => state.loaded);
export const selectOrdersError = createSelector(selectOrdersState, (state) => state.error);
export const selectOrderCount = createSelector(selectAllOrders, (orders) => orders.length);
export const selectSelectedOrderId = createSelector(
  selectOrdersState,
  (state) => state.selectedOrderId
);
export const selectSelectedOrder = createSelector(
  selectOrderEntities,
  selectSelectedOrderId,
  (entities, id) => (id ? entities[id] ?? null : null)
);
