import React from 'react';
import axios from 'axios';
// Components
import { AboutUs, Header, Layout, Testimonials } from '../components';
// Const
import { SERVER_URL } from '../const/const';
import { APIEndpoints } from '../const/APIEndpoints';
import { HeadImages } from '../const/Images';
// Types
import type { AboutPage as Props } from '../props';

export default function About({ testimonials }: Props) {
    return (
        <Layout id="about" title="About us">
            <Header image={HeadImages.ABOUT}>
                <h1 className="title">
                    <span className="top-subtitle">About Us</span>
                    The best place to enjoy your life
                </h1>
                <p className="subtitle"></p>
            </Header>
            <main className="main">
                <AboutUs />
                {testimonials.length > 0 &&
                    <Testimonials testimonials={testimonials} />
                }
            </main>
        </Layout>
    )
};

export async function getStaticProps() {
    try {
        const testimonials = await (await axios.post(`${SERVER_URL}/${APIEndpoints.GET_TESTIMONIALS}`)).data
        
        return {
            props: { testimonials },
            revalidate: 60 * 60 * 24
        }
    }
    catch {
        return {
            props: { testimonials: [] },
            revalidate: 1
        }
    }
};