import axios from 'axios';
import React, { useEffect } from 'react';
// Components
import { AvailableRoom, CheckAvailabilty, Header, Layout } from '../components';
// Const
import { APIEndpoints } from '../const/APIEndpoints';
import { SERVER_URL } from '../const/const';
// Form
import { useFormik } from 'formik';
// Utils
import { getImageURL, getOccupiedRoomsNumber } from '../utils';
// Types
import type { ReservationPage as Props } from '../props';

export default function Reservation({ rooms, occupiedRooms, roomPrices }: Props) {
    const formik = useFormik({
        initialValues: {
            selected: {
                1: {
                    price: null, rooms: 1
                },
                2: {
                    price: null, rooms: 1
                },
                3: {
                    price: null, rooms: 1
                },
                4: {
                    price: null, rooms: 1
                },
                5: {
                    price: null, rooms: 1
                },
                6: {
                    price: null, rooms: 1
                },
            }
        },
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return (
        <Layout id="reservation" title="Reserve">
            <Header image={getImageURL('Reservation.jpg', 'head-images')}>
                <h1 className="title">Reserve</h1>
                <p className="subtitle"></p>
            </Header>
            <main className="main">
                <div className="container">
                    <h2 className="section-title">Make your reservation</h2>
                    <CheckAvailabilty />
                    <section className="available-rooms">
                        <h2 className="section-title">Rooms available for you</h2>
                        {rooms.map(room => (
                            <AvailableRoom
                                key={room.roomId}
                                room={room}
                                availableRooms={room.roomTotalRooms - getOccupiedRoomsNumber(occupiedRooms, room)}
                                roomPrices={roomPrices.filter(price => price.roomId === room.roomId)}
                                formik={formik}
                            />
                        ))}
                    </section>
                </div>
            </main>
        </Layout >
    )
};

export async function getStaticProps() {
    try {
        const [rooms, occupiedRooms, roomPrices] = await Promise.all([
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_ROOM_CATEGORIES}`, { roomCategoryId: null })).data,
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_OCCUPIED_ROOMS}`)).data,
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_ROOM_PRICES}`)).data,
        ]);
        return {
            props: { rooms, occupiedRooms, roomPrices },
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