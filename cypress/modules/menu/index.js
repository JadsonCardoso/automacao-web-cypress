
class Menu {
    navegarParLogin() {
        cy.visit('https://www.automationexercise.com/')
        cy.get('a[href="/login"]').click()
    }
    
    realizarLogout() {
        cy.get('a[href="/logout"]').click()
        cy.url().should('includes', 'login')
    }
}

module.exports = new Menu();