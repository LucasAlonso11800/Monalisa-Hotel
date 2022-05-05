import React from 'react'
import axios from 'axios';
// Components
import { CheckAvailabilty, ContactUs, DiscoverOurRooms, Header, Layout, LittleAboutUs, Testimonials } from '../components';
// Const
import { SERVER_URL } from '../const/const';
import { APIEndpoints } from '../const/APIEndpoints';
// Types
import type { LandingPage as Props } from '../props';

export default function Home({ rooms, testimonials }: Props) {
    return (
        <Layout id="home" title="Welcome">
            <Header image='/images/head-images/Home.jpg'>
                <h1 className="title">
                    <span className="top-subtitle">Welcome to</span>
                    Monalisa Hotel
                </h1>
                <p className="subtitle">A place to experience and enjoy life</p>
                <CheckAvailabilty />
            </Header>
            <main className="main">
                <LittleAboutUs />
                <DiscoverOurRooms rooms={rooms} />
                <Testimonials testimonials={testimonials} />
                <ContactUs />
            </main>
        </Layout>
    )
};

export async function getStaticProps() {
    try {
        const [rooms, testimonials] = await Promise.all([
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_ROOM_CATEGORIES}`, { roomCategoryId: null })).data,
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_TESTIMONIALS}`)).data,
        ]);
        return {
            props: { rooms, testimonials },
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
};