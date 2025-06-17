import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('clico em {string}', function (buttonText) {
    cy.contains('a.btn', buttonText).click();
});

When('preencho a descrição {string} e a data {string}', function (description, date) {
    const [day, month, year] = date.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    cy.get('#description').type(description);
    cy.get('#date').type(formattedDate);
});

When('preencho a descrição {string} e a data do dia atual', function (description) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    cy.get('#description').type(description);
    cy.get('#date').type(formattedDate);
});

When('clico em {string}', function (buttonText) {
    cy.contains('button[type="submit"]', buttonText).click();
});

When('preencho a data {string} deixando a descrição em branco', function (date) {
    const [day, month, year] = date.split('/');
    const formattedDate = `${year}-${month}-${day}`;
    cy.get('#description').clear();
    cy.get('#date').type(formattedDate);
    cy.get('form button[type="submit"]').click();
});

When('clico em {string} para o evento {string}', function (buttonText, eventDescription) {
    cy.contains('.card-body', eventDescription)
        .find(`a.btn:contains("${buttonText}")`)
        .click();
});

When('modifico a descrição para {string} e a data para {string}', function (newDescription, newDate) {
    const [day, month, year] = newDate.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    cy.get('#description').clear().type(newDescription);
    cy.get('#date').type(formattedDate);
});

When('na página de edição, clico em {string}', function (buttonText) {
    cy.contains('button.btn', buttonText).click();
});

Then('um novo evento com descrição {string} e data {string} deve ser criado associado ao meu usuário', function (description, date) {
    const expectedDate = new Date(date).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    cy.contains('.card-title', description).should('be.visible');
    cy.contains('.card-subtitle', expectedDate).should('be.visible');
});

Then('um novo evento com descrição {string} e a data do dia atual deve ser criado associado ao meu usuário', function (description) {
    const today = new Date().toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    cy.contains('.card-title', description).should('be.visible');
    cy.contains('.card-subtitle', today).should('be.visible');
});

Then('eu devo ser redirecionado para a página homeUser com o novo evento listado', function () {
    cy.url().should('include', '/event');
});

Then('o sistema deve exibir a mensagem {string}', function (message) {
    let alertAppeared = false;

    cy.on('window:alert', (str) => {
        alertAppeared = true;
        expect(str).to.equal(message);
    });

    cy.wait(1500).then(() => {
        if (!alertAppeared) {
            cy.contains(message).should('be.visible');
        }
    });
});

Then('o evento {string} não deve ser criado', function (description) {
    cy.contains('.card-title', description).should('not.exist');
});

Then('as informações do evento {string} devem ser atualizadas no banco de dados', function (description) {
    cy.contains('.card-title', description).should('be.visible');
});

Then('eu devo ser redirecionado para a página homeUser com as informações atualizadas', function () {
    cy.url().should('include', '/event');
});

Then('o evento {string} deve ser removido do banco de dados', function (description) {
    cy.contains('.card-title', description).should('not.exist');
});

Then('eu devo ser redirecionado para a página homeUser sem o evento excluído', function () {
    cy.url().should('include', '/event');
});
