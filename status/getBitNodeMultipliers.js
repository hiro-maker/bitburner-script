/** @param {NS} ns */
export async function main(ns) {
    const hasSF5 =  ns.getOwnedSourceFiles().filter(sourceFile => JSON.parse(JSON.stringify(sourceFile)).n == 5).length == 1;
    const isNode5 = ns.getPlayer().bitNodeN == 5
    if (!hasSF5 && !isNode5) {
        ns.tprint("can not getBitNodeMultipliers().")
        return
    }

    const isDifference = ns.args[0]

    const jsonString = JSON.stringify(ns.getBitNodeMultipliers());
    const json = JSON.parse(jsonString);
    Object.keys(json).forEach(function (key) {
        if (isDifference === undefined || json[key] != 1) {
            ns.tprint([key] + ": " + json[key]);
        }
    });
}