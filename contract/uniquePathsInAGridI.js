/** @param {NS} ns */
export async function main(ns) {
    const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
    const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
    const data = ns.codingcontract.getData(filename, host);
    ns.tprint(uniquePathsI(data))
}

function uniquePathsI(grid) {
    const rightMoves = grid[0] - 1;
    const downMoves = grid[1] - 1;
    return Math.round(factorialDivision(rightMoves + downMoves, rightMoves) / (factorial(downMoves)));
}

function factorial(n) {
    return factorialDivision(n, 1);
}

function factorialDivision(n, d) {
    if (n == 0 || n == 1 || n == d)
        return 1;
    return factorialDivision(n - 1, d) * n;
}