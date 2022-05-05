import React from 'react';
// Components
import {useRouter} from 'next/router'
import Image from 'next/image';
// Types
import { DiscoverOurRooms as Props } from '../props';

export default function DiscoverOurRooms({ rooms }: Props) {
    const router = useRouter();
    const redirect = (url: string) => () => router.push(url);
    return (
        <section className="discover-our-rooms">
            <div className="title-container">
                <h6 className="section-heading">Discover our rooms</h6>
                <h2 className="section-title">Luxury Interior</h2>
            </div>
            <div className="rooms">
                {rooms.map(room => (
                    <div className="room" key={room.roomId} onClick={redirect(`/rooms/${room.roomSlug}`)}>
                        <Image src={`/images/rooms/${room.roomImage}`} alt={room.roomName} width={140} height={100} objectFit='cover' />
                        <h4>{room.roomName}</h4>
                        <p>Starting from <span>${room.roomMinimumPrice.toFixed(2)}/Night</span></p>
                    </div>
                ))}
            </div>
            <Image src="/images/rooms/superior.webp" alt="classic" width={1200} height={800} objectFit='cover' />
        </section>
    )
};