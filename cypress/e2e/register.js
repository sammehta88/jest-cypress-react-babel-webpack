import {userBuilder} from '../support/generate'

describe('registration', () => {
    it('should register a new user', () => {
        const user = userBuilder();
        cy.visit('/')
              .getByText(/register/i)
              .click()
              .getByLabelText(/username/i)
              .type(user.username)
              .getByLabelText(/password/i)
              .type(user.password)
              .getByText(/submit/i)
              .click()
              .assertHome()
              .assertLoggedInAs(user)
    })

    it.only(`should show an error message if there's an error`, () => {
        cy.server()
        cy.route({
            method: 'POST',
            url: 'http://localhost:3000/register',
            status: 500,
            response: {},
        })
        cy.visit('register')
          .getByText(/submit/i)
          .click()
          .getByText(/error.*try again/i)
    })
})
