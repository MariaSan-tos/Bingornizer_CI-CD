import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let currentBingoCardData = {};

Given('que estou logado como {string} com a senha {string} e na página homeUser com o evento {string} existente', function (username, password, eventDescription) {
    cy.visit('/user/login');
    cy.get('#email').type(username === 'Getulio' ? 'getuliofurtado03@gmail.com' : 'nicolas.03@gmail.com');
    cy.get('#password').type(password);
    cy.get('form button[type="submit"]').click();
    cy.url().should('include', '/event');
    cy.contains('.card-title', eventDescription).should('be.visible');
});

Given('que estou logado como {string} com a senha {string} e na página homeUser com o evento {string} que possui cartelas', function (username, password, eventDescription) {
    cy.visit('/user/login');
    cy.get('#email').type(username === 'Getulio' ? 'getuliofurtado03@gmail.com' : 'nicolas.03@gmail.com');
    cy.get('#password').type(password);
    cy.get('form button[type="submit"]').click();
    cy.url().should('include', '/event');
    cy.contains('.card-title', eventDescription).should('be.visible');
});

Given('que estou logado como {string} com a senha {string} e na página homeUser com o evento {string} que não possui cartelas', function (username, password, eventDescription) {
    cy.visit('/user/login');
    cy.get('#email').type(username === 'Getulio' ? 'getuliofurtado03@gmail.com' : 'nicolas.03@gmail.com');
    cy.get('#password').type(password);
    cy.get('form button[type="submit"]').click();
    cy.url().should('include', '/event');
    cy.contains('.card-title', eventDescription).should('be.visible');
});

Given('que estou logado como {string} com a senha {string} e na página homeBingoCard com a cartela de ID {string} do evento {string} existente', function (username, password, bingoCardId, eventDescription) {
    cy.visit('/user/login');
    cy.get('#email').type(username === 'Getulio' ? 'getuliofurtado03@gmail.com' : 'nicolas.03@gmail.com');
    cy.get('#password').type(password);
    cy.get('form button[type="submit"]').click();
    cy.url().should('include', '/event');
    cy.contains('.card-body', eventDescription)
        .find('a.btn:contains("Ver Cartelas")')
        .click();
    cy.url().should('include', `/bingoCard?idEvent=`);
    cy.get(`a[href*="/bingoCard/editBingoCard?bingoId=${bingoCardId}"]`).should('be.visible');
});

When('clico em {string} para o evento {string}', function (buttonText, eventDescription) {
    cy.contains('.card-body', eventDescription)
        .find(`a.btn:contains("${buttonText}")`)
        .click();
});

When('preencho os 24 campos de posição da cartela com números inteiros únicos válidos entre 1 e 75', function (dataTable) {
    const positions = dataTable.rawTable;
    currentBingoCardData = {};
    for (let i = 1; i < positions.length; i++) {
        const [field, value] = positions[i];
        const inputName = field.trim();
        const inputValue = value.trim();
        currentBingoCardData[inputName] = inputValue;
        cy.get(`input[name="${inputName}"]`).type(inputValue);
    }
});

When('preencho 23 campos de posição da cartela com números válidos e deixo um campo em branco', function () {
    for (let i = 1; i <= 24; i++) {
        if (i !== 13) {
            cy.get(`input[name="position_${i}"]`).type(`${i}`);
        }
    }
    cy.get('input[name="position_25"]').clear();
});

When('preencho um campo de posição da cartela com {string} e os demais com números válidos', function (invalidValue) {
    cy.get('input[name="position_1"]').type(invalidValue);
    for (let i = 2; i <= 25; i++) {
        if (i !== 13) {
            cy.get(`input[name="position_${i}"]`).type(`${i + 1}`);
        }
    }
});

When('preencho dois campos de posição da cartela com o mesmo número e os demais com números válidos', function () {
    cy.get('input[name="position_1"]').type('10');
    cy.get('input[name="position_2"]').type('10');
    for (let i = 3; i <= 25; i++) {
        if (i !== 13) {
            cy.get(`input[name="position_${i}"]`).type(`${i + 10}`);
        }
    }
});

When('clico em {string}', function (buttonText) {
    cy.contains('button[type="submit"]', buttonText).click();
});

When('clico em {string} para a cartela de ID {string}', function (buttonText, bingoCardId) {
    if (buttonText === 'Editar') {
        cy.get(`a[href*="/bingoCard/editBingoCard?bingoId=${bingoCardId}"]`).click();
    } else if (buttonText === 'Apagar') {
        cy.get(`form[action*="bingoCard?_method=DELETE&bingoId=${bingoCardId}"]`)
            .find('button[type="submit"]')
            .click();
    }
});

When('modifico a posição {string} para {string}', function (positionName, newValue) {
    currentBingoCardData[positionName] = newValue;
    cy.get(`input[name="${positionName}"]`).clear().type(newValue);
});

Then('uma nova cartela de bingo deve ser criada e associada ao evento {string}', function (eventDescription) {
    cy.url().should('include', '/event');
    cy.contains('.card-body', eventDescription)
        .find('a.btn:contains("Ver Cartelas")')
        .click();
    cy.get('.container.text-center .row-cols-lg-5').should('exist');
    cy.get('.container.text-center').first().contains(currentBingoCardData.position_1).should('be.visible');
});

Then('eu devo ser redirecionado para a página homeUser', function () {
    cy.url().should('include', '/event');
});

Then('a cartela não deve ser criada', function () {
    cy.url().should('include', '/bingoCard/newBingoCard');
});

Then('devo ser redirecionado para a página homeBingoCard', function () {
    cy.url().should('include', '/bingoCard?idEvent=');
});

Then('a página deve listar as cartelas de bingo associadas ao evento {string}', function (eventDescription) {
    cy.get('.container.text-center .row-cols-lg-5').should('exist');
});

Then('a página deve exibir a mensagem {string}', function (message) {
    cy.contains(message).should('be.visible');
});

Then('a posição {string} da cartela de ID {string} deve ser atualizada para {string} no banco de dados', function (positionName, bingoCardId, newValue) {
    cy.url().should('include', '/event');
    cy.contains('.card-body', 'Bingao do IF')
        .find('a.btn:contains("Ver Cartelas")')
        .click();
    cy.url().should('include', '/bingoCard?idEvent=');
    cy.get(`a[href*="/bingoCard/editBingoCard?bingoId=${bingoCardId}"]`).parents('.container.text-center').first()
        .contains(newValue)
        .should('be.visible');
});

Then('a cartela de bingo de ID {string} deve ser removida do banco de dados', function (bingoCardId) {
    cy.url().should('include', '/bingoCard?idEvent=');
    cy.get(`a[href*="/bingoCard/editBingoCard?bingoId=${bingoCardId}"]`).should('not.exist');
});

Then('eu devo ser redirecionado para a página homeBingoCard', function () {
    cy.url().should('include', '/bingoCard?idEvent=');
});

Then('a cartela de ID {string} não deve ser mais listada', function (bingoCardId) {
    cy.get(`a[href*="/bingoCard/editBingoCard?bingoId=${bingoCardId}"]`).should('not.exist');
});
