/** @param {NS} ns */
export async function main(ns) {
    const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
    const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
    const data = ns.codingcontract.getData(filename, host);
    ns.tprint(arrayJumpingGameII(data))
}

export function arrayJumpingGameII(input) {
    var length_input = input.length;
    var [i, jump, lastPos, maxPos] = [0,0,0,0];

    while (i < length_input - 1) {
        maxPos = Math.max(maxPos, i + input[i]);
        if (i == lastPos) {
            lastPos = maxPos;
            jump += 1;
        }
        i += 1;
    }

    return jump;
}