const { faker } = require('@faker-js/faker');
const name = faker.name.fullName();
const company = faker.company.catchPhraseAdjective();
const email = faker.internet.email();
const phone = faker.phone.number();
const address = faker.address.streetName();
const city = faker.address.cityName();
const exist_firstname = '';
const empty = '';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe('Test Case Dashboard', () => {
    beforeEach(() => {
        cy.login('Rylan85','1234567890')
        cy.dashboard('Rylan85')
    });

    it('Should be success create new data', () => {
        cy.access_create_customer()
        cy.get('#Name').type(name)
        cy.get('#Company').type(company)
        cy.get('#Address').type(address)
        cy.get('#City').type(city)
        cy.get('#Phone').type(phone)
        cy.get('#Email').type(email)
        cy.get('.col-md-offset-2 > .btn').should('have.value','Create').click()
        cy.url().should('include','/Dashboard')
    });

    it.skip('Should be success back to dashboard', () => {
        cy.access_create_customer()
        cy.get(':nth-child(3) > .btn').should('have.text','Back to List').click()
        cy.url().should('include','/Dashboard')
    });

    it.skip('Should be success search by name', () => {
        cy.search_customer(name,'name')
    });

    it.skip('Should be success search by email', () => {
        cy.search_customer(email,'email')
    });

    it('Should be access detail data', () => {
        cy.search_customer(name,'name')
        cy.get('tbody > :nth-child(2) > :nth-child(7) > .btn-outline-info').contains('Detail').click()
        const data = {
            'name' : name,
            'company' : company,
            'address' : address,
            'city' : city,
            'phone' : phone,
            'email' : email
        }
        cy.access_detail_customer(data)
    })
});

