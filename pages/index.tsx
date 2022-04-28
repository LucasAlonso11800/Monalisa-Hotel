import React from 'react'
// Components
import { CheckAvailabilty, DiscoverOurRooms, Header, Layout, LittleAboutUs, Testimonials } from '../components';

export default function Home() {
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
                <DiscoverOurRooms />
                <Testimonials />
            </main>
        </Layout>
    )
};