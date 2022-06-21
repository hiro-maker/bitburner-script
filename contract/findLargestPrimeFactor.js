/** @param {NS} ns */
export async function main(ns) {
    const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
    const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
    const data = ns.codingcontract.getData(filename, host);
    const isAutoSolve = ((args2) => args2 !== undefined ? args2 : false)(ns.args[2])
    const answer = findLargestPrimeFactor(data)
    if (isAutoSolve) {
        ns.tprint(ns.codingcontract.attempt(answer, filename, host, { returnReward: true }))
    } else {
        ns.tprint(answer)
    }
}

function findLargestPrimeFactor(num) {
    for (let div = 2; div <= Math.sqrt(num); div++) {
        if (num % div != 0) {
            continue;
        }
        num = num / div;
        div = 2;
    }
    return num;
}

// 別解
function findLargestDivisor(n, currentLargestDivisor) {
    for (let i = currentLargestDivisor; i < n; ++i) {
        if (n % i === 0) {
            return i;
        }
    }
    return n;
}

function solve(n) {
    if (n < 2) return n;
    let largestDivisor = 2;
    while (n > 1) {
        largestDivisor = findLargestDivisor(n, largestDivisor);
        n = Math.round(n / largestDivisor);
    }
    return largestDivisor;
}

function textSolve(lines) {
    const nStr = lines[1].replace(/^.*[^0-9]([0-9]+)\?.*$/, '$1');
    const n = parseInt(nStr, 10);
    const res = solve(n);
    return String(res);
}