import React from 'react';
// Components
import Image from 'next/image'

export default function ContactUs() {
    return (
        <section className="contact-us">
            <Image
                src="https://firebasestorage.googleapis.com/v0/b/monalisa-5d346.appspot.com/o/map.png?alt=media&token=faefcf2f-e7fc-417f-9ce0-01c842ecc42c"
                alt="Map"
                width={1200}
                height={800}
                objectFit="cover"
            />
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