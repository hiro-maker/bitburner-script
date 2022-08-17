/** @param {NS} ns */
export async function main(ns) {
    if (ns.singularity.purchaseTor()) {
        ns.tprint("Bought TOR Router.")
    } else {
        ns.tprint("Failed buy TOR Router. " + ns.getPlayer().money + "$")
    }
}