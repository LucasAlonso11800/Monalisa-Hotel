import type { AmenitiType, PriceType, ReserveType, RoomType, SelectedRoomType, TestimonialType } from "./types";

// Pages

export type LandingPage = {
    rooms: RoomType[]
    testimonials: TestimonialType[]
};
export type RoomsPage = {
    rooms: RoomType[]
};

export type SingleRoomPage = {
    room: RoomType
    amenities: AmenitiType[]
    relatedRooms: RoomType[]
};

export type AboutPage = {
    testimonials: TestimonialType[]
};

export type ReservationPage = {
    rooms: RoomType[]
    roomPrices: PriceType[]
    dateFrom: Date
    dateTo: Date
    guests: number
};

export type ReserveSuccessPage = {
    reserve: ReserveType
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
};

export type AvailableRoom = {
    room: RoomType
    roomPrices: PriceType[]
    formik: any
};

export type BookingOverview = {
    selectedRooms: SelectedRoomType[]
    total: number
    dateFrom: string | Date
    dateTo: string | Date
};

export type ConfirmReservation = {
    formik: any
    error: string | null
    submitting: boolean
}

export type CheckAvailabilty = {
    dateFrom?: string | Date
    setDateFrom?: React.Dispatch<React.SetStateAction<string | Date>>
    dateTo?: string | Date
    setDateTo?: React.Dispatch<React.SetStateAction<string | Date>>
    passengers?: number
    setPassengers?: React.Dispatch<React.SetStateAction<number>>
    onSubmit?: (date: string) => Promise<void>
};