import axios from 'axios';
import React from 'react'
// Components
import { Layout, Header } from '../../components';
// Const
import { APIEndpoints } from '../../const/APIEndpoints';
import { SERVER_URL } from '../../const/const';
// Types
import type { GetStaticPropsContext } from 'next';
import type { RoomType } from '../../types';
import type { SingleRoomPage as Props } from '../../props';

export default function SingleRoomPage({ room }: Props) {
    return (
        <Layout id="single-room-page" title={room.roomName}>
            <Header image='/images/head-images/Rooms.jpg'>

            </Header>
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
        return {
            props: { room: rooms.find(r => r.roomSlug === params?.roomSlug) },
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