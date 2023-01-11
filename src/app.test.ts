import {app, CardinalDirection, definePlateau, rotateLeft, rotateRight} from "./app";

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

describe("generating the plateau", () => {
    it(`should output the correct array`, () => {
        expect(definePlateau("5 5")).toEqual([
            [{X: 1, Y: 5}, {X: 2, Y: 5}, {X: 3, Y: 5}, {X: 4, Y: 5}, {X: 5, Y: 5}],
            [{X: 1, Y: 4}, {X: 2, Y: 4}, {X: 3, Y: 4}, {X: 4, Y: 4}, {X: 5, Y: 4}],
            [{X: 1, Y: 3}, {X: 2, Y: 3}, {X: 3, Y: 3}, {X: 4, Y: 3}, {X: 5, Y: 3}],
            [{X: 1, Y: 2}, {X: 2, Y: 2}, {X: 3, Y: 2}, {X: 4, Y: 2}, {X: 5, Y: 2}],
            [{X: 1, Y: 1}, {X: 2, Y: 1}, {X: 3, Y: 1}, {X: 4, Y: 1}, {X: 5, Y: 1}]
        ])
    })
})

const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

const output = `1 3 N
5 1 E`;

describe("end to end", () => {
    it('should output the correct string', () => {
        expect(app(input)).toMatch(output);
    });
})