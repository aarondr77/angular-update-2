import { CurrencyCompactPipe } from './currency-compact.pipe';

describe('CurrencyCompactPipe', () => {
  const pipe = new CurrencyCompactPipe();

  it('formats millions', () => {
    expect(pipe.transform(2_450_000)).toBe('$2.45M');
  });

  it('formats thousands', () => {
    expect(pipe.transform(890_000)).toBe('$890K');
  });

  it('returns em dash for null', () => {
    expect(pipe.transform(null)).toBe('—');
  });
});
