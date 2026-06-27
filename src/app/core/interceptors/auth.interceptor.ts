import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { selectAuthUser } from '../../store/auth/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(selectAuthUser).pipe(
      take(1),
      switchMap((user) => {
        if (user?.token) {
          const cloned = req.clone({
            setHeaders: { Authorization: `Bearer ${user.token}` },
          });
          return next.handle(cloned);
        }
        return next.handle(req);
      })
    );
  }
}
