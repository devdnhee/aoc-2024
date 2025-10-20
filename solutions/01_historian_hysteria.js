import { readFile } from 'fs/promises';

async function parse_input_from_file(filePath) {
    const pattern = /(\d+)\s+(\d+)/
    const text = (await readFile(filePath, 'utf-8')).trim();
    const lines = text.split("\n").filter(line => line.trim() !== '');

    let arr1 = []
    let arr2 = []

    for (let i = 0; i < lines.length; i++) {
        const [, num1, num2] = pattern.exec(lines[i])
        arr1.push(parseInt(num1))
        arr2.push(parseInt(num2))
    }

    // alternative using map, which is more functional and concise way
    // const parsedLines = lines.map(line => {
    //     const match = pattern.exec(line);
    //     if(!match){
    //         console.warn(`Skipping malformed line: ${line}`);
    //         const [, num1, num2] = match;
    //         return [parseInt(num1), parseInt(num2)]
    //     }
    // })

    return [arr1, arr2]
}

function total_distance_sorted_pairs(arr1, arr2) {
    const n = arr1.length
    // Sort copies of the arrays to avoid mutating the original arrays
    const arr1_sorted = [...arr1].sort((a, b) => a - b)
    const arr2_sorted = [...arr2].sort((a, b) => a - b)

    let distance = 0;
    for (let i = 0; i < n; i++) {
        distance += Math.abs(arr1_sorted[i] - arr2_sorted[i])
    }

    return distance
}

async function solution1(filePath) {
    const arrays = await parse_input_from_file(filePath)
    return total_distance_sorted_pairs(...arrays)
}

function similarity_score(arr1, arr2) {
    const n = arr1.length
    let similarity = 0
    let counts = {}

    arr2.forEach(el => { counts[el] = (counts[el] || 0) + 1 })
    arr1.forEach(el => { similarity += (el * counts[el] || 0) })
    return similarity
}

async function solution2(filePath) {
    const arrays = await parse_input_from_file(filePath)
    return similarity_score(...arrays)
}

console.log(`Solution 1 test case: ${await solution1('inputs/01_test.txt')}`)
console.log(`Solution 1: ${await solution1('inputs/01.txt')}`)
console.log(`Solution 2 test case: ${await solution2('inputs/01_test.txt')}`)
console.log(`Solution 2: ${await solution2('inputs/01.txt')}`)
