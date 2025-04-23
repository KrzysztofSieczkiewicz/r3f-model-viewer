import { divide } from "./functionTest";

describe('functionTest', () => {
    test('Multiplies 2 positive numbers', () => {
        expect(divide(2, 0)).toEqual(Infinity);
    });
    test('Multiplies multiply by 0', () => {
        expect(divide(0, 3)).toEqual(0);
    });
    test('Multiplies positive and negative', () => {
        expect(divide(-1, 3)).toEqual(-0.3333333333333333);
    });
});