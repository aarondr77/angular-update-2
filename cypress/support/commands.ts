/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { addMatchImageSnapshotCommand } = require('cypress-image-snapshot/command');

addMatchImageSnapshotCommand({
  failureThreshold: 0.03,
  failureThresholdType: 'percent',
  customDiffConfig: { threshold: 0.1 },
});

Cypress.Commands.add('login', (username = 'analyst', password = 'demo123') => {
  cy.visit('/login');
  cy.get('[data-testid="login-submit"]').should('be.visible');
  cy.get('input[formcontrolname="username"]').clear().type(username);
  cy.get('input[formcontrolname="password"]').clear().type(password);
  cy.get('[data-testid="login-submit"]').click();
  cy.get('[data-testid="dashboard-page"]', { timeout: 10000 }).should('be.visible');
});

export {};
