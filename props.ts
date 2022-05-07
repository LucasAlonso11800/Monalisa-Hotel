import type { AmenitiType, OccupiedRoomType, RoomType, TestimonialType } from "./types";

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
    occupiedRooms: OccupiedRoomType[]
    amenities: AmenitiType[]
    relatedRooms: RoomType[]
};

export type AboutPage = {
    testimonials: TestimonialType[]
};

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

export type SingleRoomIntro = {
    room: RoomType
};

export type SingleRoomInfo = {
    description: string
    amenities: AmenitiType[]
};

export type RelatedRooms = {
    rooms: RoomType[]
    occupiedRooms: OccupiedRoomType[]
}