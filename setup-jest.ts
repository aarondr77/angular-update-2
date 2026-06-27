/// <reference path="./jest-axe.d.ts" />

import 'jest-preset-angular/setup-jest';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations as never);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
});
