/** @param {NS} ns */
export async function main(ns) {
    const stanek = ns.stanek
    ns.tprint(stanek.activeFragments())
}