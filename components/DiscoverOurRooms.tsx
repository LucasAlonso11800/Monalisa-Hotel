import React from 'react';
import {useRouter} from 'next/router'
// Components
import Image from 'next/image';
// Utils
import { redirect } from '../utils';
// Types
import { DiscoverOurRooms as Props } from '../props';

export default function DiscoverOurRooms({ rooms }: Props) {
    const router = useRouter();

    return (
        <section className="discover-our-rooms">
            <div className="title-container">
                <h6 className="section-heading">Discover our rooms</h6>
                <h2 className="section-title">Luxury Interior</h2>
            </div>
            <div className="rooms">
                {rooms.map(room => {
                    const {roomId, roomSlug, roomImage, roomName, roomMinimumPrice} = room;
                    return (
                        <div className="room" key={roomId} onClick={redirect(`/rooms/${roomSlug}`, router)}>
                            <Image src={roomImage} alt={roomName} width={140} height={100} objectFit='cover' />
                            <h4>{roomName}</h4>
                            <p>Starting from <span>${roomMinimumPrice.toFixed(2)}/Night</span></p>
                        </div>
                    )})
                } 
            </div>
            <Image src="https://firebasestorage.googleapis.com/v0/b/monalisa-5d346.appspot.com/o/rooms%2Fsuperior.webp?alt=media&token=900137a9-a773-4a7a-ac2b-4077aeaafc56" alt="classic" width={1200} height={800} objectFit='cover' />
        </section>
    )
};