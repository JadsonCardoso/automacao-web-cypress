// modalPage.js
class ModalPage {
    get modal() { return cy.get('.modal'); }
    get form() { return cy.get('#form'); }
    get descriptionInput() { return cy.get('#description'); }
    get amountInput() { return cy.get('#amount'); }
    get dateInput() { return cy.get('#date'); }
    get cancelButton() { return cy.get('.button.cancel'); }
    get saveButton() { return cy.get('button'); }
    get helpMessage() { return cy.get('.help'); }

    openModal() {
        cy.get('#transaction > .button').click(); // Replace with actual selector to open modal
    }

    fillForm(description, amount, date) {
        this.descriptionInput.type(description);
        this.amountInput.type(amount);
        this.dateInput.type(date);
    }

    submitForm() {
        this.saveButton.click();
    }

    closeModal() {
        this.cancelButton.click();
    }
}

// Exporta uma instância da classe
module.exports = new ModalPage();
