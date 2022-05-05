export type RoomType = {
    roomId: number
    roomName: string
    roomSlug: string
    roomMinimumPrice: number
    roomImage: string
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