export type RoomType = {
    roomId: number
    roomName: string
    roomSlug: string
    roomMinimumPrice: number
    roomImage: string
    roomDescription: string
    roomTotalRooms: number
    roomBeds: number
    roomPassengers: number
    roomDeposit: number
};

export type OccupiedRoomType = {
    roomId: number
    roomName: string
    roomOccupiedRooms: number
}

export type TestimonialType = {
    testimonialId: number
    testimonialText: string
    testimonialName: string
    testimonialRating: 1 | 2 | 3 | 4 | 5
};

export type AmenitiType = {
    roomId: number
    roomName: string
    amenitiId: number
    amenitiName: string
    amenitiStatus: 'Y' | 'N'
};

export type PriceType = {
    priceId: number
    priceName: string
    roomId: number
    roomPrice: number
};

export type SelectedRoomType = {
    price: PriceType
    room: RoomType
};

export type AddReserveResponseType = {
    code: 0 | 1,
    message: string
};

export type ReserveType = {
    reserveId: number
    reservePrice: number
    reserveFrom: string
    reserveTo: string
    reservePassengers: number
    reserveOwner: string
    reserveRooms: number
};

type OkPacket = {
    fieldCount: number
    affectedRows: number
    insertId: number
    serverStatus: number
    warningCount: number
    message: string,
    protocol41: boolean,
    changedRows: number
};

export type SPResponse<Type> = [Type[], OkPacket];