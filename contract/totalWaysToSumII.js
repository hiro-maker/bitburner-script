/** @param {NS} ns */
export async function main(ns) {
    const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
    const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
    const data = ns.codingcontract.getData(filename, host);
    ns.tprint(_getCombinationSum(data[0], data[1]))
}

function _getCombinationSum(target, candidates) {
    let table = new Array(target + 1);
    table.fill(0);

    table[0] = 1;

    for(let i = 0; i < candidates.length; i++)
        for(let j = candidates[i]; j <= target; j++)
            table[j] += table[j - candidates[i]];

    return table[target];
}