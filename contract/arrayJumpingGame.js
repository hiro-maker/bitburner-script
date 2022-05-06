/** @param {NS} ns */
export async function main(ns) {
    const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
    const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
    const data = ns.codingcontract.getData(filename, host);
    ns.tprint(arrayJumpingGame(data))
}

export function arrayJumpingGame(input) {
    let len = input.length - 1, curr = -1, next = 0, ans = 0
    for (let i = 0; next < len; i++) {
        if (i > curr) ans++, curr = next
        next = Math.max(next, input[i] + i)
    }
    return ans
}