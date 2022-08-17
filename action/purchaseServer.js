/** @param {NS} ns */
export async function main(ns) {
    var option = ns.args[0]
    var ram = ns.args[1]
    if (option === undefined || ram === undefined) {
        ns.tprint("No args.Amount of RAM of the purchased server, in GB. Must be a power of 2 (2, 4, 8, 16, etc.). Maximum value of 1048576 (2^20).")
    } else if (option == "-i") {
        ns.tprint(ns.getPurchasedServerCost(ram))
    } else if (option == "-b") {
        ns.purchaseServer("home", ram)
    }
}