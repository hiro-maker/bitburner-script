/** @param {NS} ns */
export async function main(ns) {
    const target = ((args0) => args0 !== undefined ? args0 : ns.getHostname())(ns.args[0])
    const isHackOnly = ((args1) => args1 !== undefined ? args1 : false)(ns.args[1])
    while(true) {
        ns.print("---start---")
        if (!isHackOnly && ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target) + 5) {
            await ns.weaken(target);
        } else if (!isHackOnly && ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target) * 0.75) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}