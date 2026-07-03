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

// Angular Material 17+ MDC table requires getComputedStyle to return a valid object
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'none',
    appearance: '',
    getPropertyValue: () => '',
  }),
});

// Angular Material 17+ MDC table calls querySelector('tbody') on native table elements.
// Real browsers auto-generate <tbody> during HTML parsing, but jsdom does not for
// programmatically-created tables. Patch to ensure tbody exists when queried.
const origQuerySelector = Element.prototype.querySelector;
Element.prototype.querySelector = function (selector: string) {
  if (
    selector === 'tbody' &&
    this.nodeName === 'TABLE' &&
    !origQuerySelector.call(this, 'tbody')
  ) {
    const tbody = document.createElement('tbody');
    this.appendChild(tbody);
  }
  return origQuerySelector.call(this, selector);
};
