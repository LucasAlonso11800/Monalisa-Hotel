import { RoomType, TestimonialType } from "./types";

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

export type LandingPage = {
    rooms: RoomType[]
    testimonials: TestimonialType[]
};

export type DiscoverOurRooms = {
    rooms: RoomType[]
};
export type Testimonials = {
    testimonials: TestimonialType[]
};