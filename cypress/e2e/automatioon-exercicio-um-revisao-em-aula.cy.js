/// <reference types="cypress" />
const helpers = require('../support/helpers')
/**
 *  Hooks / Ganhchos: uSADOS PARA AÇÕES QUE SE REPETEM
 *     before -> 1x antes de todos os testes: É recomendado Usar para preparar o ambientes antes da execução dos testes. Seja Limpar base ou preperar base.
 *     beforeEach -> Antes de cada teste
 *     after -> 1x depois de todos os testes: // É recomendo usar os BEFORE DO QUE USAR OS AFTRS. 
 *     aftereEach -> Depois de cada teste
 * 
 */

describe('Revisão em Aula dos exercícios UM', () => {
    beforeEach(() => { // Executado antes de cada teste: IT
        cy.visit('https://www.automationexercise.com/') // Para esse testes, temos que sempre acessar a applicação e a tela de login
        cy.get('a[href="/login"]').click()
    })

    it.only('Exemplos de Logs', () => {
        cy.log(`STEP 1 :: pagts AUTOMAÇÃO CY LOG`)
        cy.log(`STEP 1 :: pagts AUTOMAÇÃO CY LOG`)
        console.log(`STEP 1 :: pagts AUTOMAÇÃO CY LOG`)
    })


    it('Login de usuários com email e senha corretos', () => {
        cy.get('input[data-qa="login-email"').type('qa-tester-1759531244927@test.com')
        cy.get('input[data-qa="login-password"]').type('abc123')

        cy.get('button[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain', 'Qa Tester')     // Validando se no elemento pai, tem esse o texto como filho
        // Em automação WEB, é commum que tenha mais de uma asserções/validação: EXPECT
        // Validações via: Banco de Dado, API e outras telas.

        cy.contains('b', 'Qa Tester').should('be.visible')       // O contains valida se na tela há esse texto, caso tenha mais de texto, ele vai seguir, 
        // Se não tiver nenhum, ele vai falhar. Pode dar um falso postivo: Formas de contanar:
        // Usar sempre o elemento para validar o texto, conforme feito.
        cy.contains('b', 'Qa Tester') // Ele sempre procura por um texto visivel, não é necessário por '.should('be.visible')'
    })

    it.only('Login de usuário com e-mail e senha incorretos', () => {
        cy.get('input[data-qa="login-email"').type(helpers.getRandomEmail())
        cy.get('input[data-qa="login-password"]').type('abc123aaaa')

        cy.get('button[data-qa="login-button"]').click()


        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect') // Fazendo asserções com GET
    })
})