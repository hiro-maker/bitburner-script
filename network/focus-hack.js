const earlyHack = "/network/early-hack.js"
/** @param {NS} ns */
export async function main(ns) {
    const host = ns.getHostname()
    const target = ((args0) => args0 !== undefined ? args0 : host)(ns.args[0])
    const maxRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host) - ns.getScriptRam(ns.getScriptName())
    const scriptRam = ns.getScriptRam(earlyHack)
    const threads = maxRam / scriptRam;
    ns.run(earlyHack, threads, target, false)
}