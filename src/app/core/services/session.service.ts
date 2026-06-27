import { Injectable } from '@angular/core';
import { Observable, from, of, firstValueFrom } from 'rxjs';

/**
 * Uses deprecated RxJS toPromise() — A2 auto-migration specimen.
 */
@Injectable({ providedIn: 'root' })
export class SessionService {
  saveToken(token: string): Observable<void> {
    return from(
      Promise.resolve().then(() => {
        sessionStorage.setItem('bofa-auth-token', token);
      })
    );
  }

  getToken(): Promise<string | null> {
    return Promise.resolve(sessionStorage.getItem('bofa-auth-token'));
  }

  clearToken(): Promise<void> {
    return Promise.resolve().then(() => {
      sessionStorage.removeItem('bofa-auth-token');
    });
  }

  /** @deprecated Uses RxJS toPromise — A2 migration specimen */
  loadTokenViaObservable(): Promise<string | null> {
    return of(sessionStorage.getItem('bofa-auth-token')).toPromise() as Promise<string | null>;
  }

  loadTokenViaFirstValueFrom(): Promise<string | null> {
    return firstValueFrom(of(sessionStorage.getItem('bofa-auth-token')));
  }
}
