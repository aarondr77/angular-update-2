import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../models';
import * as OrdersActions from '../store/orders/orders.actions';
import {
  selectAllOrders,
  selectOrdersLoaded,
  selectOrdersLoading,
} from '../store/orders/orders.selectors';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  standalone: false,
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  order$: Observable<Order | undefined>;
  loading$ = this.store.select(selectOrdersLoading);
  private sub = new Subscription();

  notes = '';

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) {
    this.order$ = this.store.select(selectAllOrders).pipe(
      map((orders) => {
        const id = this.route.snapshot.paramMap.get('id');
        return orders.find((o) => o.id === id);
      })
    );
  }

  ngOnInit(): void {
    this.sub.add(
      this.store.select(selectOrdersLoaded).subscribe((loaded) => {
        if (!loaded) {
          this.store.dispatch(OrdersActions.loadOrders());
        }
      })
    );

    this.sub.add(
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (id) {
          this.store.dispatch(OrdersActions.selectOrder({ id }));
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  statusClass(status: string): string {
    return status.toLowerCase();
  }
}
