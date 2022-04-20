import React from 'react';
// Components
import Link from 'next/link';
import Image from 'next/image';
// Types
import { Header as Props } from '../../props';

export default function Header({ children, image }: Props) {
    return (
        <header className="header">
            <nav className="nav">
                <Link href="/">Home</Link>
                <Link href="/about">About Us</Link>
                <div className="title-container">
                    <h4>Monalisa</h4>
                    <p>Hotel & Resort</p>
                </div>
                <Link href="/rooms">Our Rooms</Link>
                <Link href="/reservation">Reservation</Link>
            </nav>
            <div className="image-container">
                <div className="overlay"></div>
                <Image src={image} layout='fill' objectFit='cover' priority />
                {children}
            </div>
        </header>
    )
};