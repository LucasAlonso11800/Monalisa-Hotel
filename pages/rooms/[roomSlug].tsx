import React from 'react';
import axios from 'axios';
// Components
import { Layout, Header, CheckAvailabilty, SingleRoomIntro, SingleRoomInfo, RelatedRooms } from '../../components';
// Utils
import { getRelatedRoomsIndex } from '../../utils';
// Const
import { APIEndpoints } from '../../const/APIEndpoints';
import { SERVER_URL, TODAY } from '../../const/const';
// Types
import type { GetStaticPropsContext } from 'next';
import type { AmenitiType, RoomType } from '../../types';
import type { SingleRoomPage as Props } from '../../props';

export default function SingleRoomPage({ room, amenities, relatedRooms }: Props) {
    const { roomName, roomImage, roomDescription } = room;

    return (
        <Layout id="single-room-page" title={roomName}>
            <Header image={roomImage}>
                <h1 className="title">{roomName}</h1>
                <p className="subtitle">Home {'>'} Rooms {'>'} {roomName}</p>
                <CheckAvailabilty />
            </Header>
            <main className="main">
                <SingleRoomIntro room={room} />
                <SingleRoomInfo description={roomDescription} amenities={amenities} />
                <RelatedRooms rooms={relatedRooms} />
            </main>
        </Layout>
    )
};

export async function getStaticPaths() {
    const rooms: RoomType[] = await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_ROOM_CATEGORIES}`, { roomCategoryId: null, dateFrom: TODAY })).data;
    return {
        paths: rooms.map(room => ({ params: { roomSlug: room.roomSlug } })),
        fallback: false
    }
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
    try {
        const rooms: RoomType[] = await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_ROOM_CATEGORIES}`, { roomCategoryId: null, dateFrom: TODAY })).data;

        const room = rooms.find(r => r.roomSlug === params?.roomSlug);
        const roomIndex = rooms.findIndex(r => r.roomSlug === room?.roomSlug);
        const randomNumbers = getRelatedRoomsIndex(roomIndex, rooms.length);

        const amenities: AmenitiType[] = await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_ROOM_AMENITIES}`, { roomCategoryId: room?.roomId })).data

        return {
            props: {
                room,
                amenities,
                relatedRooms: [rooms[randomNumbers[0]], rooms[randomNumbers[1]], rooms[randomNumbers[2]]],
            },
            revalidate: 60 * 60 * 24
        }
    }
    catch {
        return {
            props: {
                room: {},
                amenities: [],
                relatedRooms: []
            },
            revalidate: 1
        }
    }
}