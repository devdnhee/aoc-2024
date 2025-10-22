import { readFile } from "fs/promises";
import { Vector2D, UP, DOWN, LEFT, RIGHT } from "../utils/data_structures.js";

async function parseInputFromFile(filePath) {
    const wordSearch = (await readFile(filePath, "utf-8"))
        .trim()
        .split("\n")
        .map((x) => [...x]); // cool trick => string to list of chars
    return wordSearch;
}

const directions = [
    UP,
    DOWN,
    LEFT,
    RIGHT,
    UP.add(LEFT),
    UP.add(RIGHT),
    DOWN.add(LEFT),
    DOWN.add(RIGHT),
];

function checkWord(matrix, word, start, direction) {
    if (!direction instanceof Vector2D) {
        throw new TypeError(`direction: ${JSON.stringify(direction)}`);
    }
    if (!start instanceof Vector2D) {
        throw new TypeError(`direction: ${JSON.stringify(start)}`);
    }
    const end = start.add(direction.multiply(word.length - 1));

    if (!end.inMatrix(matrix)) {
        return 0;
    }

    for (let i = 0; i < word.length; i++) {
        const check = start.add(direction.multiply(i));
        if (word.charAt(i) !== matrix[check.x][check.y]) {
            return 0;
        }
    }
    return 1;
}

function wordSearchCount(matrix, word = "XMAS") {
    let count = 0;
    const nrows = matrix.length;
    const ncols = matrix[0].length;

    for (let i = 0; i < nrows; i++) {
        for (let j = 0; j < ncols; j++) {
            const start = new Vector2D(i, j);
            for (const d of directions) {
                // console.log(`checkWord(matrix, ${word}, ${start}, ${d})`);
                count += checkWord(matrix, word, start, d);
            }
        }
    }

    return count;
}

function checkXMAS(matrix, check) {
    if (!check instanceof Vector2D) {
        throw new TypeError(`direction: ${JSON.stringify(check)}`);
    }
    const downLeft = DOWN.add(LEFT);
    const downRight = DOWN.add(RIGHT);
    const checkRight = check.add(RIGHT.multiply(2));

    const checkMAS =
        checkWord(matrix, "MAS", check, downRight) &
        (checkWord(matrix, "SAM", checkRight, downLeft) |
            checkWord(matrix, "MAS", checkRight, downLeft));

    const checkSAM =
        checkWord(matrix, "SAM", check, downRight) &
        (checkWord(matrix, "SAM", checkRight, downLeft) |
            checkWord(matrix, "MAS", checkRight, downLeft));

    return checkMAS | checkSAM;
}

function XMASCount(matrix) {
    let count = 0;
    const nrows = matrix.length;
    const ncols = matrix[0].length;

    for (let i = 0; i < nrows; i++) {
        for (let j = 0; j < ncols; j++) {
            count += checkXMAS(matrix, new Vector2D(i, j));
        }
    }

    return count;
}

async function solution1(filePath) {
    const matrix = await parseInputFromFile(filePath);
    return wordSearchCount(matrix);
}

async function solution2(filePath) {
    const matrix = await parseInputFromFile(filePath);
    return XMASCount(matrix)
}

console.log(`Solution 1 test case: ${await solution1("inputs/04_test.txt")}`);
console.log(`Solution 1: ${await solution1("inputs/04.txt")}`);
console.log(`Solution 2 test case: ${await solution2("inputs/04_test.txt")}`);
console.log(`Solution 2: ${await solution2('inputs/04.txt')}`);
