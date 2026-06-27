import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { OrdersEffects } from './orders.effects';
import * as OrdersActions from './orders.actions';

describe('OrdersEffects', () => {
  let actions$: Observable<unknown>;
  let effects: OrdersEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdersEffects, provideMockActions(() => actions$)],
    });
    effects = TestBed.inject(OrdersEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should load orders on loadOrders action', (done) => {
    const orders = [{ id: 'ORD-1', symbol: 'AAPL' }];
    actions$ = new Observable((subscriber) => {
      subscriber.next(OrdersActions.loadOrders());
      subscriber.complete();
    });

    effects.loadOrders$.subscribe((action) => {
      expect(action).toEqual(OrdersActions.loadOrdersSuccess({ orders: orders as never }));
      done();
    });

    const req = httpMock.expectOne('/api/orders');
    expect(req.request.method).toBe('GET');
    req.flush(orders);
  });
});
