import React from 'react';
import axios from 'axios';
// Components
import { CheckAvailabilty, Header, Layout, Room } from '../../components';
// Const
import { APIEndpoints } from '../../const/APIEndpoints';
import { SERVER_URL } from '../../const/const';
// Types
import type { RoomsPage as Props } from '../../props';
import { getOccupiedRoomsNumber } from '../../utils';

export default function Rooms({ rooms, occupiedRooms }: Props) {
    return (
        <Layout id="rooms" title="Our Rooms">
            <Header image='/images/head-images/Rooms.jpg'>
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
                        occupiedRooms={getOccupiedRoomsNumber(occupiedRooms, room)}
                    />
                ))}
            </main>
        </Layout>
    )
};

export async function getStaticProps() {
    try {
        const [rooms, occupiedRooms] = await Promise.all([
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_ROOM_CATEGORIES}`, { roomCategoryId: null })).data,
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_OCCUPIED_ROOMS}`)).data,
        ]);
        return {
            props: { rooms, occupiedRooms },
            revalidate: 60
        }
    }
    catch {
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }
};