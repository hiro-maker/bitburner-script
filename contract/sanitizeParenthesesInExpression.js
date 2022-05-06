/** @param {NS} ns */
export async function main(ns) {
    const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
    const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
    const data = ns.codingcontract.getData(filename, host);
    const isAutoSolve = ((args2) => args2 !== undefined ? args2 : false)(ns.args[2])
    const answer = solve(data)
    if (isAutoSolve) {
        ns.tprint(ns.codingcontract.attempt(answer, filename, host, { returnReward: true }))
    } else {
        ns.tprint(answer)
    }
}

function findAll(input, pos = 0, curr = '', currentAmount = 0) {
    if (currentAmount < 0) return [];
    if (pos === input.length) {
        if (currentAmount !== 0) return [];
        return [curr];
    }
    let newAmount = currentAmount;
    if (input[pos] === '(') ++newAmount;
    if (input[pos] === ')') --newAmount;
    return [
        ...findAll(input, pos + 1, curr + input[pos], newAmount),
        ...(input[pos] === '(' ? findAll(input, pos + 1, curr, currentAmount) : []),
        ...(input[pos] === ')' ? findAll(input, pos + 1, curr, currentAmount) : []),
    ];
}

export function solve(input) {
    const all = findAll(input);
    const maxLen = Math.max(...all.map((e) => e.length));
    const res = all
        .filter((e) => e.length === maxLen) // Keep longest strings
        .filter((e, i, arr) => arr.indexOf(e) === i); // Keep unique
    return res;
}