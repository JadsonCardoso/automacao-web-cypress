/// <reference types="cypress" />
//const loginUsuario = require('../fixtures/login.json') // Common js
const login = require('../modules/login') // Por padrão ele acessa o arquivo principal da Pasta, mas caso não fosse, teriamos que passar o arquivo
const menu = require('../modules/menu') // Por padrão ele acessa o arquivo principal da Pasta, mas caso não fosse, teriamos que passar o arquivo


describe('Exercícios de casos de tela na aplicação - automationexercise', () => {

    it('Cadastrar usuário', () => {
        menu.navegarParLogin() // Chamando a dunção da CLASS Menu
        login.preencherFormularioDePreCadastro()
    })

    it.only('Cadastrar usuário com email já cadastrado', () => {
        menu.navegarParLogin() // Chamando a dunção da CLASS Menu
        login.cadastrarUsuarioComEmailCadastrado()
        cy.contains('p', 'Email Address already exist!').should('be.visible') // O contains valida se na tela há esse texto, caso tenha mais de texto, ele vai seguir, 
                                                                             // Se não tiver nenhum, ele vai falhar. Pode dar um falso postivo: Formas de contanar:
                                                                             // Usar sempre o elemento para validar o texto, conforme feito.
                                                                             // Ele sempre procura por um texto visivel, não é necessário por '.should('be.visible')'
    })

    it('Login e Logout com usuário cadastrado', () => {
        cy.visit(aplicacao)
        cy.get('a[href="/login"]').click()
        cy.contains('h2', 'Login to your account').should('be.visible')
        cy.fixture('login').then((loginUsuario) => { //O arquivo login.json é carregado via cy.fixture().
            // Realiza o login com os dados da fixture
            login(loginUsuario.email, loginUsuario.senha)

            // Verifica se o nome do usuário aparece após login
            cy.contains('b', loginUsuario.nome).should('be.visible')

            // Realiza o logout
            realizarLogout()
        })
    })

    it('Login do usuário com e-mail e senha incorretos', () => {
        cy.visit(aplicacao)
        cy.get('img[alt="Website for automation practice"]').should('be.visible')

        cy.get('a[href="/login"]').click()
        cy.contains('h2', 'Login to your account').should('be.visible') // Validando se H2 com o texto 'Login to your account' e se está visível
        // const emailFaker = helpers.getRandomEmail();

        cy.get('input[data-qa="login-email"]').type('emailFaker')
        cy.get('input[data-qa="login-password"]').type('45678545')
        cy.get('button[data-qa="login-button"]').click()
        cy.contains('p', 'Your email or password is incorrect!').should('be.visible')
    })

    it('Cadastro e remoção de conta', () => {
        cadastrarUsuario(nameUser, emailUser)
        realizarLogout()

        cy.visit(aplicacao)
        cy.get('a[href="/login"]').click()
        cy.contains('h2', 'Login to your account').should('be.visible') // Validando se H2 com o texto 'Login to your account' e se está visível

        login(emailUser, senha)
        cy.contains('b', nameUser).should('be.visible')

        removerCadastro()

        cy.get('a[href="/login"]').click()
        login(emailUser, senha)
        cy.contains('p', 'Your email or password is incorrect!').should('be.visible')
    })

})