import React from 'react';
// Components
import { Header, Layout } from '../components';
// Utils
import { getImageURL } from '../utils';

export default function Reservation() {
    return (
        <Layout id="reservation" title="Reserve">
            <Header image={getImageURL('Rooms.jpg', 'head-images')}>

            </Header>
        </Layout>
    )
}
