describe('Drag And drop', () => {
    it('Multiple Windows', () => {
        cy.visit('https://the-internet.herokuapp.com/windows')

        cy.contains('Click Here')
            .invoke('removeAttr', 'target')// invoque serve para interagir com elementos do navegador: Estou usando a função: removeAttr para remover o atributo: target
                .click()
        
            cy.get('h3').should('have.text', 'New Window') // Validando se estou na aba que cliquei
        
            cy.go('back') // Voltando para página Anterior
            cy.get('a[href="/windows/new"]').should('have.text', 'Click Here') // Validando se estou de volta a página inicial
    })

     it('Drag and Drop', () => {
        cy.visit('https://the-internet.herokuapp.com/drag_and_drop')

        const dataTransfer = new DataTransfer() // Variável criada para instancicar a DataTransfer(), o DataTransfer() é responsável para armazenar o elmento enquanto a gente faz a ação de arrastar.

        cy.contains('A').trigger('dragstart', {dataTransfer}) // Ação para arrastar
        cy.contains('B').trigger('drop', {dataTransfer}) // Ação para soltar
    })
})