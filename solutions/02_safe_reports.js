import { readFile } from "fs/promises";

async function parseInputFromFile(filePath) {
    const text = (await readFile(filePath, "utf-8")).trim();
    const lines = text.split("\n").filter((line) => line.trim() !== "");

    let reports = lines.map((line) => {
        const parsedLine = line.split(/\s/).map((x) => parseInt(x));
        return parsedLine;
    });

    return reports;
}

function numberSafeReports(reports) {
    const isSafeReports = reports.map((report) => {
        let isAscending = report[0] < report[1];
        if (report[0] === report[1] || Math.abs(report[0] - report[1]) > 3) {
            return false;
        }
        for (let i = 1; i < report.length - 1; i++) {
            if (
                Math.abs(report[i] - report[i + 1]) > 3 ||
                report[i] === report[i + 1] ||
                report[i] < report[i + 1] !== isAscending
            ) {
                return false;
            }
        }
        return true;
    });

    return isSafeReports.filter((x) => x).length;
}

async function solution1(filePath) {
    const reports = await parseInputFromFile(filePath);
    return numberSafeReports(reports);
}

function isSafe(report) {
    let isAscending = report[0] < report[1];
    if (report[0] === report[1] || Math.abs(report[0] - report[1]) > 3) {
        return false;
    }
    for (let i = 1; i < report.length - 1; i++) {
        if (
            Math.abs(report[i] - report[i + 1]) > 3 ||
            report[i] === report[i + 1] ||
            report[i] < report[i + 1] !== isAscending
        ) {
            return false;
        }
    }
    return true;
}

function isAlmostSafe(report) {
    if (isSafe(report)) {
        return true;
    }
    let isAscending =
        report
            .toSpliced(4)
            .map((el, idx, arr) => {
                return idx > 0 ? Number(arr[idx - 1] < arr[idx]) : null;
            })
            .slice(1)
            .reduce((a, b) => a + b) >= 2;
    for (let i = 0; i < report.length - 1; i++) {
        const condition = Math.abs(report[i] - report[i + 1]) > 3 ||
            report[i] === report[i + 1] ||
            report[i] < report[i + 1] !== isAscending;
        if (condition) {
            return (
                isSafe([...report.slice(0, i), ...report.slice(i + 1)]) ||
                isSafe([...report.slice(0, i + 1), ...report.slice(i + 2)])
            );
        }
    }
}

function numberAlmostSafe(reports) {
    // console.log(reports.map(isAlmostSafe));
    return reports
        .map(isAlmostSafe)
        .map(Number)
        .reduce((a, b) => a + b);
}


async function solution2(filePath) {
    const reports = await parseInputFromFile(filePath);
    return numberAlmostSafe(reports);
}
console.log(`Solution 1 test case: ${await solution1("inputs/02_test.txt")}`);
console.log(`Solution 1: ${await solution1("inputs/02.txt")}`);
console.log(`Solution 2 test case: ${await solution2("inputs/02_test.txt")}`);
console.log(`Solution 2 custom case: ${await solution2("inputs/02_custom_test.txt")}`);
console.log(`Solution 2: ${await solution2('inputs/02.txt')}`);
