/** @param {NS} ns **/
export async function main(ns) {
    const upgradeName = "Sell for Money"
    while (true) {
        if (ns.hacknet.numHashes() > ns.hacknet.hashCost(upgradeName)) {
            ns.hacknet.spendHashes(upgradeName);
        }
        await ns.sleep(200);
    }
}

