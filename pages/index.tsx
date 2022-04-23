import React from 'react'
// Assets
import image from '../assets/HeadImages/Home.jpg';
// Components
import { CheckAvailabilty, Header, Layout, LittleAboutUs } from '../components';

export default function Home() {
    return (
        <Layout id="home" title="Welcome">
            <Header image={image}>
                <h1 className="title">
                    <span className="top-subtitle">Welcome to</span>
                    Monalisa Hotel
                </h1>
                <p className="subtitle">A place to experience and enjoy life</p>
                <CheckAvailabilty />
            </Header>
            <main className="main">
                <LittleAboutUs />
            </main>
        </Layout>
    )
};