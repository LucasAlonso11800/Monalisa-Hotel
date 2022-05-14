/// <reference types="cypress" />

import { APIEndpoints } from '../../const/APIEndpoints';
import { TODAY, NEXT_WEEK, SERVER_URL } from '../../const/const';
import { formatNumber, getOccupiedRoomsNumber } from '../../utils';
import type { ReservationPage } from "../../props";
import moment from 'moment';

describe('Reservation page', () => {
    it('Navigates to url with params', () => {
        cy.visit(`${Cypress.env('URL')}`)

        cy.get('form.check-availability')
            .find('button[type="submit"]')
            .click();

        cy.url().should('match', /\/reservation\?from=\d{4}-\d{2}-\d{2}&to=\d{4}-\d{2}-\d{2}&guests=\d/)
    });

    it('Renders available rooms', () => {
        cy.visit(`${Cypress.env('URL')}/reservation`);
        cy.window()
            .its('__NEXT_DATA__.props.pageProps')
            .then((props: ReservationPage) => {
                expect(props).to.haveOwnProperty('rooms');
                expect(props).to.haveOwnProperty('occupiedRooms');
                expect(props).to.haveOwnProperty('roomPrices');
                expect(props).to.haveOwnProperty('dateFrom');
                expect(props).to.haveOwnProperty('dateTo');
                expect(props).to.haveOwnProperty('guests');

                props.roomPrices.forEach((price) => {
                    expect(price).to.haveOwnProperty('priceId');
                    expect(price).to.haveOwnProperty('priceName');
                    expect(price).to.haveOwnProperty('roomId');
                    expect(price).to.haveOwnProperty('roomName');
                    expect(price).to.haveOwnProperty('roomPassengers');
                    expect(price).to.haveOwnProperty('roomPrice');
                });

                expect(props.dateFrom).equal(TODAY);
                expect(props.dateTo).equal(NEXT_WEEK);
                expect(props.guests).equal(2);

                cy.get('div.available-room').its('length').then(length => {
                    cy.get('div.available-room')
                        .each((room, index) => {
                            cy.wrap(room).within(() => {
                                const availableRooms = props.rooms[index].roomTotalRooms - getOccupiedRoomsNumber(props.occupiedRooms, props.rooms[index]);
                                expect(room).to.have.css('display', availableRooms === 0 ? 'none' : 'grid');

                                cy.get('div.aside')
                                    .find('p.price')
                                    .should('have.length', props.roomPrices.length / length)

                                cy.get('h4')
                                    .should('exist')
                                    .invoke('text')
                                    .should('eq', props.rooms[index].roomName)

                                cy.get('p.info')
                                    .should('have.length', 4);


                                cy.get('p.info')
                                    .eq(0)
                                    .invoke('text')
                                    .should('contain', availableRooms > 5 ? 'Available' : `Only ${formatNumber(availableRooms)} rooms left!`);

                                cy.get('p.info')
                                    .eq(1)
                                    .invoke('text')
                                    .should('contain', props.rooms[index].roomDeposit === 0 ? 'Not required' : `Required ${props.rooms[index].roomDeposit}%`);

                                cy.get('p.info')
                                    .eq(2)
                                    .invoke('text')
                                    .should('contain', formatNumber(props.rooms[index].roomBeds));
                                cy.get('p.info')
                                    .eq(3)
                                    .invoke('text')
                                    .should('contain', formatNumber(props.rooms[index].roomPassengers));
                            })
                        })
                })
            });
    });

    it('Fetches rooms with check availability button', () => {
        cy.visit(`${Cypress.env('URL')}/reservation`);
        cy.intercept('POST', `${SERVER_URL}/${APIEndpoints.GET_OCCUPIED_ROOMS}`).as('getOccupiedRooms');

        // Select check in date
        cy.get('div[data-test-id="check-in"]')
            .find('svg')
            .click()

        cy.get('div[data-test-id="check-in"]')
            .find('button.react-datepicker__navigation--next')
            .click();

        cy.get('div[data-test-id="check-in"]')
            .find('div.react-datepicker__day--001')
            .first()
            .click();

        // Select check out date
        cy.get('div[data-test-id="check-out"]')
            .find('svg')
            .click()

        cy.get('div[data-test-id="check-out"]')
            .find('button.react-datepicker__navigation--next')
            .click();

        cy.get('div[data-test-id="check-out"]')
            .find('div.react-datepicker__day--008')
            .click();

        cy.get('form.check-availability')
            .find('button[type="submit"]')
            .click();

        cy.wait('@getOccupiedRooms').then(interception => {
            const dateFrom = moment(new Date()).add(1, 'month').set('date', 1).format('YYYY-MM-DD');

            expect(interception.request.body).to.haveOwnProperty('dateFrom');
            expect(interception.request.body.dateFrom).to.eq(dateFrom);
        });
    });

    it("Overview and confirm don't show until a room is selected", () => {
        cy.visit(`${Cypress.env('URL')}/reservation`);
        cy.get('section.booking-overview').should('not.exist');
        cy.get('section.confirm-reservation').should('not.exist');

        cy.get('div.available-room')
            .first()
            .find('p.price')
            .first()
            .find('svg')
            .click()

        cy.get('section.booking-overview').should('exist');
        cy.get('section.confirm-reservation').should('exist');
    });

    it('Validates empty form', () => {
        cy.visit(`${Cypress.env('URL')}/reservation`);

        cy.get('div.available-room')
            .first()
            .find('p.price')
            .first()
            .find('svg')
            .click()

        cy.get('section.confirm-reservation')
            .find('button')
            .click()

        cy.get('span.error')
            .its('length')
            .should('eq', 6)
    });

    it('Validates inputs too long', () => {
        cy.visit(`${Cypress.env('URL')}/reservation`);

        cy.get('div.available-room')
            .first()
            .find('p.price')
            .first()
            .find('svg')
            .click()

        cy.get('section.confirm-reservation')
            .find('input[name="first_name"]')
            .type('012345678911234567892123456789312345678941')
        cy.get('section.confirm-reservation')
            .find('input[name="last_name"]')
            .type('012345678911234567892123456789312345678941')

        cy.get('section.confirm-reservation')
            .find('input[name="email"]')
            .type('someeemai012345678911234567892123456789312345678941012345678911234567892123456789312345678941012345678911234567892123456789312345678941@gmail.com')
        cy.get('section.confirm-reservation')
            .find('input[name="phone"]')
            .type('1122334455')
        cy.get('section.confirm-reservation')
            .find('input[name="country"]')
            .type('012345678911234567892123456789312345678941')
        cy.get('section.confirm-reservation')
            .find('input[name="zip"]')
            .type('012345678911234567892123456789312345678941')

        cy.get('section.confirm-reservation')
            .find('button')
            .click()

        cy.get('span.error')
            .its('length')
            .should('eq', 5)

        cy.get('span.error')
            .each(error => {
                expect(error.text()).to.contain('Maximum length is')
            })
    });

    it('Shows error on failed reserve', () => {
        const message = "10 passengers don't fit on the selected rooms. Maximum is 2";
        cy.visit(`${Cypress.env('URL')}/reservation`);
        cy.intercept('POST', `${SERVER_URL}/${APIEndpoints.ADD_ROOM_RESERVE}`, {
            body: { code: 0, message }
        }).as('addRoomReserve');

        cy.get('div.available-room')
            .first()
            .find('p.price')
            .first()
            .find('svg')
            .click()

        cy.get('section.confirm-reservation')
            .find('input[name="first_name"]')
            .type('First name')
        cy.get('section.confirm-reservation')
            .find('input[name="last_name"]')
            .type('Last name')

        cy.get('section.confirm-reservation')
            .find('input[name="email"]')
            .type('someemail@gmail.com')
        cy.get('section.confirm-reservation')
            .find('input[name="phone"]')
            .type('1122334455')
        cy.get('section.confirm-reservation')
            .find('input[name="country"]')
            .type('Argentina')
        cy.get('section.confirm-reservation')
            .find('input[name="zip"]')
            .type('2022')

        cy.get('section.confirm-reservation')
            .find('button')
            .click()

        cy.wait('@addRoomReserve');

        cy.get('div.bottom')
            .find('p')
            .should('exist')
            .should('have.text', message);
    });

    it('Redirects to success page', () => {
        cy.visit(`${Cypress.env('URL')}/reservation`);
        cy.intercept('POST', `${SERVER_URL}/${APIEndpoints.ADD_ROOM_RESERVE}`, {
            body: { code: 1, message: 1 }
        }).as('addRoomReserve');

        cy.get('div.available-room')
            .first()
            .find('p.price')
            .first()
            .find('svg')
            .click()

        cy.get('section.confirm-reservation')
            .find('input[name="first_name"]')
            .type('First name')
        cy.get('section.confirm-reservation')
            .find('input[name="last_name"]')
            .type('Last name')

        cy.get('section.confirm-reservation')
            .find('input[name="email"]')
            .type('someemail@gmail.com')
        cy.get('section.confirm-reservation')
            .find('input[name="phone"]')
            .type('1122334455')
        cy.get('section.confirm-reservation')
            .find('input[name="country"]')
            .type('Argentina')
        cy.get('section.confirm-reservation')
            .find('input[name="zip"]')
            .type('2022')

        cy.get('section.confirm-reservation')
            .find('button')
            .click()

        cy.wait('@addRoomReserve');
        cy.wait(1000);
        cy.url().should('match', /\/reserve-success\?id=\d/)
    });
});
