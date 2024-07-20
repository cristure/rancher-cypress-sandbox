import global from '../fixtures/global.json'

describe('main page', () => {
  beforeEach(() => {
    cy.request({
      method:'POST',
      // overwrite the user-agent in order to skip ui login.
      headers: { 'user-agent': 'curl/8.8.0'},
      url: `${global.url}/v3-public/localProviders/local?action=login`,
      body: `{"description":"UI session","responseType":"cookie","username":"${global.username}","password":"${global.password}"}`}).then(
        (response) => {
          // response.body is automatically serialized into JSON
          expect(response.status).to.eq(200) // true
        }
    )

    cy.visit(global.url)
  })

  it('main page reached', () => {
    // assert title
    cy.title().should('eq', global.title)

    // assert logo is visible.
    cy.get(".simple-title", {timeout: 5000})
        .should("be.visible")

    // assert top level menu is visible.
    cy.get('[data-testid="top-level-menu"]')
        .should("be.visible")

    // assert user menu is visible.
    cy.get('[data-testid="nav_header_showUserMenu"]')
        .should("be.visible")

    // click on user menu.
    cy.get('[data-testid="nav_header_showUserMenu"]')
        .click()

    // assert session cookie exists.
    cy.getCookie("R_SESS").should("exist")
  })
})