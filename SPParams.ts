import { STORED_PROCEDURES } from "./const/StoredProcedures";

export type CallSPParams = GetRooms | GetTestimonials | GetOccupiedRooms | GetRoomAmenities;

type GetRooms = {
    procedure: STORED_PROCEDURES.GET_ROOM_CATEGORY,
    // [id]
    values: [number | null]
};

type GetTestimonials = {
    procedure: STORED_PROCEDURES.GET_TESTIMONIALS,
    values: []
};

type GetOccupiedRooms = {
    procedure: STORED_PROCEDURES.GET_OCCUPIED_ROOMS,
    // [date]
    values: [string]
};

type GetRoomAmenities = {
    procedure: STORED_PROCEDURES.GET_ROOM_AMENITIES,
    // [id]
    values: [number]
};