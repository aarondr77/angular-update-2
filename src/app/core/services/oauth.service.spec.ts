import { TestBed } from '@angular/core/testing';
import { OAuthService } from './oauth.service';

describe('OAuthService', () => {
  let service: OAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OAuthService);
  });

  it('should authenticate valid credentials', (done) => {
    service.authenticate('analyst', 'demo123').subscribe((user) => {
      expect(user.username).toBe('analyst');
      expect(user.token).toContain('stub-jwt');
      done();
    });
  });

  it('should reject invalid credentials', (done) => {
    service.authenticate('bad', 'wrong').subscribe({
      error: (err) => {
        expect(err.message).toBe('Invalid credentials');
        done();
      },
    });
  });
});
