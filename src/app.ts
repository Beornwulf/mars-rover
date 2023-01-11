export function app() {
    return;
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

type CardinalDirection = 'N' | 'S' | 'E' | 'W';

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