/** @param {NS} ns */
export async function main(ns) {
    const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
    const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
    const data = ns.codingcontract.getData(filename, host);
    ns.tprint(totalWaysToSum(data))
}

function totalWaysToSum(data) {
    const ways = [1];
    ways.length = data + 1;
    ways.fill(0, 1);
    for (let i = 1; i < data; ++i) {
        for (let j = i; j <= data; ++j) {
            ways[j] += ways[j - i];
        }
    }
    return ways[data];
}