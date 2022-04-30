import React from 'react'
// Components
import Head from 'next/head';
// Types
import { Head as Props } from '../../props';

export default function CustomHead({ title }: Props) {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.png" />
            <title>Monalisa Hotel - {title}</title>
        </Head>
    )
}
