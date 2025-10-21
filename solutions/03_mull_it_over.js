import { readFile } from "fs/promises";

async function parseInputFromFile(filePath) {
    const text = (await readFile(filePath, "utf-8")).trim();
    return text;
}

function sumMultiplications(memory) {
    const mulPat = /mul\((\d{1,3}),(\d{1,3})\)/g;
    return memory
        .matchAll(mulPat)
        .map((x) =>
            x
                .slice(1)
                .map(Number)
                .reduce((x, y) => x * y)
        )
        .reduce((x, y) => x + y);
}

async function solution1(filePath) {
    const text = await parseInputFromFile(filePath);
    return sumMultiplications(text);
}

function readProgram(memory) {
    memory = `do()${memory}`
    const doPat = /((?:do\(\))|(?:don't\(\)))/g
    const instructionList = memory.split(doPat)

    let sum = 0
    for (let i=1; i<instructionList.length; i+=2){
        if (instructionList[i] === 'do()'){
            sum += sumMultiplications(instructionList[i+1])
        }
    }
    return sum
}

async function solution2(filePath) {
    const text = await parseInputFromFile(filePath);
    return readProgram(text);
}

console.log(`Solution 1 test case: ${await solution1("inputs/03_test.txt")}`);
console.log(`Solution 1: ${await solution1("inputs/03.txt")}`);
console.log(`Solution 2 test case: ${await solution2("inputs/03_2_test.txt")}`);
console.log(`Solution 2: ${await solution2('inputs/03.txt')}`);
