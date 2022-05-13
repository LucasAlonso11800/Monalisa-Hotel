import React from 'react';
import Image from 'next/image';
import { getImageURL } from '../utils';

export default function LittleAboutUs() {
    return (
        <section className="little-about-us">
            <h6 className="section-heading">Little about us</h6>
            <div className="row">
                <p className="left-side-text">Tel: (03) 0345 6789</p>
                <div className="about">
                    <Image src={getImageURL('about-us.jpg')} alt="Night" width={1500} height={1000} objectFit='cover' />
                    <div className="column">
                        <div></div>
                        <h2 className="section-title">A best place to enjoy your life</h2>
                        <p>The Monalisa Hotel is a modern, elegant 4-star hotel overlooking the sea, perfect for a romantic, charming vacation, in the enchanting setting of Amalfi Coast in southern Italy.</p>
                        <p><span className='author'>Lucas Alonso</span> - Developer</p>
                    </div>
                </div>
                <p className="right-side-text">info@monalisa.com</p>
            </div>
        </section>
    )
}
