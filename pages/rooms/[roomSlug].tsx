import axios from 'axios';
import React from 'react'
// Components
import { Layout, Header, CheckAvailabilty, SingleRoomIntro, SingleRoomInfo } from '../../components';
// Const
import { APIEndpoints } from '../../const/APIEndpoints';
import { SERVER_URL } from '../../const/const';
// Types
import type { GetStaticPropsContext } from 'next';
import type { AmenitiType, RoomType } from '../../types';
import type { SingleRoomPage as Props } from '../../props';

export default function SingleRoomPage({ room, amenities }: Props) {
    const { roomName, roomImage, roomDescription } = room;

    return (
        <Layout id="single-room-page" title={roomName}>
            <Header image={`/images/rooms/${roomImage}`}>
                <h1 className="title">{roomName}</h1>
                <p className="subtitle">Home {'>'} Rooms {'>'} {roomName}</p>
                <CheckAvailabilty />
            </Header>
            <main className="main">
                <SingleRoomIntro room={room}/>
                <SingleRoomInfo description={roomDescription} amenities={amenities}/>
            </main>
        </Layout>
    )
};

export async function getStaticPaths() {
    const rooms: RoomType[] = await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_ROOM_CATEGORIES}`, { roomCategoryId: null })).data;
    return {
        paths: rooms.map(room => ({ params: { roomSlug: room.roomSlug } })),
        fallback: false
    }
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
    try {
        const rooms: RoomType[] = await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_ROOM_CATEGORIES}`, { roomCategoryId: null })).data;
        const room = rooms.find(r => r.roomSlug === params?.roomSlug); 
        const amenities: AmenitiType[] = await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_ROOM_AMENITIES}`, { roomCategoryId: room?.roomId})).data
        
        return {
            props: { 
                room,
                amenities
            },
            revalidate: 60 * 60 * 24
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
}