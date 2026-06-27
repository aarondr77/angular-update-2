describe('Order Detail — visual regression', () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-testid="order-row-ORD-1001"]').click();
    cy.get('[data-testid="order-detail-page"]').should('be.visible');
    cy.get('[data-testid="legacy-trend"]').should('be.visible');
  });

  it('matches branded order detail baseline', () => {
    cy.get('.order-detail-page').matchImageSnapshot('order-detail-branded');
  });
});
