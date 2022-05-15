import React from 'react'
import axios from 'axios';
import moment from 'moment';
// Components
import { Header, Layout } from '../components';
import { APIEndpoints } from '../const/APIEndpoints';
import { SERVER_URL } from '../const/const';
// Utils
import { formatNumber } from '../utils';
// Const
import { PageNames } from '../const/PageNames';
// Types
import type { GetServerSidePropsContext } from 'next';
import type { ReserveSuccessPage as Props } from '../props';

export default function ReserveSuccess({ reserve, image }: Props) {
    const { reserveOwner, reserveFrom, reserveTo, reservePassengers, reservePrice, reserveRooms } = reserve;
    return (
        <Layout id="reserve-success" title="Thank for your reserve">
            <Header image={image.pageImageURL}>
                <h1 className="title">Thanks for your reserve</h1>
                <p className="subtitle"></p>
            </Header>
            <main className="main">
                <section className="reserve-info">
                    <h2 className="section-title">Your reserve</h2>
                    <div className="container">
                        <p><b>{reserveOwner}</b></p>
                        <p>{moment(reserveFrom).format('DD/MM/YYYY')} - {moment(reserveTo).format('DD/MM/YYYY')}</p>
                        <p>Passengers: <b>{formatNumber(reservePassengers)}</b></p>
                        <p>Rooms: <b>{reserveRooms}</b></p>
                        <p>Total: <b>${reservePrice.toFixed(2)}</b></p>
                        <p>This demo page was developed by Lucas Alonso. <br />Thank you for visiting it</p>
                    </div>
                </section>
            </main>
        </Layout>
    )
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        if (!context.query.id) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        };

        const [reserve, image] = await Promise.all([
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_RESERVE}`, { reserveId: context.query.id })).data,
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_PAGE_IMAGE}`, { page: PageNames.RESERVE_SUCCESS })).data
        ])

        return {
            props: { reserve, image }
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