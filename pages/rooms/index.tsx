import React from 'react';
import axios from 'axios';
// Components
import { CheckAvailabilty, Header, Layout, Room } from '../../components';
// Const
import { APIEndpoints } from '../../const/APIEndpoints';
import { SERVER_URL, TODAY } from '../../const/const';
import { HeadImages } from '../../const/Images';
// Types
import type { RoomsPage as Props } from '../../props';

export default function Rooms({ rooms }: Props) {
    return (
        <Layout id="rooms" title="Our Rooms">
            <Header image={HeadImages.ROOMS}>
                <h1 className="title">Our Rooms</h1>
                <p className="subtitle">Home {'>'} Rooms</p>
                <CheckAvailabilty />
            </Header>
            <main className="main">
                {rooms.map((room, index) => (
                    <Room
                        key={room.roomId}
                        room={room}
                        index={index}
                        direction={index % 2 === 0 ? 'reverse' : undefined}
                    />
                ))}
            </main>
        </Layout>
    )
};

export async function getStaticProps() {
    try {
        const rooms = await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_ROOM_CATEGORIES}`, { roomCategoryId: null, dateFrom: TODAY })).data;

        return {
            props: { rooms },
            revalidate: 60
        }
    }
    catch {
        return {
            props: { rooms: [] },
            revalidate: 1
        }
    }
};