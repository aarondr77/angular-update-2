import { TestBed } from '@angular/core/testing';
import { OAuthService } from '../../core/services/oauth.service';

/** A2 specimen: TestBed.get() auto-migrates to TestBed.inject() */
describe('TestBed.get legacy API', () => {
  it('uses TestBed.get for A2 migration specimen', () => {
    TestBed.configureTestingModule({
      providers: [OAuthService],
    });
    const service = TestBed.get(OAuthService);
    expect(service).toBeTruthy();
  });
});
