import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { SessionService } from './session.service';

/**
 * Characterization baseline (A2 specimen — deprecated RxJS toPromise()).
 * The 14→15 schematics migrate toPromise() usage; this test pins that
 * loadTokenViaObservable() and loadTokenViaFirstValueFrom() return identical
 * results so the migration is provably behavior-preserving. KB policy 7.
 */
describe('SessionService (characterization baseline)', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
    sessionStorage.clear();
  });

  afterEach(() => sessionStorage.clear());

  it('saveToken persists the token to sessionStorage', async () => {
    await firstValueFrom(service.saveToken('abc-123'));
    expect(sessionStorage.getItem('bofa-auth-token')).toBe('abc-123');
  });

  it('getToken resolves the stored token', async () => {
    sessionStorage.setItem('bofa-auth-token', 'tok-xyz');
    await expect(service.getToken()).resolves.toBe('tok-xyz');
  });

  it('clearToken removes the stored token', async () => {
    sessionStorage.setItem('bofa-auth-token', 'tok-xyz');
    await service.clearToken();
    expect(sessionStorage.getItem('bofa-auth-token')).toBeNull();
  });

  it('loadTokenViaObservable (toPromise) returns the stored token', async () => {
    sessionStorage.setItem('bofa-auth-token', 'legacy-tok');
    await expect(service.loadTokenViaObservable()).resolves.toBe('legacy-tok');
  });

  it('toPromise and firstValueFrom variants return identical results', async () => {
    sessionStorage.setItem('bofa-auth-token', 'same-tok');
    const viaToPromise = await service.loadTokenViaObservable();
    const viaFirstValueFrom = await service.loadTokenViaFirstValueFrom();
    expect(viaToPromise).toBe(viaFirstValueFrom);
    expect(viaFirstValueFrom).toBe('same-tok');
  });

  it('returns null when no token is stored', async () => {
    await expect(service.loadTokenViaObservable()).resolves.toBeNull();
  });
});
