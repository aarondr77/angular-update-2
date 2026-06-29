import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store
      .select(selectIsAuthenticated)
      .pipe(map((authenticated) => (authenticated ? true : this.router.createUrlTree(['/login']))));
  }
}
