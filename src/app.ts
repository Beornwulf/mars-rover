export function app() {
    return;
}

export function rotateLeft(direction: string) {
    switch (direction) {
        case "N":
            return "W";
        case "S":
            return "E";
        case "E":
            return "N";
        case "W":
            return "S";
    }
}

export function rotateRight(direction: string) {
    switch (direction) {
        case "N":
            return "E";
        case "S":
            return "W";
        case "E":
            return "S";
        case "W":
            return "N";
    }
}