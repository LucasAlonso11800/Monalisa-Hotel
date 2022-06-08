import { STORED_PROCEDURES } from "./const/StoredProcedures";

export type CallSPParams = GetReserve | GetRooms | GetTestimonials | GetRoomAmenities | GetRoomPrices | AddReserve | AddRoomReserve | CheckAvailabilty;

type GetRooms = {
    procedure: STORED_PROCEDURES.GET_ROOM_CATEGORY,
    // [id]
    values: [number | null, string]
};

type GetTestimonials = {
    procedure: STORED_PROCEDURES.GET_TESTIMONIALS,
    values: []
};

type GetRoomAmenities = {
    procedure: STORED_PROCEDURES.GET_ROOM_AMENITIES,
    // [id]
    values: [number]
};

type GetRoomPrices = {
    procedure: STORED_PROCEDURES.GET_ROOM_PRICES,
    values: []
};

type CheckAvailabilty = {
    procedure: STORED_PROCEDURES.CHECK_AVAILABILITY,
    // dateFrom, roomCategoryId, rooms
    values: [string, number, number]
}

type AddReserve = {
    procedure: STORED_PROCEDURES.ADD_RESERVE,
    // total, dateFrom, dateTo, passengers, first name, last name, email, country, phone, zip, notes
    values: [number, string, string, number, string, string, string, string, string, string, string]
};

type AddRoomReserve = {
    procedure: STORED_PROCEDURES.ADD_ROOM_RESERVE,
    // roomId, reserveId
    values: [number, number]
};

type GetReserve = {
    procedure: STORED_PROCEDURES.GET_RESERVE,
    // reserveId
    values: [number]
};