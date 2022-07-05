const charge = "/stanek/charge.js"
/** @param {NS} ns */
export async function main(ns) {
    const host = ns.getHostname()
    const maxRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host) - ns.getScriptRam(ns.getScriptName())
    const scriptRam = ns.getScriptRam(charge)
    const threads = maxRam / scriptRam;
    ns.run(charge, threads)
}