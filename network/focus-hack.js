/** @param {NS} ns */
export async function main(ns) {
    const earlyHack = "/network/early-hack.js"
    const target = ((args0) => args0 !== undefined ? args0 : ns.getHostname())(ns.args[0])
    const maxRam = ns.getServerMaxRam(ns.getHostname()) - ns.getScriptRam(ns.getScriptName())
    const scriptRam = ns.getScriptRam(earlyHack)
    const threads = maxRam / scriptRam;
    ns.run(earlyHack, threads, target, false)
}