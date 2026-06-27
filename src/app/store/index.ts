import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { ordersReducer, OrdersState } from './orders/orders.reducer';
import { notificationsReducer, NotificationsState } from './notifications/notifications.reducer';

export interface AppState {
  auth: AuthState;
  orders: OrdersState;
  notifications: NotificationsState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  orders: ordersReducer,
  notifications: notificationsReducer,
};
