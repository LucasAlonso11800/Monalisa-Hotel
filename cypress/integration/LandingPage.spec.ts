/// <reference types="cypress" />
import type { RoomType, TestimonialType } from '../../types';

describe('Discover our rooms section renders static content', () => {
    const SECTION = 'section.discover-our-rooms';

    beforeEach(() => {
        cy.visit(Cypress.env('URL'));
    });

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
});

describe('Discover our rooms section renders server data', () => {
    const SECTION = 'section.discover-our-rooms';

    it('Should display many rooms with their content', () => {
        cy.visit(Cypress.env('URL'))
            .its('__NEXT_DATA__.props.pageProps')
            .then((props: { rooms: RoomType[] }) => {
                expect(props).to.haveOwnProperty('rooms');
                expect(props.rooms).length.to.be.greaterThan(0);
                
                props.rooms.forEach(room => {
                    expect(room).to.haveOwnProperty('roomId')
                    expect(room).to.haveOwnProperty('roomName')
                    expect(room).to.haveOwnProperty('roomMinimumPrice')
                    expect(room).to.haveOwnProperty('roomImage')
                    expect(room).to.haveOwnProperty('roomSlug')
                });

                cy.get(SECTION)
                    .find('div.rooms')
                    .find('div.room')
                    .should('have.length', props.rooms.length)
                    .each((room, index) => {
                        cy.wrap(room).within(() => {
                            cy.get('h4')
                                .should('exist')
                                .invoke('text')
                                .should('eq', props.rooms[index].roomName)
                            cy.get('p')
                                .should('exist')
                                .invoke('text')
                                .should('eq', `Starting from $${props.rooms[index].roomMinimumPrice.toFixed(2)}/Night`)
                            cy.get('span > span > img')
                                .should('exist')
                        })
                    })
            })
    });
});

describe('Testimonials section renders static content', () => {
    const SECTION = 'section.testimonials';

    beforeEach(() => {
        cy.visit(Cypress.env('URL'));
    });

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
});

describe('Testimonials section renders server data', () => {
    const SECTION = 'section.testimonials';

    it('Should display a testimonial and ten seconds later show the next one', () => {
        cy.visit(Cypress.env('URL'))
            .its('__NEXT_DATA__.props.pageProps')
            .then((props: { testimonials: TestimonialType[] }) => {
                expect(props).to.haveOwnProperty('testimonials');
                expect(props.testimonials).length.to.be.greaterThan(0);

                props.testimonials.forEach(testimonial => {
                    expect(testimonial).to.haveOwnProperty('testimonialId')
                    expect(testimonial).to.haveOwnProperty('testimonialText')
                    expect(testimonial).to.haveOwnProperty('testimonialName')
                    expect(testimonial).to.haveOwnProperty('testimonialRating')
                });
                cy.get(SECTION)
                    .find('p.testimonial')
                    .should('exist')
                    .invoke('text')
                    .should('eq', `"${props.testimonials[0].testimonialText}"`);
                cy.get(SECTION)
                    .find('p.name')
                    .should('exist')
                    .invoke('text')
                    .should('eq', props.testimonials[0].testimonialName);

                cy.wait(10000);

                cy.get(SECTION)
                    .find('p.testimonial')
                    .should('exist')
                    .invoke('text')
                    .should('eq', `"${props.testimonials[1].testimonialText}"`);
                cy.get(SECTION)
                    .find('p.name')
                    .should('exist')
                    .invoke('text')
                    .should('eq', props.testimonials[1].testimonialName);
            });
    });
});