import global from '../fixtures/global.json'

describe('ui login', () => {
  beforeEach(() => {
    cy.visit('https://localhost')
  })

  it('login should work', () => {
    // fill in username.
    cy.get("#username")
        .type(global.username);

    // fill in password.
    cy.get(".suffix > input:nth-child(2)")
        .type(global.password)

    // click on submit button.
    cy.get("#submit")
        .click()

    // assert title
    cy.title().should('eq', global.title)

    // assert logo is visible
    cy.get("div.side-menu-logo:nth-child(1)", {timeout: 5000})
        .should("be.visible")
  })

  it('login shouldn\'t work', () => {
    cy.get("#username")
        .type("not_admin");

    cy.get(".suffix > input:nth-child(2)")
        .type("not_password")

    cy.get("#submit")
        .click()

    cy.get(".login-messages")
        .should("be.visible")

    cy.get(".login-messages")
        .contains("Invalid username or password. Please try again.")

    cy.get("#submit")
        .contains("Error")
  })

})