const helpers = require('../../support/helpers');
const { faker } = require('@faker-js/faker');
const loginUsuario = require('../../fixtures/login.json') 

class Login {
  login(email, senha) {
    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(senha);
    cy.get('button[data-qa="login-button"]').click();
  }

  preencherFormularioDePreCadastro() {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`);
    cy.get('[data-qa="signup-email"]').type(helpers.getRandomEmail());
    cy.contains('button', 'Signup').click();
  }

  cadastrarUsuarioComEmailCadastrado() {
    cy.get('[data-qa="signup-name"]').type(loginUsuario.name)
    cy.get('[data-qa="signup-email"]').type('teste@teste.com')
    cy.contains('button', 'Signup').click()
  }
}

// Exporta uma instância da classe
module.exports = new Login();

