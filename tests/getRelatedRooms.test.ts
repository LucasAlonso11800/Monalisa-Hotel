import { getRelatedRoomsIndex } from '../utils';

describe('getRelatedRoomsIndex', () => {
    test('Should return an empty array when roomsLength is < 2', () => {
        expect(getRelatedRoomsIndex(0, 0)).toHaveLength(0);
        expect(getRelatedRoomsIndex(0, 0)).toEqual([]);
        expect(getRelatedRoomsIndex(0, 1)).toHaveLength(0);
        expect(getRelatedRoomsIndex(0, 1)).toEqual([]);
    });
    test('Should return an array with length 1 when roomsLength is 2', () => {
        expect(getRelatedRoomsIndex(0, 2)).toHaveLength(1);
        expect(getRelatedRoomsIndex(0, 2)).toEqual([1]);
        expect(getRelatedRoomsIndex(1, 2)).toEqual([0]);
    });
    test('Should return an array with length 2 when roomsLength is 3', () => {
        expect(getRelatedRoomsIndex(0, 3)).toHaveLength(2);
        expect(getRelatedRoomsIndex(0, 3).includes(0)).toBeFalsy();
        expect(getRelatedRoomsIndex(1, 3).includes(1)).toBeFalsy();
        expect(getRelatedRoomsIndex(2, 3).includes(2)).toBeFalsy();
    });
    test('Should return an array with length 3 when roomsLength > 3', () => {
        expect(getRelatedRoomsIndex(0, 4)).toHaveLength(3);
        expect(getRelatedRoomsIndex(0, 15)).toHaveLength(3);
        expect(getRelatedRoomsIndex(0, 300)).toHaveLength(3);
        expect(getRelatedRoomsIndex(2, 4).includes(2)).toBeFalsy();
        expect(getRelatedRoomsIndex(8, 15).includes(8)).toBeFalsy();
        expect(getRelatedRoomsIndex(134, 300).includes(134)).toBeFalsy();
    });
});