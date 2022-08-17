/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0]
    const position = ns.args[1]
    var threads = ns.args[2]
    if (target === undefined || position === undefined) {
        return
    }

    if (threads === undefined) {
        threads = calThreads(ns);
        ns.run(ns.getScriptName(), threads, target, position, threads)
    } else {
        while (true) {
            chekcPort(ns)
            const opt = { stock: true };
            if (position == "-l") {
                await ns.grow(target, opt)
            } else if (position == "-s") {
                await ns.hack(target, opt)
            }
        }
    }
}

function calThreads(ns) {
    const host = ns.getHostname()
    const scriptRam = ns.getScriptRam(ns.getScriptName())
    const maxRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host) - scriptRam
    return maxRam / scriptRam;
}

function chekcPort(ns) {
    var growStockPort = ns.getPortHandle(1); // port 1 is grow
    var hackStockPort = ns.getPortHandle(2); // port 2 is hack
    ns.print(growStockPort.read())
    ns.print(hackStockPort.read())
}