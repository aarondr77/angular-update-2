/// <reference path="./jest-axe.d.ts" />

import 'jest-preset-angular/setup-jest';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations as never);

// Workaround: jsdom does not implicitly create <tbody> inside <table> like real
// browsers do. Angular Material 17's MatTable.ngOnInit queries for it.
(function patchTableQuerySelector() {
  const origQuerySelector = Element.prototype.querySelector;
  Element.prototype.querySelector = function (this: Element, selector: string) {
    const result = origQuerySelector.call(this, selector);
    if (!result && selector === 'tbody' && this.nodeName === 'TABLE') {
      const tbody = document.createElement('tbody');
      this.appendChild(tbody);
      return tbody;
    }
    return result;
  } as typeof Element.prototype.querySelector;
})();

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
