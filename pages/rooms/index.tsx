import React from 'react';
import axios from 'axios';
// Components
import { CheckAvailabilty, Header, Layout, Room } from '../../components';
// Const
import { APIEndpoints } from '../../const/APIEndpoints';
import { SERVER_URL, TODAY } from '../../const/const';
import { PageNames } from '../../const/PageNames';
// Utils
import { getOccupiedRoomsNumber } from '../../utils';
// Types
import type { RoomsPage as Props } from '../../props';

export default function Rooms({ rooms, occupiedRooms, image, error }: Props) {
    console.log(error)
    return (
        <Layout id="rooms" title="Our Rooms">
            <Header image={image.pageImageURL || "https://firebasestorage.googleapis.com/v0/b/monalisa-5d346.appspot.com/o/head-images%2FRooms.jpg?alt=media&token=68c3ed31-5a94-43e3-a518-a2ae07455dc0"}>
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
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_OCCUPIED_ROOMS}`, { dateFrom: TODAY })).data,
            // await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_PAGE_IMAGE}`, { page: PageNames.ROOMS })).data
        ]);
        return {
            props: { rooms, occupiedRooms, image: {} },
            revalidate: 60
        }
    }
    catch (error){
        console.log(error)
        return {
            props: { rooms: [], occupiedRooms: [], image: {}, error: JSON.parse(JSON.stringify(error)) },
        }
    }
};