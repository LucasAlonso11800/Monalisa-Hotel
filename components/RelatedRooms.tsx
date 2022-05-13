import React from 'react';
import { useRouter } from 'next/router';
// Components
import Image from 'next/image';
// Utils
import { formatNumber, getImageURL, getOccupiedRoomsNumber, redirect } from '../utils';
// Types
import type { RelatedRooms as Props } from '../props';

export default function RelatedRooms({ rooms, occupiedRooms }: Props) {
    const router = useRouter();

    return (
        <section className="related-rooms">
            <div className="container">
                <h2 className="section-title">Related Rooms</h2>
                <div className="related-rooms">
                    {rooms.map(room => {
                        const { roomId, roomName, roomImage, roomDeposit, roomBeds, roomPassengers, roomMinimumPrice, roomTotalRooms } = room;
                        const availableRooms: number = roomTotalRooms - getOccupiedRoomsNumber(occupiedRooms, room);
                        const isAvailable: boolean = availableRooms > 5;
                        const notAvailable: boolean = availableRooms === 0;
                        
                        return (
                            <div className="related-room" key={roomId} onClick={redirect(`/rooms/${room.roomSlug}`, router)}>
                                <Image src={getImageURL(roomImage, 'rooms')} alt={roomName} width={600} height={400} objectFit='cover' />
                                <div className="body">
                                    <h4>{roomName}</h4>
                                    <p className="info">Status:&nbsp; <span className={isAvailable ? 'green' : 'red'}>{isAvailable ? 'Available' : notAvailable ? 'Currently no rooms available' : `Only ${formatNumber(availableRooms)} rooms left!`}</span></p>
                                    <p className="info">Deposit:&nbsp; <span>{roomDeposit > 0 ? `Required ${roomDeposit}%` : "Not required"}</span></p>
                                    <p className="info">Beds:&nbsp; <span>{formatNumber(roomBeds)}</span></p>
                                    <p className="info">Passengers:&nbsp; <span>{formatNumber(roomPassengers)}</span></p>
                                </div>
                                <div className="footer">
                                    <p>Details</p>
                                    <p className="price">
                                        Start from <span>${roomMinimumPrice.toFixed(2)}</span>&nbsp;/&nbsp;<span>Night</span>
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
};