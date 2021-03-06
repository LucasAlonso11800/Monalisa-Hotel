import { NextRouter } from "next/router";

export const formatNumber = (number: number): string => number.toString().padStart(2, '0');

const getRandomNumber = (roomIndex: number, roomsLength: number, array: number[]): number => {
    const response: number = Math.floor(Math.random() * roomsLength);
    const isRepeated: boolean = array.some(num => num === response) || response === roomIndex;
    if (isRepeated) return getRandomNumber(roomIndex, roomsLength, array);
    return response;
};

export const getRelatedRoomsIndex = (roomIndex: number, roomsLength: number): number[] => {
    const response: number[] = []
    if (roomsLength === 2) response[0] = getRandomNumber(roomIndex, roomsLength, []);
    if (roomsLength === 3) {
        response[0] = getRandomNumber(roomIndex, roomsLength, []);
        response[1] = getRandomNumber(roomIndex, roomsLength, response);
    };
    if (roomsLength > 3) {
        response[0] = getRandomNumber(roomIndex, roomsLength, []);
        response[1] = getRandomNumber(roomIndex, roomsLength, response);
        response[2] = getRandomNumber(roomIndex, roomsLength, response);
    };
    return response;
};

export const redirect = (url: string, router: NextRouter) => () => router.push(url)