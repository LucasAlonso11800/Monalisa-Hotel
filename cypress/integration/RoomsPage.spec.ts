/// <reference types="cypress" />
import type { RoomsPage } from '../../props';

describe('Rooms page renders server data', () => {
    it('Should display many rooms with their contents', () => {
        cy.visit(`${Cypress.env('URL')}/rooms`)
            .its('__NEXT_DATA__.props.pageProps')
            .then((props: RoomsPage) => {
                expect(props).to.haveOwnProperty('rooms');
                expect(props).to.haveOwnProperty('occupiedRooms');
                expect(props.rooms).length.to.be.greaterThan(0);

                props.rooms.forEach((room) => {
                    expect(room).to.haveOwnProperty('roomId');
                    expect(room).to.haveOwnProperty('roomName');
                    expect(room).to.haveOwnProperty('roomSlug');
                    expect(room).to.haveOwnProperty('roomMinimumPrice');
                    expect(room).to.haveOwnProperty('roomImage');
                    expect(room).to.haveOwnProperty('roomDescription');
                    expect(room).to.haveOwnProperty('roomTotalRooms');
                    expect(room).to.haveOwnProperty('roomBeds');
                    expect(room).to.haveOwnProperty('roomPassengers');
                    expect(room).to.haveOwnProperty('roomDeposit');
                });

                props.occupiedRooms.forEach((occupiedRoom) => {
                    expect(occupiedRoom).to.haveOwnProperty('roomId');
                    expect(occupiedRoom).to.haveOwnProperty('roomName');
                    expect(occupiedRoom).to.haveOwnProperty('roomOccupiedRooms');
                });

                cy.get('div.room')
                    .should('have.length', props.rooms.length)
                    .each((room, index) => {
                        cy.wrap(room).within(() => {
                            cy.get('h2.section-title')
                                .should('exist')
                                .invoke('text')
                                .should('eq', props.rooms[index].roomName);
                            cy.get('p.price')
                                .should('exist')
                                .invoke('text')
                                .should('contain', props.rooms[index].roomMinimumPrice.toFixed(2));
                            cy.get('p.description')
                                .should('exist')
                                .invoke('text')
                                .should('eq', props.rooms[index].roomDescription);
                            cy.get('span > span > img')
                                .should('exist');
                            cy.get('a')
                                .should('exist')
                                .should('have.attr', 'href', `/rooms/${props.rooms[index].roomSlug}`)
                                .invoke('text')
                                .should('contain', 'View detail');
                        });
                    });
            });
    });
}); 