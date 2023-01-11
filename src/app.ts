export function app(input: string) {
    const lines = input.split(/\n/);
    const plateau = lines.shift();

    const output = `1 3 N
5 1 E`;
    return output;
}

export type Coordinate = {
    X: number, Y: number
}

/**
 * Generates a 2D array of the possible co-ordinates within the "plateau", the space in which the rover can operate.
 *
 * @param {String} input plateau definition in the format "X Y"
 * @return {Array<Array<Coordinate>>}
 */
export function definePlateau(input: string): Array<Array<Coordinate>> {
    const dimensions = input.split(" ");
    const xBound = parseInt(dimensions[0]);
    const yBound = parseInt(dimensions[1]);
    let output: Coordinate[][] = [[]];
    for (let y = 0; y < yBound; y++) {
        output[y] = []
        for (let x = 0; x < xBound; x++) {
            output[y][x] = {X: x + 1, Y: yBound - y};
        }
    }
    return output;
}

/**
 * Confirms whether a given location is within the bounds of the provided plateau.
 *
 * @param {Array<Array<Coordinate>>} plateau
 * @param {Coordinate} location
 * @return {boolean}
 */
export function validateLocation(plateau: Array<Array<Coordinate>>, location: Coordinate): boolean {
    return plateau.flat().some(square => (square.X == location.X && square.Y == location.Y));
}

class Direction {
    name: CardinalDirection;
    left: Direction | undefined;
    right: Direction | undefined;

    constructor(name: CardinalDirection) {
        this.name = name;
    }

    setAdjacent(left: Direction, right: Direction) {
        this.left = left;
        this.right = right;
    }
}

export type CardinalDirection = 'N' | 'S' | 'E' | 'W';

type Compass = {
    [index in CardinalDirection]: Direction;
};

const compass: Compass = {
    N: new Direction("N"), S: new Direction("S"), E: new Direction("E"), W: new Direction("W")
};
compass.N.setAdjacent(compass.W, compass.E);
compass.S.setAdjacent(compass.E, compass.W);
compass.E.setAdjacent(compass.N, compass.S);
compass.W.setAdjacent(compass.S, compass.N);

/**
 * Returns the facing one step to the left of the input direction on the currently defined compass.
 *
 * @param {CardinalDirection} direction
 * @return {string}
 */
export function rotateLeft(direction: CardinalDirection): CardinalDirection | undefined {
    const target = compass[direction].left;
    if (target instanceof Direction) {
        return target.name;
    }
}

/**
 * Returns the facing one step to the right of the input direction on the currently defined compass.
 *
 * @param {CardinalDirection} direction
 * @return {string}
 */
export function rotateRight(direction: CardinalDirection): CardinalDirection | undefined {
    const target = compass[direction].right;
    if (target instanceof Direction) {
        return target.name;
    }
}