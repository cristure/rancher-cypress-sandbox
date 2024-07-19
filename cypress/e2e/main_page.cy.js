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

    // assert logo is visible
    cy.get("div.side-menu-logo:nth-child(1)", {timeout: 60000})
        .should("be.visible")
  })
})