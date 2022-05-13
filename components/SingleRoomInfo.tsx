import React from 'react';
// Components
import { Icon } from '@iconify/react';
// Types
import type { SingleRoomInfo } from '../props';

export default function SingleRoomInfo({ description, amenities }: SingleRoomInfo) {
    return (
        <section className="single-room-info">
            <div className="container">
                <h2 className="section-title">Description</h2>
                <p className="description">{description}</p>
                <h2 className="section-title">Amenities</h2>
                <div className="amenities">
                    {amenities.map((ameniti) => (
                        <p className="ameniti" key={ameniti.amenitiId}>
                            <Icon
                                icon={ameniti.amenitiStatus === 'Y' ? "ant-design:check-outlined" : "ant-design:close-outlined"}
                                className={ameniti.amenitiStatus === 'Y' ? "green" : "gray"}
                            />
                            {ameniti.amenitiName}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    )
};