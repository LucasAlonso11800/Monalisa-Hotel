import React from 'react'
// Utils
import { getImageURL } from '../utils'
// Components
import { Header, Layout } from '../components'

export default function About() {
    return (
        <Layout id="about" title="About us">
            <Header image={getImageURL('Rooms.jpg', 'head-images')}>

            </Header>
        </Layout>
    )
}
