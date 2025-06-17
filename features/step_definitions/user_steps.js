import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let sharedContext = {};

Given('que estou na página de cadastro', function () {
    cy.visit('/user/cadastro');
});

Given('que estou na página de login', function () {
    cy.visit('/user/login');
});

Given('que estou logado como {string} com a senha {string} e na página homeUser', function (username, password) {
    cy.visit('/user/login');
    cy.get('#email').type(username === 'Getulio' ? 'getuliofurtado03@gmail.com' : 'nicolas.03@gmail.com');
    cy.get('#password').type(password);
    cy.get('form button[type="submit"]').click();
    cy.url().should('include', '/event');
    cy.contains('h3', 'Sem eventos')
        .should('be.visible')
        .then(null, () => {
            cy.contains('a.btn', 'Novo Evento').should('be.visible');
        });
});

Given('que estou logado como {string} com a senha {string} e na página de edição de usuário', function (username, password) {
    cy.visit('/user/login');
    cy.get('#email').type(username === 'Getulio' ? 'getuliofurtado03@gmail.com' : 'nicolas.03@gmail.com');
    cy.get('#password').type(password);
    cy.get('form button[type="submit"]').click();
    cy.url().should('include', '/event');
    cy.contains('a.btn', 'Editar Usuário').click();
    cy.url().should('include', '/user/editUser');
});

When('preencho o formulário com um username {string}, um email {string} e uma senha {string}', function (username, email, password) {
    cy.get('#username').type(username);
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form button[type="submit"]').click();
});

When('insiro o email {string} e a senha {string} válidos e existentes no sistema', function (email, password) {
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form button[type="submit"]').click();
});

When('insiro o email {string} válido e uma senha {string} inválida', function (email, password) {
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form button[type="submit"]').click();
});

When('insiro o email {string} inexistente e a senha {string} válida', function (email, password) {
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form button[type="submit"]').click();
});

When('insiro o email {string} inválido e a senha {string} inválida', function (email, password) {
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form button[type="submit"]').click();
});

When(
    'eu envio o formulário deixando o campo {string} em branco, campo {string} {string} e campo {string} {string}',
    function (campoEmBranco, campo1, valor1, campo2, valor2) {
        const campos = {
            username: '#username',
            email: '#email',
            password: '#password',
        };

        if (campo1 !== campoEmBranco) {
            cy.get(campos[campo1]).type(valor1);
        }

        if (campo2 !== campoEmBranco) {
            cy.get(campos[campo2]).type(valor2);
        }

        cy.get('form button[type="submit"]').click();
    }
);

When('clico em {string}', function (buttonText) {
    cy.contains('a.btn', buttonText).click();
});

When('modifico o username para {string} e o email para {string}', function (newUsername, newEmail) {
    cy.get('#username').clear().type(newUsername);
    cy.get('#email').clear().type(newEmail);
});

When('modifico a senha para {string}', function (newPassword) {
    cy.get('#password').clear().type(newPassword);
});

When('na página de edição, clico em {string}', function (buttonText) {
    cy.contains('button.btn', buttonText).click();
});

Then('meu usuário deve ser criado com sucesso no banco de dados', function () {});

Then('eu devo ser redirecionado para a página de login', function () {
    cy.url().should('include', '/user/login');
});

Then('o sistema deve exibir uma mensagem informando que {string}', function (message) {
    cy.on('window:alert', (str) => {
        expect(str).to.equal(message);
    });
});

Then('minha sessão de usuário deve ser estabelecida', function () {
    cy.url().should('include', '/event');
});

Then('eu devo ser redirecionado para a página inicial do usuario \\(homeUser) exibindo meus eventos', function () {
    cy.url().should('include', '/event');
    cy.contains('h3', 'Sem eventos')
        .should('be.visible')
        .then(null, () => {
            cy.contains('a.btn', 'Novo Evento').should('be.visible');
        });
});

Then('minha sessão de usuário não deve ser estabelecida', function () {
    cy.url().should('include', '/user/login');
    cy.contains('usuario inexistente').should('be.visible');
});

Then('o sistema deve impedir o registro', function () {
    cy.url().should('include', '/user/cadastro');
});

Then('exibir uma validação HTML para o campo {string}', function (field) {
    cy.get(`#${field}`).then(($input) => {
        expect($input[0].validationMessage).to.not.be.empty;
    });
});

Then('meu usuário não deve ser criado novamente', function () {
    cy.url().should('include', '/user/cadastro');
});

Then('minhas informações de usuário devem ser atualizadas no banco de dados', function () {});

Then('a sessão do usuário deve ser atualizada com {string}', function (expectedUsername) {});

Then('a sessão do usuário deve ser atualizada', function () {
    cy.url().should('include', '/event');
});

Then('meu usuário deve ser removido do banco de dados', function () {
    cy.visit('/user/login');
    cy.get('#email').type(sharedContext.deletedUserEmail || 'nicolas.03@gmail.com');
    cy.get('#password').type(sharedContext.deletedUserPassword || '12345');
    cy.get('form button[type="submit"]').click();
    cy.contains('usuario inexistente').should('be.visible');
});

Then('minha sessão deve ser encerrada', function () {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
});

Then('eu devo ser redirecionado para a página inicial \\(homePage)', function () {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
});
