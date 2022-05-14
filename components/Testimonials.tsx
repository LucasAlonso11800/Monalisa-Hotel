import React, { useEffect, useState } from 'react';
// Components
import { Icon } from '@iconify/react'
// Types
import { Testimonials as Props } from '../props';

export default function Testimonials({ testimonials }: Props) {
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        setTimeout(() => {
            if (index === testimonials.length - 1) return setIndex(0);
            setIndex(index + 1);
        }, 10000);
    }, [index, testimonials]);

    return (
        <section className="testimonials">
            <div className="container">
                <h6 className="section-heading">Testimonial</h6>
                <h2 className="section-title">What Clients Say</h2>
                <p className="testimonial">&quot;{testimonials[index].testimonialText}&quot;</p>
                <div className="stars">
                    <Icon icon={`dashicons:star-${testimonials[index].testimonialRating >= 1 ? 'filled' : 'empty'}`} fontSize={32} color="#FFCE31" />
                    <Icon icon={`dashicons:star-${testimonials[index].testimonialRating >= 2 ? 'filled' : 'empty'}`} fontSize={32} color="#FFCE31" />
                    <Icon icon={`dashicons:star-${testimonials[index].testimonialRating >= 3 ? 'filled' : 'empty'}`} fontSize={32} color="#FFCE31" />
                    <Icon icon={`dashicons:star-${testimonials[index].testimonialRating >= 4 ? 'filled' : 'empty'}`} fontSize={32} color="#FFCE31" />
                    <Icon icon={`dashicons:star-${testimonials[index].testimonialRating === 5 ? 'filled' : 'empty'}`} fontSize={32} color="#FFCE31" />
                </div>
                <p className="name">{testimonials[index].testimonialName}</p>
            </div>
        </section>
    )
};