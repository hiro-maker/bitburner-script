/** @param {NS} ns */
export async function main(ns) {
    const singularity = ns.singularity
    const host = ns.args[0]
    while (true) {
        if (singularity.getCurrentServer() == host || singularity.connect(host)) {
            await singularity.manualHack()
        } else {
            ns.tprint("Failed Connect.")
            return
        }
    }
}