/** @param {NS} ns */
export async function main(ns) {
    const jsonString = JSON.stringify(ns.getPlayer());
    const json = JSON.parse(jsonString);
    Object.keys(json).forEach(function (key) {
        ns.tprint([key] + ": " + json[key]);
    });
}