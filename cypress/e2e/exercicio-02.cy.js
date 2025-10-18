/// <reference types="cypress" />
describe('Cadastrar entradas e saídas com bugs', () => {
  it('Cadastrar uma nova transação de entrada - falha 1', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")
 
    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").contains().get().click()

  });

  it('Cadastrar uma nova transação de entrada - falha 2', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    cy.contains("Nova Transação").click()
    cy.get("#description").sendKeys("Mesada")
    cy.get("#amount").sendKeys(100)
    cy.get("#date").sendKeys("2023-02-01")

    cy.contains("Add").click()
    
    cy.get("tbody tr").should("have.length", 1)
  });  

  it('Cadastrar uma nova transação de entrada - falha 3', () => {

    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)

    cy.get("#date").type("02/01/2023")

    cy.contains("Salvar").click()
    
//    cy.get("tbody tr").should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 4', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    cy.get("#amount").type(100)
    cy.get("#description").type("Mesada")
    cy.get("#date").type("2023-02-01")
    cy.contains("Nova Transação").click()
    cy.contains("Salvar").click()

    cy.get("tbody tr").should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 5', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    cy.contains("Nueva Transación").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()

    cy.get(".alert").should("not.exist") // esta asserção não faz sentido nenhuma, porque esse .alert não relação com a acção proncipal e nem existe na tela.
                                         // ESPEQUISAR SOBRE: AAA- ARRANGE, ACT e assert 
  });

  it.skip('Cadastrar uma nova transação de entrada - falha 6', () => { // O 'skip' IGNORA o teste. O teste não é executado quando tem o skip.
    cy.contains("Nova Transação").click()                              // Além disso, nesse teste não TEM O VISIT para acessar a aplicação.
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()

    cy.get("tbody tr").should("have.length", 100)
  });
}); 

