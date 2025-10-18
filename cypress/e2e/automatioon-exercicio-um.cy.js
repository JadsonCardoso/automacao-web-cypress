/// <reference types="cypress" />
const loginUsuario = require('../fixtures/login.json') // Common js
//import loginUsuario from '../fixtures/login.json'   // ES MODULE
const helpers = require('../support/helpers');


describe('Exercícios de casos de tela na aplicação - automationexercise', () => {
    const timestamp = new Date().getTime()
    const email = `qa-tester-${timestamp}@test.com`
    const name = 'Qa Tester'
    const aplicacao = 'https://www.automationexercise.com/'
    const senha = 'abc123'

    it('Cadastrar usuário', () => {
        cadastrarUsuario(name, email)
    })

    it('Cadastrar usuário com email já cadastrado', () => {
        cy.visit(aplicacao)
        cy.get('a[href="/login"]').click()

        cy.get('[data-qa="signup-name"]').type(loginUsuario.nome)
        cy.get('[data-qa="signup-email"]').type('teste@teste.com')
        cy.contains('button', 'Signup').click()

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
        const nameUser = "Usuário tester"
        const emailUser = "testing@teste.com"

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

    function cadastrarUsuario(name, email) {

        cy.visit(aplicacao)

        cy.get('a[href="/login"]').click()

        cy.get('[data-qa="signup-name"]').type(name)
        cy.get('[data-qa="signup-email"]').type(email)
        cy.contains('button', 'Signup').click()

        cy.get('input[type=radio]').check('Mr')

        cy.get('input#password').type(senha, { log: false })
        cy.get('select[data-qa=days]').select('20')
        cy.get('select[data-qa=months]').select('September')
        cy.get('select[data-qa=years]').select('1992')


        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type('Fred')
        cy.get('input#last_name').type('Jean crô vandan')
        cy.get('input#company').type('Empresa X')
        cy.get('input#address1').type('Avenidade Selenium, n 2004')
        cy.get('select#country').select('Canada')
        cy.get('input#state').type('California')
        cy.get('input#city').type('Los Angeles')
        cy.get('input[data-qa=zipcode]').type('90001')
        cy.get('input[data-qa=mobile_number]').type('222 222 222')
        cy.get('button[data-qa=create-account]').click()


        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')
        cy.get('a[data-qa="continue-button"]').click()
    }

    function login(email, senha) {
        cy.get('input[data-qa="login-email"]').type(email)
        cy.get('input[data-qa="login-password"]').type(senha)
        cy.get('button[data-qa="login-button"]').click()
    }

    function emailLogin(email) {
        cy.get('input[data-qa="login-email"]').type(email)
    }

    function senhaLogin(senha) {
        cy.get('input[data-qa="login-password"]').type(senha)
    }

    function enviarFomulario() {
        cy.get('button[data-qa="login-button"]').click()
    }

    function removerCadastro() {
        cy.get('a[href="/delete_account"]').click()
        // cy.contains('b', 'Qa Tester').should('not.be.visible')
        cy.contains('b', name).should('not.exist') // Verificando se ele não existe na tela.
        cy.contains('b', 'Account Deleted!').should('be.visible')
    }

    function realizarLogout() {
        cy.get('a[href="/logout"]').click()
        cy.url().should('includes', 'login')
    }

})