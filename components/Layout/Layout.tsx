import React from 'react';
// Types
import { Layout as Props } from '../../props';

export default function Layout({ id, children }: Props) {
    return (
        <div className="layout" id={id}>
            {children}
        </div>
    )
}
