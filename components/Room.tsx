import React from 'react';
// Components
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
// Utils
import { formatNumber } from '../utils';
// Types
import type { Room as Props } from '../props'

export default function Room({ room, index, direction, occupiedRooms }: Props) {
    const { roomImage, roomMinimumPrice, roomDescription, roomName, roomSlug, roomTotalRooms, roomDeposit, roomPassengers, roomBeds } = room;
    
    const availableRooms: number = roomTotalRooms - occupiedRooms
    const isAvailable: boolean = availableRooms > 5;

    return (
        <div className={"room " + direction}>
            <Image src={`/images/rooms/${roomImage}`} alt={roomName} width={800} height={650} objectFit='cover' />
            <div className="column">
                <h2 className="section-title">{roomName}</h2>
                <p className="price">
                    Start from <span>${roomMinimumPrice.toFixed(2)}</span>&nbsp;/&nbsp;<span>Night</span>
                </p>
                <p className="description">{roomDescription}</p>
                <p className="info">Status:&nbsp; <span className={isAvailable ? 'green' : 'red'}>{isAvailable ? 'Available' : `Only ${formatNumber(availableRooms)} rooms left!`}</span></p>
                <p className="info">Deposit:&nbsp; <span>{roomDeposit > 0 ? `Required ${roomDeposit}%` : "No required"}</span></p>
                <p className="info">Beds:&nbsp; <span>{formatNumber(roomBeds)}</span></p>
                <p className="info">Passengers:&nbsp; <span>{formatNumber(roomPassengers)}</span></p>
                <Link href={`/rooms/${roomSlug}`}><a>View detail &nbsp;&nbsp; <Icon icon="akar-icons:arrow-right" color="#211f20"/></a></Link>
            </div>
            <div className={"side-text " + direction}>
                <h6 className='section-heading'>{roomName}</h6>
                <span>{formatNumber(index + 1)}</span>
            </div>
        </div>
    )
};