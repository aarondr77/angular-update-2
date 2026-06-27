describe('Trade Operations Console — happy path', () => {
  beforeEach(() => {
    cy.login();
  });

  it('navigates login → dashboard → order detail → notifications', () => {
    cy.get('[data-testid="order-row-ORD-1001"]').click();
    cy.get('[data-testid="order-detail-page"]').should('be.visible');

    cy.get('.order-detail-header-card.mat-card').should('have.css', 'border-radius', '4px');
    cy.get('[data-testid="order-status-badge"]').should('have.class', 'mat-raised-button');

    cy.get('[data-testid="legacy-trend"]').should('be.visible');

    cy.get('[data-testid="nav-notifications"]').click();
    cy.get('[data-testid="notifications-page"]').should('be.visible');
    cy.get('[data-testid="pref-email-statements"]').should('be.visible');
  });
});
