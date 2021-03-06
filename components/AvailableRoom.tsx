import React, { useState } from 'react'
// Components
import Image from 'next/image'
import { Icon } from '@iconify/react';
// Utils
import { formatNumber } from '../utils'
// Types
import type { AvailableRoom as Props } from '../props'
import type { PriceType } from '../types';

export default function AvailableRoom({ room, roomPrices, formik }: Props) {
    const { roomId, roomName, roomImage, roomDeposit, roomBeds, roomPassengers, roomTotalRooms, roomOccupiedRooms } = room;
    
    const availableRooms: number = roomTotalRooms - roomOccupiedRooms;
    const isAvailable: boolean = availableRooms > 5;
    const notAvailable: boolean = availableRooms === 0;

    const handleClick = (price: PriceType) => () => {
        formik.setFieldValue('selected', {
            ...formik.values.selected, [roomId]: {
                ...formik.values.selected[roomId],
                price: formik.values.selected[roomId].price?.priceId === price.priceId ? null : price,
            }
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        formik.setFieldValue('selected', {
            ...formik.values.selected, [roomId]: {
                ...formik.values.selected[roomId],
                rooms: parseInt(e.target.value)
            }
        });
    };

    return (
        <div className={`available-room ${notAvailable ? 'hidden' : ''}`}>
            <div className="image">
                <Image src={roomImage} alt={roomName} layout="fill" objectFit='cover' />
            </div>
            <div className="body">
                <h4>{roomName}</h4>
                <p className="info">Status:&nbsp; <span className={isAvailable ? 'green' : 'red'}>{isAvailable ? 'Available' : `Only ${formatNumber(availableRooms)} rooms left!`}</span></p>
                <p className="info">Deposit:&nbsp; <span>{roomDeposit > 0 ? `Required ${roomDeposit}%` : "Not required"}</span></p>
                <p className="info">Beds:&nbsp; <span>{formatNumber(roomBeds)}</span></p>
                <p className="info">Passengers:&nbsp; <span>{formatNumber(roomPassengers)}</span></p>
            </div>
            <div className="aside">
                {roomPrices.map((price, index) => (
                    <p
                        key={price.priceId}
                        className={formik.values.selected[roomId].price?.priceId === price.priceId ? 'price active' : 'price'}
                        onClick={handleClick(price)}
                    >
                        <Icon icon={`fontisto:checkbox-${formik.values.selected[roomId].price?.priceId === price.priceId ? 'active' : 'passive'}`} />
                        {index === 0 &&
                            <>Starting from&nbsp;<span>${price.roomPrice}</span>&nbsp;/&nbsp;<span>Night</span></>
                        }
                        {index === 1 &&
                            <>Includes breakfast&nbsp;<span>${price.roomPrice}</span>&nbsp;/&nbsp;<span>Night</span></>
                        }
                        {index === 2 &&
                            <>Includes dinner&nbsp;<span>${price.roomPrice}</span>&nbsp;/&nbsp;<span>Night</span></>
                        }
                    </p>
                ))}

                <div className="button-container">
                    <div>
                        <label htmlFor="rooms">Rooms</label>
                        <select
                            id="room-selected"
                            name="rooms"
                            value={formik.values.selected[roomId].rooms}
                            onChange={handleChange}
                        >
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                        </select>
                    </div>
                    <button className={formik.values.selected[roomId].price ? 'active' : ''}>
                        <Icon icon="teenyicons:tick-small-outline" color="#FFF" />
                        SELECTED
                    </button>
                </div>
            </div>
        </div>
    )
};