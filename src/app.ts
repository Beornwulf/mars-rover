export function app(input: string) {
    const lines = input.split(/\n/);
    const plateau = definePlateau(<string>lines.shift());

    let rovers: Rover[] = [];

    for (const line of lines) {
        if (!(line.match(/^[LMR]/))) {
            const lineSplit = line.split(" ");
            const origin: Coordinate = {X: parseInt(lineSplit[0]), Y: parseInt(lineSplit[1])}
            const facing = compass[<CardinalDirection>lineSplit[2]];
            rovers.push(new Rover(origin, facing));
        } else {
            const rover = rovers[rovers.length - 1];
            let instructions = line.split("");
            for (const command of instructions) {
                switch (command) {
                    case 'M':
                        rover.advance();
                        break;
                    case 'L':
                        rover.turnLeft();
                        break;
                    case 'R':
                        rover.turnRight();
                        break;
                }
            }
        }
    }

    return rovers.map(rover => rover.report()).join("\n");
}


class Rover {
    location: Coordinate;
    facing: Direction;

    constructor(location: Coordinate, facing: Direction) {
        this.location = location;
        this.facing = facing;
    }

    turnLeft() {
        this.facing = compass[<CardinalDirection>rotateLeft(this.facing.name)];
    }

    turnRight() {
        this.facing = compass[<CardinalDirection>rotateRight(this.facing.name)];
    }

    advance() {
        switch (this.facing.name) {
            case 'N':
                this.location = {X: this.location.X, Y: this.location.Y + 1};
                break;
            case 'S':
                this.location = {X: this.location.X, Y: this.location.Y - 1};
                break;
            case 'E':
                this.location = {X: this.location.X + 1, Y: this.location.Y};
                break;
            case 'W':
                this.location = {X: this.location.X - 1, Y: this.location.Y};
                break;
        }
    }

    report() {
        return `${this.location.X} ${this.location.Y} ${this.facing.name}`
    }
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