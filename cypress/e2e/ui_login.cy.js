import global from '../fixtures/global.json'

describe('ui login', () => {
  beforeEach(() => {
    cy.visit('https://localhost')
  })

  it('login should work', () => {
    // fill in username.
    cy.get('[data-testid="local-login-username"]')
        .type(global.username);

    // fill in password.
    cy.get('[data-testid="local-login-password"]')
        .type(global.password)

    // click on submit button.
    cy.get('[data-testid="login-submit"]')
        .click()

    // assert redirect after login.
    cy.url().should('include', '/dashboard/home')

    // assert title.
    cy.title().should('eq', global.title)

    // assert logo is visible.
    cy.get(".simple-title", {timeout: 5000})
        .should("be.visible")

    // assert top level menu is visible.
    cy.get('[data-testid="top-level-menu"]')
        .should("be.visible")

    // assert session cookie exists.
    cy.getCookie("R_SESS").should("exist")
  })

  it('login shouldn\'t work', () => {
    // fill in wrong username.
    cy.get('[data-testid="local-login-username"]')
        .type("not_admin");

    // fil in wrong password.
    cy.get('[data-testid="local-login-password"]')
        .type("not_password")

    // click on submit button.
    cy.get('[data-testid="login-submit"]')
        .click()

    // assert banner content is visible.
    cy.get('[data-testid="banner-content"]')
        .should("be.visible")

    // assert banner content contains error message.
    cy.get('[data-testid="banner-content"]')
        .contains("Invalid username or password. Please try again.")

    // assert submit button shows Error.
    cy.get('[data-testid="login-submit"]')
        .contains("Error")

    // assert session cookie does not exists.
    cy.getCookie("R_SESS").should("not.exist")
  })

})