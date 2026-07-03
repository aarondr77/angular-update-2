import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from '../models';
import * as OrdersActions from '../store/orders/orders.actions';
import {
  selectAllOrders,
  selectOrderCount,
  selectOrdersError,
  selectOrdersLoading,
} from '../store/orders/orders.selectors';
import { selectAuthUser } from '../store/auth/auth.selectors';
import * as AuthActions from '../store/auth/auth.actions';

@Component({
  standalone: false,
  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  orders$: Observable<Order[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  count$: Observable<number>;
  user$ = this.store.select(selectAuthUser) as Observable<{ displayName: string } | null>;

  displayedColumns = ['id', 'symbol', 'side', 'status', 'desk', 'notional', 'trader'];

  constructor(private store: Store, private router: Router) {
    this.orders$ = this.store.select(selectAllOrders);
    this.loading$ = this.store.select(selectOrdersLoading);
    this.error$ = this.store.select(selectOrdersError);
    this.count$ = this.store.select(selectOrderCount);
  }

  ngOnInit(): void {
    this.store.dispatch(OrdersActions.loadOrders());
  }

  onRowClick(order: Order): void {
    this.store.dispatch(OrdersActions.selectOrder({ id: order.id }));
    this.router.navigate(['/orders', order.id]);
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }

  goToNotifications(): void {
    this.router.navigate(['/notifications']);
  }
}
