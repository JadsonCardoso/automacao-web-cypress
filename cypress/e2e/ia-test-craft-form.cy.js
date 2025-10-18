/// <reference types="cypress" />
// modal.spec.js
const modalPage = require('../modules/ia-test-craft')
describe('Transaction Modal Tests', () => {
    // const modalPage = new ModalPage();

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/#');
    });

    it('Verifique se o modal abre quando um usuário inicia uma transação.', () => {
        modalPage.openModal();
        modalPage.modal.should('be.visible');
    });

    it('Verifique se o formulário pode ser enviado com entradas válidas para descrição, valor e data.', () => {
        modalPage.openModal();
        modalPage.fillForm('Teste', '100.00', '2023-10-01');
        modalPage.submitForm();
        // Add assertion to check if transaction was added successfully
    });

    it('Valide se a entrada para o valor aceita valores decimais e os exibe corretamente.', () => {
        modalPage.openModal();
        modalPage.fillForm('Teste', '100.50', '2023-10-01');
        modalPage.submitForm();
        // Add assertion to check if the value is displayed correctly
    });

    it('Tente enviar o formulário com campos vazios e verifique se as mensagens de erro apropriadas são exibidas.', () => {
        modalPage.openModal();
        modalPage.submitForm();
        // Add assertions to check for error messages
    });

    it('Insira caracteres inválidos no campo de descrição e verifique o tratamento de erros.', () => {
        modalPage.openModal();
        modalPage.fillForm('!@#$%^&*', '100.00', '2023-10-01');
        modalPage.submitForm();
        // Add assertions to check for error messages
    });
});