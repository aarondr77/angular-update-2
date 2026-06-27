declare module 'jest-axe' {
  export function axe(html: Element | string, options?: unknown): Promise<unknown>;

  export const toHaveNoViolations: {
    toHaveNoViolations(results: unknown): { message: () => string; pass: boolean };
  };
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}

export {};
