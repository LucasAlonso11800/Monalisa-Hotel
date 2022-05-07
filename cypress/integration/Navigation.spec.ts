/// <reference types="cypress" />

beforeEach(() => {
    cy.visit(Cypress.env('URL'));
});

describe.only('Navbar', () => {
    it('Should navigate among pages', () => {
        // About
        cy.get('header.header > nav.nav > a[href="/about"]')
            .should('have.text', 'About Us')
        cy.get('header.header > nav.nav > a[href="/about"')
            .click({ force: true })
        cy.url().should('match', /\/about$/)
        cy.wait(1000)
        cy.get('header')
            .find('h1.title')
            .invoke('text')
            .should('eq', 'About UsThe best place to enjoy your life')

        // Rooms
        cy.get('header.header > nav.nav > a[href="/rooms"]')
            .should('have.text', 'Our Rooms')
        cy.get('header.header > nav.nav > a[href="/rooms"]')
            .click({ force: true })
        cy.url().should('match', /\/rooms$/)
        cy.wait(1000)
        cy.get('header')
            .find('h1.title')
            .invoke('text')
            .should('eq', 'Our Rooms')

        // Reservation
        cy.get('header.header > nav.nav > a[href="/reservation"]')
            .should('have.text', 'Reservation')
        cy.get('header.header > nav.nav > a[href="/reservation"]')
            .click({ force: true })
        cy.url().should('match', /\/reservation$/)
        cy.wait(1000)
        cy.get('header')
            .find('h1.title')
            .invoke('text')
            .should('eq', 'Reserve')

        // Home
        cy.get('header.header > nav.nav > a[href="/"]')
            .should('have.text', 'Home')
        cy.get('header.header > nav.nav > a[href="/"]')
            .click({ force: true })
        cy.url().should('match', /\/$/)
        cy.wait(1000)
        cy.get('header')
            .find('h1.title')
            .invoke('text')
            .should('eq', 'Welcome toMonalisa Hotel')
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