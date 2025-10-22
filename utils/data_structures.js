class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        return new Vector2D(this.x + other.x, this.y + other.y);
    }

    equals(other) {
        return this.x === other.x && this.y === other.y;
    }

    multiply(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    inMatrix(matrix) {
        return (
            this.x >= 0 &&
            this.x < matrix.length &&
            this.y >= 0 &&
            this.y < matrix[0].length
        );
    }
}

const UP = new Vector2D(-1, 0);
const DOWN = new Vector2D(1, 0);
const LEFT = new Vector2D(0, -1);
const RIGHT = new Vector2D(0, 1);

export { Vector2D, UP, DOWN, LEFT, RIGHT };
