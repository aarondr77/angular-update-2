import { createAction, props } from '@ngrx/store';
import { Order } from '../../models';

export const loadOrders = createAction('[Orders] Load Orders');
export const loadOrdersSuccess = createAction(
  '[Orders] Load Orders Success',
  props<{ orders: Order[] }>()
);
export const loadOrdersFailure = createAction(
  '[Orders] Load Orders Failure',
  props<{ error: string }>()
);
export const selectOrder = createAction('[Orders] Select Order', props<{ id: string }>());
