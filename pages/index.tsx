import React from 'react'
import axios from 'axios';
// Components
import { CheckAvailabilty, DiscoverOurRooms, Header, Layout, LittleAboutUs, Testimonials } from '../components';
// Const
import { SERVER_URL } from '../const/const';
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
            </main>
        </Layout>
    )
};

export async function getStaticProps() {
    try {
        const [rooms, testimonials] = await Promise.all([
            await (await axios.post(`${SERVER_URL}/api/get-room-categories`, { roomCategoryId: null })).data,
            await (await axios.post(`${SERVER_URL}/api/get-testimonials`)).data,
        ]);
        return {
            props: { rooms, testimonials }
        }
    }
    catch (error) {
        console.log(error)
        return {
            props: {
                error: {},
                rooms: [],
                testimonials: []
            }
        }
    }
};