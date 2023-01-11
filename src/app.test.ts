import {app, CardinalDirection, rotateLeft, rotateRight} from "./app";

describe.each<Array<CardinalDirection>>([
    ["N", "W", "E"],
    ["S", "E", "W"],
    ["E", "N", "S"],
    ["W", "S", "N"]
])("turning functions correctly", (a, b, c) => {
    it(`should return ${b} turning left from ${a}`, () => {
        expect(rotateLeft(a)).toEqual(b);
    });
    it(`should return ${c} turning right from ${a}`, () => {
        expect(rotateRight(a)).toEqual(c);
    });
})