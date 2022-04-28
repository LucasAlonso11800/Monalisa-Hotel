import React from 'react';
// Components
import { Icon } from '@iconify/react'

export default function Testimonials() {
    return (
        <section className="testimonials">
            <div className="container">
                <h6 className="section-heading">Testimonial</h6>
                <h2 className="section-title">What Clients Say</h2>
                <p className="testimonial">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, pariatur temporibus odio similique exercitationem saepe veniam nostrum ad ullam, atque dicta fugit harum numquam eaque sint a nam fugiat alias."</p>
                <div className="stars">
                    <Icon icon="dashicons:star-filled" fontSize={32} color="#FFCE31"/>
                    <Icon icon="dashicons:star-filled" fontSize={32} color="#FFCE31"/>
                    <Icon icon="dashicons:star-filled" fontSize={32} color="#FFCE31"/>
                    <Icon icon="dashicons:star-filled" fontSize={32} color="#FFCE31"/>
                    <Icon icon="dashicons:star-empty" fontSize={32} color="#FFCE31"/>
                </div>
                <p className="name">Taylor Swift</p>
            </div>
        </section>
    )
};