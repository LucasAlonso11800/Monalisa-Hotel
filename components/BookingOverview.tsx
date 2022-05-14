import React from 'react';
import moment from 'moment';
// Components
import Image from 'next/image';
// Utils
import { formatNumber, getImageURL } from '../utils';
// Types
import type { BookingOverview as Props } from '../props';

export default function BookingOverview({ selectedRooms, total, dateFrom, dateTo }: Props) {
    const nights: number = moment(dateTo).diff(moment(dateFrom), 'days');
    return (
        <section className="booking-overview">
            <h2 className="section-title">Your booking overview</h2>
            <div className="container">
                <h4>{moment(dateFrom).format('DD/MM/YYYY')} - {moment(dateTo).format('DD/MM/YYYY')} - {nights} {nights > 1 ? 'Nights' : 'Night'}</h4>
                {selectedRooms.map(({ room, values }) => (
                    <div className="booked-room" key={room.roomId}>
                        <div className="image">
                            <Image src={getImageURL(room.roomImage, 'rooms')} alt={room.roomName} layout="fill" objectFit='cover' />
                        </div>
                        <div className="body">
                            <h4>{room.roomName}</h4>
                            <p className="info">Includes:&nbsp; <span>{values.price.priceName === 'Basic' ? 'Standard' : values.price.priceName === 'Breakfast' ? 'Includes breakfast' : 'Includes breakfast and dinner'}</span></p>
                            <p className="info">Deposit:&nbsp; <span>{room.roomDeposit > 0 ? `Required ${room.roomDeposit}%` : "Not required"}</span></p>
                            <p className="info">Beds:&nbsp; <span>{formatNumber(room.roomBeds)}</span></p>
                            <p className="info">Passengers:&nbsp; <span>{formatNumber(room.roomPassengers)}</span></p>
                            <p className="info">Rooms:&nbsp; <span>{formatNumber(values.rooms)}</span></p>
                        </div>
                        <div className="aside">
                            <p>Price</p>
                            <h4>${values.price.roomPrice * values.rooms}</h4>
                        </div>
                    </div>
                ))}
                <div className="totals">
                    <p>Total price</p>
                    <h4>${total}</h4>
                </div>
            </div>
        </section>
    )
};