import { OccupiedRoomType } from "../types";
import { getOccupiedRoomsNumber } from "../utils";

const occupiedRooms: OccupiedRoomType[] = [
    {
        roomId: 1,
        roomName: 'Test',
        roomOccupiedRooms: 5
    },
    {
        roomId: 2,
        roomName: 'Test2',
        roomOccupiedRooms: 2
    }
];

const rooms: any[] = [{ roomId: 1 }, { roomId: 2 }, { roomId: 3 }];

describe('getOccupiedRoomsNumber', () => {
    test('Should return 0 if room is not found', () => {
        expect(getOccupiedRoomsNumber(occupiedRooms, rooms[2])).toBe(0)
    });
    test('Should return property roomOccupiedRooms if room is found', () => {
        expect(getOccupiedRoomsNumber(occupiedRooms, rooms[0])).toBe(5)
        expect(getOccupiedRoomsNumber(occupiedRooms, rooms[1])).toBe(2)
    });
});