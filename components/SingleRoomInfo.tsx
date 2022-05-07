import { Icon } from '@iconify/react'
import React from 'react'
// Types
import type { SingleRoomInfo } from '../props'

export default function SingleRoomInfo({ description, amenities }: SingleRoomInfo) {
    return (
        <section className="single-room-info">
            <div className="container">
                <h2 className="section-title">Description</h2>
                {/* <p className="description">{description}</p> */}
                <p className="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti ipsa tempore ipsam ratione temporibus deleniti voluptates minima vitae. Rerum expedita officia tempore cum sed, ipsum repudiandae ullam velit eum delectus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea laboriosam quo, quam dolorem, fuga consequatur iusto aut minima temporibus voluptates tenetur, unde doloribus error ipsam cumque deserunt dolore iure porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga natus, facere, ipsa incidunt minima eveniet perspiciatis architecto, enim nam fugit iusto. Alias earum labore magnam voluptas iure quo aliquid! Blanditiis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, ipsum temporibus dignissimos sunt est necessitatibus repellendus possimus cum. Quibusdam facilis sequi reiciendis consectetur iste molestias nisi dolore rerum aliquam qui.</p>
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