import { formatNumber } from '../utils';

describe('formatNumber', () => {
    test('Should return the same number as a string', () => {
        expect(formatNumber(10)).toBe('10');
        expect(formatNumber(52)).toBe('52');
        expect(formatNumber(93)).toBe('93');
        expect(formatNumber(140)).toBe('140');
        expect(formatNumber(10023)).toBe('10023');
        expect(formatNumber(130182301)).toBe('130182301');
    });
    test('Should return a string with length two', () => {
        expect(formatNumber(0)).toBe('00');
        expect(formatNumber(1)).toBe('01');
        expect(formatNumber(2)).toBe('02');
        expect(formatNumber(3)).toBe('03');
        expect(formatNumber(4)).toBe('04');
        expect(formatNumber(5)).toBe('05');
        expect(formatNumber(6)).toBe('06');
        expect(formatNumber(7)).toBe('07');
        expect(formatNumber(8)).toBe('08');
        expect(formatNumber(9)).toBe('09');
    });
});