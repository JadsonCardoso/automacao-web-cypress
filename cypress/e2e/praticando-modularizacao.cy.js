/// <reference types="cypress" />
//const loginUsuario = require('../fixtures/login.json') // Common js
const login = require('../modules/login') // Por padrão ele acessa o arquivo principal da Pasta, mas caso não fosse, teriamos que passar o arquivo
const menu = require('../modules/menu') // Por padrão ele acessa o arquivo principal da Pasta, mas caso não fosse, teriamos que passar o arquivo


describe('Exercícios de casos de tela na aplicação - automationexercise', () => {

    it('Cadastrar usuário', () => {
        cy.navegarParLogin() // Chamando a função do COMMANDS
        login.preencherFormularioDePreCadastro()
    })

    it('Cadastrar usuário com email já cadastrado', () => {
        menu.navegarParLogin() // Chamando a dunção da CLASS Menu
        login.cadastrarUsuarioComEmailCadastrado()
        cy.contains('p', 'Email Address already exist!').should('be.visible') // O contains valida se na tela há esse texto, caso tenha mais de texto, ele vai seguir, 
                                                                             // Se não tiver nenhum, ele vai falhar. Pode dar um falso postivo: Formas de contanar:
                                                                             // Usar sempre o elemento para validar o texto, conforme feito.
                                                                             // Ele sempre procura por um texto visivel, não é necessário por '.should('be.visible')'
    })
})