/// <reference types="cypress" />
describe('Automation Exercise', () => {
    it('Cadastrar usuário', () => {
        const timestamp = new Date().getTime() // Gere números diferentes: Usaremos pro enquanto, mas o ideal é usarmos um biblioteca para gerar valores aleatórios.
        cy.visit('https://www.automationexercise.com/') // comando para acessar a aplicação

        cy.get('a[href="/login"]').click() // o get pega o elemento pelo seu selector

        cy.get('[data-qa="signup-name"]').type('Qa Tester') // type para preencher campos
        cy.get('[data-qa="signup-email"]').type(`qa-tester-${timestamp}@test.com`) // Passando o timetamp para gera valores aleatórios
        cy.contains('button', 'Signup').click()

        // Redio ou checkoboxes a gente usa o CHECK
        cy.get('input[type=radio]').check('Mr') // Marque o radio que conten o valor 'Mr'

        cy.get('input#password').type('123456', { log: false }) // Concateno atributo com ID, passando LOG  para não exibir a senha no ambiente de testes quando a mesmo for preenchida

        // para comboxess ou selects a gente usa o SELECT
        cy.get('select[data-qa=days]').select('20') // Passamos o elemento e o valor dentro dele.
        cy.get('select[data-qa=months]').select('September')
        cy.get('select[data-qa=years]').select('1992')

        // Redio ou checkoboxes a gente usa o CHECK
        cy.get('input[type=checkbox]#newsletter').check() // Usando a técnica de concaternar elemento para ser mais assertivo o noso filtro para mapear ele.
        cy.get('input[type=checkbox]#optin').check() // Estamos pegando: a tag INPUT com o atributo TYPE e o ID

        cy.get('input#first_name').type('Fred')
        cy.get('input#last_name').type('Jean crô vandan')
        cy.get('input#company').type('Empresa X')
        cy.get('input#address1').type('Avenidade Selenium, n 2004')
        cy.get('select#country').select('Canada')
        cy.get('input#state').type('California')
        cy.get('input#city').type('Los Angeles')
        cy.get('input[data-qa=zipcode]').type('90001') // Não passamo o valor do atibuto entre "" porque não tem caracter especial
        cy.get('input[data-qa=mobile_number]').type('222 222 222')
        cy.get('button[data-qa=create-account]').click()

        // Triplo A - arrange, Act, Assert 
        cy.get('includes', 'account_created').url().shoul// A url()Ela retorna o URL atual da página '.should('includes' verifica se na página contém o valor passado que em nosso teste é 'account_created'
        cy.contains('b', 'Account Created!') // Verificando se na  página tem a tag B tem o texto passado
    })

})