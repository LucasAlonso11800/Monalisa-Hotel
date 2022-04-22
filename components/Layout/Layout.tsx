import React from 'react';
// Components
import CustomHead from './Head';
import Footer from './Footer';
// Types
import { Layout as Props } from '../../props';

export default function Layout({ id, title, children }: Props) {
    return (
        <div className="layout" id={id}>
            <CustomHead title={title}/>
            {children}
            <Footer />
        </div>
    )
}
