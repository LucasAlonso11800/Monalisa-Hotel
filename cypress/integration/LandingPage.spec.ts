/// <reference types="cypress" />

beforeEach(() => {
    cy.visit(Cypress.env('URL'));
});

describe('Discover our rooms section renders properly', () => {
    const SECTION = 'section.discover-our-rooms';
    it('Should have a heading', () => {
        cy.get(SECTION)
            .find('h6')
            .should('exist')
            .should('have.class', 'section-heading')
            .should('have.text', 'Discover our rooms');
    });
    it('Should have a title', () => {
        cy.get(SECTION)
            .find('h2')
            .should('exist')
            .should('have.class', 'section-title')
            .should('have.text', 'Luxury Interior');
    });
    it('Should have an image', () => {
        cy.get(SECTION).children('span').should('exist');
    });
    it.only('Should display many rooms with their content', () => {
        cy.get(SECTION)
            .find('div.rooms')
            .find('div.room')
            .should('have.length.gte', 3)
            .each(room => {
                cy.wrap(room).within(() => {
                    cy.get('h4')
                        .should('exist')
                        .invoke('text')
                        .should('have.length.gt', 4)
                    cy.get('p')
                        .should('exist')
                        .invoke('text')
                        .should('have.length.gt', 4)
                    cy.get('span > span > img')
                        .should('exist')
                })
            })
    });
});

describe('Testimonials section renders properly', () => {
    const SECTION = 'section.testimonials';
    it('Should have a heading', () => {
        cy.get(SECTION)
            .find('h6')
            .should('exist')
            .should('have.class', 'section-heading')
            .should('have.text', 'Testimonial');
    });
    it('Should have a title', () => {
        cy.get(SECTION)
            .find('h2')
            .should('exist')
            .should('have.class', 'section-title')
            .should('have.text', 'What Clients Say');
    });
    it('Should have a testimonial', () => {
        cy.get(SECTION)
            .find('p.testimonial')
            .should('exist')
            .invoke('text')
            .should('have.length.gt', 2);
        cy.get(SECTION)
            .find('p.name')
            .should('exist')
            .invoke('text')
            .should('have.length.gt', 0);
    });
});