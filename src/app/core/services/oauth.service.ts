import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import { AuthUser } from '../../models';

const VALID_USERS: Record<string, string> = {
  analyst: 'demo123',
  manager: 'demo123',
};

@Injectable({ providedIn: 'root' })
export class OAuthService {
  authenticate(username: string, password: string): Observable<AuthUser> {
    const normalized = username.trim().toLowerCase();

    if (!VALID_USERS[normalized] || VALID_USERS[normalized] !== password) {
      return throwError(() => new Error('Invalid credentials'));
    }

    const user: AuthUser = {
      username: normalized,
      token: `stub-jwt-${normalized}-${Date.now()}`,
      displayName: normalized === 'manager' ? 'Alex Manager' : 'Jordan Analyst',
    };

    return of(user).pipe(delay(300));
  }
}
