import type { OccupiedRoomType, RoomType, TestimonialType } from "./types";

// Pages

export type LandingPage = {
    rooms: RoomType[]
    testimonials: TestimonialType[]
};
export type RoomsPage = {
    rooms: RoomType[]
    occupiedRooms: OccupiedRoomType[]
};

export type SingleRoomPage = {
    room: RoomType
}

// Components

export type Layout = {
    id: string
    title: string
    children: React.ReactNode | React.ReactNode[]
}
export type Head = {
    title: string
};

export type Header = {
    image: string
    children: React.ReactNode | React.ReactNode[]
};

export type DiscoverOurRooms = {
    rooms: RoomType[]
};
export type Testimonials = {
    testimonials: TestimonialType[]
};

export type Room = {
    room: RoomType
    index: number
    occupiedRooms: number
    direction?: 'reverse'
};