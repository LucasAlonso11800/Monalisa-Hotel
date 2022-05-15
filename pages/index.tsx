import React from 'react'
import axios from 'axios';
// Components
import { CheckAvailabilty, ContactUs, DiscoverOurRooms, Header, Layout, LittleAboutUs, Testimonials } from '../components';
// Const
import { SERVER_URL } from '../const/const';
import { APIEndpoints } from '../const/APIEndpoints';
import { PageNames } from '../const/PageNames';
// Types
import type { LandingPage as Props } from '../props';

export default function Home({ rooms, testimonials, image }: Props) {
    return (
        <Layout id="home" title="Welcome">
            <Header image={image.pageImageURL}>
                <h1 className="title">
                    <span className="top-subtitle">Welcome to</span>
                    Monalisa Hotel
                </h1>
                <p className="subtitle">A place to experience and enjoy life</p>
                <CheckAvailabilty />
            </Header>
            <main className="main">
                <LittleAboutUs />
                {rooms.length > 0 && <DiscoverOurRooms rooms={rooms} />}
                {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
                <ContactUs />
            </main>
        </Layout>
    )
};

export async function getStaticProps() {
    try {
        const [rooms, testimonials, image] = await Promise.all([
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_ROOM_CATEGORIES}`, { roomCategoryId: null })).data,
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_TESTIMONIALS}`)).data,
            await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_PAGE_IMAGE}`, { page: PageNames.HOME })).data
        ]);

        return {
            props: { rooms, testimonials, image },
            revalidate: 60 * 60 * 24
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