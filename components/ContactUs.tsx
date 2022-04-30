import React from 'react';
// Components
import Image from 'next/image'

export default function ContactUs() {
    return (
        <section className="contact-us">
            <Image src="/images/map.png" width={1200} height={800} objectFit="cover"/>
            <div className="column">
                <h6 className="section-heading">Information</h6>
                <h2 className="section-title">Contact Us</h2>
                <p className="city">Amalfi, <span>Italia</span></p>
                <address>Via Lungomare dei Cavalieri, 342, 84011 Amalfi SA, Italia</address>
                <p className="email"><b>Email: </b>Info@monalisahotel.com</p>
                <p className="call">Call directly:</p>
                <p className="number">(03) 0345 6789</p>
            </div>
        </section>
    )
};