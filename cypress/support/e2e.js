import 'cypress-axe';

beforeEach(() => {
    cy.injectAxe();
});

it('HomePage deve ser acessível', () => {
    cy.visit('/');
    cy.checkA11y();
});
