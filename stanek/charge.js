// adjacent fragment power
const AFPtype = 18

/** @param {NS} ns */
export async function main(ns) {
    const stanek = ns.stanek
    while (true) {
        for (const fragment of stanek.activeFragments()) {
            if (AFPtype != fragment["type"]) {
                await stanek.chargeFragment(
                    fragment["x"],
                    fragment["y"]
                )
            }
        }
    }
}