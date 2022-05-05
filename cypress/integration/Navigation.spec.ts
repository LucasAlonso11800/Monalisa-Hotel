/// <reference types="cypress" />

beforeEach(() => {
    cy.visit(Cypress.env('URL'));
});

describe('Navbar', () => {
    it('Should navigate among pages', () => {
        // About
        cy.get('header.header > nav.nav > a[href="/about"]')
            .should('have.text', 'About Us')
        cy.get('header.header > nav.nav > a[href="/about"')
            .click({ force: true })
        cy.url().should('match', /\/about$/)

        // Rooms
        cy.get('header.header > nav.nav > a[href="/rooms"]')
            .should('have.text', 'Our Rooms')
        cy.get('header.header > nav.nav > a[href="/rooms"]')
            .click({ force: true })
        cy.url().should('match', /\/rooms$/)

        // Reservation
        cy.get('header.header > nav.nav > a[href="/reservation"]')
            .should('have.text', 'Reservation')
        cy.get('header.header > nav.nav > a[href="/reservation"]')
            .click({ force: true })
        cy.url().should('match', /\/reservation$/)

        // Home
        cy.get('header.header > nav.nav > a[href="/"]')
            .should('have.text', 'Home')
        cy.get('header.header > nav.nav > a[href="/"]')
            .click({ force: true })
        cy.url().should('match', /\/$/)
    });
});

describe('Room list on landing page', () => {
    it('Should navigate to each room page', () => {
        cy.get('section.discover-our-rooms')
            .find('div.rooms')
            .find('div.room')
            .eq(0)
            .click()
        cy.url().should('match', /\/rooms\/.*(?<!\/)$/);
    });
});