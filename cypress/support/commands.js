import { userBuilder } from '../support/generate'

Cypress.Commands.add('createUser', overrides => {
    const user = userBuilder(overrides);
    cy.request({
        url: 'http://localhost:3000/login',
        method: 'POST',
        body: user,
    }).then(response => response.body.user)
})

Cypress.Commands.add('assertHome', () => {
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
})

Cypress.Commands.add('assertLoggedInAs', user => {
  cy.window()
    .its('localStorage.token')
    .should('be.a', 'string')
    .getByTestId('username-display')
    .should('have.text', user.username)
});

Cypress.Commands.add('login', user => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/login',
        body: user
    }).then(({body}) => {
        window.localStorage.setItem('token', body.user.token)
        return body.user
    })
});

Cypress.Commands.add('loginAsNewUser', () => {
    cy.createUser().then(user => {
        cy.login(user);
    })
})
