/// <reference types="cypress" />
import { SingleRoomPage } from '../../props';
import { formatNumber } from '../../utils';

beforeEach(() => {
    cy.visit(`${Cypress.env('URL')}/rooms/classic`)
});

describe('Single room page renders server data', () => {
    it('Should have correct server side props', () => {
        cy.window()
            .its('__NEXT_DATA__.props.pageProps')
            .then((props: SingleRoomPage) => {
                expect(props).to.haveOwnProperty('room');
                expect(props).to.haveOwnProperty('occupiedRooms');
                expect(props).to.haveOwnProperty('amenities');
                expect(props).to.haveOwnProperty('relatedRooms');

                expect(props.room).to.haveOwnProperty('roomId');
                expect(props.room).to.haveOwnProperty('roomName');
                expect(props.room).to.haveOwnProperty('roomSlug');
                expect(props.room).to.haveOwnProperty('roomMinimumPrice');
                expect(props.room).to.haveOwnProperty('roomImage');
                expect(props.room).to.haveOwnProperty('roomDescription');
                expect(props.room).to.haveOwnProperty('roomTotalRooms');
                expect(props.room).to.haveOwnProperty('roomBeds');
                expect(props.room).to.haveOwnProperty('roomPassengers');
                expect(props.room).to.haveOwnProperty('roomDeposit');

                expect(props.amenities.length).to.be.eq(24);
                props.amenities.forEach((amenity) => {
                    expect(amenity).to.haveOwnProperty('roomId');
                    expect(amenity).to.haveOwnProperty('roomName');
                    expect(amenity).to.haveOwnProperty('amenitiId');
                    expect(amenity).to.haveOwnProperty('amenitiName');
                    expect(amenity).to.haveOwnProperty('amenitiStatus');
                })

                expect(props.relatedRooms.length).to.be.eq(3);
                props.relatedRooms.forEach((room) => {
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

                props.occupiedRooms.forEach((room) => {
                    expect(room).to.haveOwnProperty('roomId');
                    expect(room).to.haveOwnProperty('roomName');
                    expect(room).to.haveOwnProperty('roomOccupiedRooms');
                })
            });
    });

    it('Should display room data', () => {
        cy.window()
            .its('__NEXT_DATA__.props.pageProps')
            .then((props: SingleRoomPage) => {
                cy.get('h1.title')
                    .should('exist')
                    .should('have.text', props.room.roomName);
                cy.get('p.subtitle')
                    .should('exist')
                    .should('have.text', `Home > Rooms > ${props.room.roomName}`)

                cy.get('section.single-room-intro')
                    .find('p.price')
                    .invoke('text')
                    .should('contain', props.room.roomMinimumPrice.toFixed(2));

                cy.get('section.single-room-intro')
                    .find('p.info')
                    .invoke('text')
                    .should('contain', formatNumber(props.room.roomPassengers));

                // cy.get('section.single-room-info')
                //     .find('p.description')
                //     .invoke('text')
                //     .should('eq', props.room.roomDescription);

                cy.get('section.single-room-info')
                    .find('p.ameniti')
                    .each((ameniti, index) => {
                        cy.wrap(ameniti).within(() => {
                            expect(ameniti.text()).to.eq(props.amenities[index].amenitiName);
                            cy.get('svg')
                                .should('have.class', props.amenities[index].amenitiStatus === 'Y' ? 'green' : 'gray')
                        })
                    })

                cy.get('section.related-rooms')
                    .find('div.related-room')
                    .should('have.length', props.relatedRooms.length);

                cy.get('section.related-rooms')
                    .find('div.related-room')
                    .each((room, index) => {
                        cy.wrap(room).within(() => {
                            cy.get('div.body > h4')
                                .should('have.text', props.relatedRooms[index].roomName);
                            cy.get('div.body > p.info').should('have.length', 4);
                            cy.get('div.footer > p.price').should('contain', props.relatedRooms[index].roomMinimumPrice.toFixed(2))
                        });
                    })
            });
    });
});