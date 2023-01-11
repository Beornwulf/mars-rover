import {app, rotateLeft, rotateRight} from "./app";

describe("app function should run", () => {
    it("returns", () => {
        expect(app()).toBeFalsy();
    })
})


describe.each([
    ["N", "W", "E"],
    ["S", "E", "W"],
    ["E", "N", "S"],
    ["W", "S", "N"]
])("turning functions correctly", (a, b, c) => {
    it('should return the correct string turning left', () => {
        expect(rotateLeft(a)).toEqual(b);
    });
    it('should return the correct string turning right', () => {
        expect(rotateRight(a)).toEqual(c);
    });
})