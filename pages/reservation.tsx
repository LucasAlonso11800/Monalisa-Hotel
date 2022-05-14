import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
// Components
import { AvailableRoom, BookingOverview, CheckAvailabilty, ConfirmReservation, Header, Layout } from '../components';
import { Icon } from '@iconify/react';
// Const
import { APIEndpoints } from '../const/APIEndpoints';
import { NEXT_WEEK, SERVER_URL, TODAY } from '../const/const';
// Form
import { useFormik } from 'formik';
import * as yup from 'yup';
// Utils
import { getImageURL, getOccupiedRoomsNumber } from '../utils';
// Types
import type { ReservationPage as Props } from '../props';
import type { AddReserveResponseType, RoomType, SelectedRoomType } from '../types';
import type { GetServerSidePropsContext } from 'next';

export default function Reservation(props: Props) {
    const { roomPrices, dateFrom, dateTo } = props;

    const router = useRouter();

    const [rooms, setRooms] = useState(props.rooms);
    const [occupiedRooms, setOccupiedRooms] = useState(props.occupiedRooms);
    const [checkIn, setCheckIn] = useState<string | Date>(dateFrom);
    const [checkOut, setCheckOut] = useState<string | Date>(dateTo);
    const [guests, setGuests] = useState<number>(props.guests || 2);

    const [selectedRooms, setSelectedRooms] = useState<SelectedRoomType[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const validationSchema = yup.object({
        first_name: yup.string().required('Please enter your first name').max(40, 'Maximum length is 40 characters'),
        last_name: yup.string().required('Please enter your last name').max(40, 'Maximum length is 40 characters'),
        email: yup.string().required('Please enter your email').max(100, 'Maximum length is 100 characters'),
        country: yup.string().required('Please enter your country').max(40, 'Maximum length is 40 characters'),
        zip: yup.string().required('Please enter your zip code').max(20, 'Maximum length is 20 characters'),
        phone: yup.number().required('Please enter your phone'),
        notes: yup.string().max(65535, 'Maximum length 65535 characters')
    });

    const handleSubmit = async (values: any) => {
        try {
            setSubmitting(true);
            const response: AddReserveResponseType = await (await axios.post(`${SERVER_URL}/${APIEndpoints.ADD_ROOM_RESERVE}`, {
                values: {
                    ...values,
                    total,
                    passengers: guests,
                    dateFrom: checkIn,
                    dateTo: checkOut,
                    selected: Object.values(values.selected).filter((room: any) => room.price)
                }
            })).data;
            setSubmitting(false);

            if (response.code === 0) return setError(response.message);
            if (response.code === 1) return router.push(`/reserve-success?id=${response.message}`);
        }
        catch (err) {
            console.log(err)
        }
    };

    const formik = useFormik({
        initialValues: {
            selected: rooms.reduce((acc, room) => ({ ...acc, [room.roomId]: { price: null, rooms: 1 } }), {}),
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            country: '',
            zip: '',
            notes: ''
        },
        validationSchema,
        onSubmit: (values) => handleSubmit(values)
    });

    useEffect(() => {
        const array: SelectedRoomType[] = Object.entries(formik.values.selected).reduce((acc: any[], entry: any) => {
            if (!entry[1].price) return acc;
            return [...acc, { values: entry[1], room: rooms.find((room: RoomType) => room.roomId === parseInt(entry[0])) }]
        }, []);
        setSelectedRooms(array);

        const newTotal: number = array.reduce((acc: number, room) => {
            return acc + room.values.price.roomPrice * room.values.rooms
        }, 0);
        const dayDiff = moment(checkOut).diff(moment(checkIn), 'days');
        setTotal(newTotal * dayDiff);
    }, [formik.values.selected, checkIn, checkOut, rooms]);

    const fetchData = async (date: string) => {
        setLoading(true);
        const [rooms, occupiedRooms] = await Promise.all([
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_ROOM_CATEGORIES}`, { roomCategoryId: null })).data,
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_OCCUPIED_ROOMS}`, { dateFrom: date })).data,
        ]);
        formik.resetForm();
        setRooms(rooms);
        setOccupiedRooms(occupiedRooms);
        setLoading(false);
    };

    return (
        <Layout id="reservation" title="Reserve">
            <Header image={getImageURL('Reservation.jpg', 'head-images')}>
                <h1 className="title">Reserve</h1>
                <p className="subtitle"></p>
            </Header>
            <main className="main">
                <div className="container">
                    <h2 className="section-title">Make your reservation</h2>
                    <CheckAvailabilty
                        dateFrom={checkIn}
                        setDateFrom={setCheckIn}
                        dateTo={checkOut}
                        setDateTo={setCheckOut}
                        passengers={guests}
                        setPassengers={setGuests}
                        onSubmit={fetchData}
                    />
                    {loading && <Icon icon="eos-icons:bubble-loading" />}
                    {!loading &&
                        <>
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
                            {selectedRooms.length > 0 &&
                                <>
                                    <BookingOverview
                                        selectedRooms={selectedRooms}
                                        total={total}
                                        dateFrom={checkIn}
                                        dateTo={checkOut}
                                    />
                                    <ConfirmReservation
                                        formik={formik}
                                        error={error}
                                        submitting={submitting}
                                    />
                                </>
                            }
                        </>
                    }
                </div>
            </main>
        </Layout >
    )
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const dateFrom = context.query.from || TODAY;
        const dateTo = context.query.to || NEXT_WEEK;
        const guests = context.query.guests || 2;

        const [rooms, occupiedRooms, roomPrices] = await Promise.all([
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_ROOM_CATEGORIES}`, { roomCategoryId: null })).data,
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_OCCUPIED_ROOMS}`, { dateFrom })).data,
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_ROOM_PRICES}`)).data,
        ]);
        return {
            props: { rooms, occupiedRooms, roomPrices, dateFrom, dateTo, guests }
        }
    }
    catch {
        return {
            redirect: {
                destination: '/error',
                permanent: false
            }
        }
    }
};