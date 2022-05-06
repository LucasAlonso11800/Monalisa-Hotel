import React from 'react'
// Components
import Image from 'next/image'
// Utils
import { formatNumber } from '../utils';
// Types
import type { SingleRoomIntro as Props } from '../props';

export default function SingleRoomIntro({ room }: Props) {
    const { roomImage, roomPassengers, roomMinimumPrice } = room;

    return (
        <section className="single-room-intro">
            <div className="container">
                <Image src={`/images/rooms/${roomImage}`} width={1420} height={700} objectFit="cover" />
                <p className="price">
                    Start from&nbsp;<span>${roomMinimumPrice.toFixed(2)}</span>&nbsp;/&nbsp;<span>Night</span>
                </p>
                <p className="info">Passengers:&nbsp; <span>{formatNumber(roomPassengers)}</span></p>
            </div>
        </section>
    )
}
