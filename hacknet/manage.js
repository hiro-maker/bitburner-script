/** @param {NS} ns **/
export async function main(ns) {
	while (true) {
		let numNodes = await ns.hacknet.numNodes();
		for (var i = 0; i < numNodes; i++) {
			if (await ns.getPlayer().money > await ns.hacknet.getLevelUpgradeCost(i, 10)) {
				await ns.hacknet.upgradeLevel(i, 10);
				continue;
			}
			if (await ns.getPlayer().money > await ns.hacknet.getRamUpgradeCost(i, 1)) {
				await ns.hacknet.upgradeRam(i, 1);
				continue;
			}
			if (await ns.getPlayer().money > await ns.hacknet.getCoreUpgradeCost(i, 1)) {
				await ns.hacknet.upgradeCore(i, 1);
				continue;
			}
		}
		if (numNodes < 20 && await ns.getPlayer().money > await ns.hacknet.getPurchaseNodeCost()) {
			await ns.hacknet.purchaseNode();
		}
		await ns.sleep(1000);
	}
}