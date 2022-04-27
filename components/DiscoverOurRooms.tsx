import React from 'react';
// Components
import Image from 'next/image';

export default function DiscoverOurRooms() {
    return (
        <section className="discover-our-rooms">
            <div className="title-container">
                <h6 className="section-heading">Discover Our Rooms</h6>
                <h2 className="section-title">Luxury Interior</h2>
            </div>
            <div className="rooms">
                <div className="room">
                    <Image src="/images/rooms/classic.jpg" alt="classic" width={140} height={100} objectFit='cover' />
                    <h4>Classic Room</h4>
                    <p>Starting from <span>$39.00/Night</span></p>
                </div>
                <div className="room">
                    <Image src="/images/rooms/grand-deluxe.jpg" alt="classic" width={140} height={100} objectFit='cover' />
                    <h4>Grand Deluxe Room</h4>
                    <p>Starting from <span>$49.00/Night</span></p>
                </div>
                <div className="room">
                    <Image src="/images/rooms/superior.webp" alt="classic" width={140} height={100} objectFit='cover' />
                    <h4>Superior Room</h4>
                    <p>Starting from <span>$59.00/Night</span></p>
                </div>
                <div className="room">
                    <Image src="/images/rooms/classic.jpg" alt="classic" width={140} height={100} objectFit='cover' />
                    <h4>Classic Room</h4>
                    <p>Starting from <span>$39.00/Night</span></p>
                </div>
                <div className="room">
                    <Image src="/images/rooms/classic.jpg" alt="classic" width={140} height={100} objectFit='cover' />
                    <h4>Classic Room</h4>
                    <p>Starting from <span>$39.00/Night</span></p>
                </div>
                <div className="room">
                    <Image src="/images/rooms/classic.jpg" alt="classic" width={140} height={100} objectFit='cover' />
                    <h4>Classic Room</h4>
                    <p>Starting from <span>$39.00/Night</span></p>
                </div>
            </div>
            <Image src="/images/rooms/superior.webp" alt="classic" width={1200} height={800} objectFit='cover' />
        </section>
    )
};