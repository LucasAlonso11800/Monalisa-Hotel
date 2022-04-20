import React from 'react'
// Assets
import image from '../assets/HeadImages/Home.jpg';
// Components
import { Head, Header, Layout } from '../components';

export default function Home() {
  return (
    <Layout id="home">
        <Head title="Welcome"/>
        <Header image={image}>
            <p className="top-subtitle">Welcome to</p>
            <h1 className="title">Monalisa Hotel</h1>
            <p className="subtitle">A place to experience and enjoy life</p>
        </Header>
    </Layout>
  )
};