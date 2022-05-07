import React from 'react';
// Components
import { Header, Layout } from '../components';
// Utils
import { getImageURL } from '../utils';

export default function Reservation() {
    return (
        <Layout id="reservation" title="Reserve">
            <Header image={getImageURL('Reservation.jpg', 'head-images')}>
                <h1 className="title">Reserve</h1>
                <p className="subtitle"></p>
            </Header>
        </Layout>
    )
}
