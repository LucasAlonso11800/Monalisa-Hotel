import { NextRouter } from "next/router";
import { OccupiedRoomType, RoomType } from "./types";

export const formatNumber = (number: number): string => number.toString().padStart(2, '0');

const getRandomNumber = (roomIndex: number, roomsLength: number, array: number[]): number => {
    const response: number = Math.floor(Math.random() * roomsLength);
    const isRepeated: boolean = array.some(num => num === response) || response === roomIndex;
    if (isRepeated) return getRandomNumber(roomIndex, roomsLength, array);
    return response;
};

export const getRelatedRoomsIndex = (roomIndex: number, roomsLength: number): number[] => {
    const response = [getRandomNumber(roomIndex, roomsLength, [])];
    response[1] = getRandomNumber(roomIndex, roomsLength, response);
    response[2] = getRandomNumber(roomIndex, roomsLength, response);
    return response;
};

export const getOccupiedRoomsNumber = (occupiedRooms: OccupiedRoomType[], room: RoomType): number => {
    return occupiedRooms.find(occ_room => occ_room.roomId === room.roomId)?.roomOccupiedRooms || 0
};

export const getImageURL = (folder: string | null, image: string): string => `/images/${folder ? `${folder}/${image}` : `${image}`}`;

export const redirect = (url: string, router: NextRouter) => () => router.push(url)