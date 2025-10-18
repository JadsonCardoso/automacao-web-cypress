/// <reference types="cypress" />

const formularioContato = require('../fixtures/formulario-de-contato.json')
describe('Envio de formulário', () => {
    beforeEach(() => { // Executado antes de cada teste: IT
        cy.visit('https://www.automationexercise.com/') // Para esse testes, temos que sempre acessar a applicação e a tela de login
        cy.get('a[href="/contact_us"]').click()

        cy.contains('h2', 'Get In Touch')
    })

    it('Enviar um formulário de contato com upload de arquivo usando fixture ', () => {
        cy.get('input[data-qa="name"]').type(formularioContato.name)
        cy.get('input[data-qa="email"]').type(formularioContato.email)
        cy.get('input[data-qa="subject"]').type(formularioContato.subject)
        cy.get('textarea[data-qa="message"]').type(formularioContato.message)

        cy.fixture('example.json').as('arquivo') // Passamos o nome dp arquivo que usaremos, e darmos um nome para ele: Em nosso exemplo: 
        cy.get('input[name="upload_file"]').selectFile('@arquivo') // Passamos no selectfile o nome com o "@" que damos para a importação do nosso arquivo fixture, nesse é exemplo é o arquivo

        cy.get('input[type=submit]').click()
        cy.get('.status').should('be.visible') // Validando se no elemento está vísivel
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')// Validando se no elemento tem o texto
        cy.contains('div', 'Success! Your details have been submitted successfully.') 
        cy.contains('Success! Your details have been submitted successfully.') // ou Assim, por o elemento, nesse exemplo sem a div
        cy.get('div.contact-form').parent().should('contain', 'Success! Your details have been submitted successfully.')  // Validando se no elemento pai, tem esse o texto como filho
    })
})