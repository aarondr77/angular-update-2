import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Order } from '../../models';
import * as OrdersActions from './orders.actions';

@Injectable()
export class OrdersEffects {
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      mergeMap(() =>
        this.http.get<Order[]>('/api/orders').pipe(
          map((orders) => OrdersActions.loadOrdersSuccess({ orders })),
          catchError((error) =>
            of(
              OrdersActions.loadOrdersFailure({
                error: error.message || 'Failed to load orders',
              })
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
