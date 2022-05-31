/** @param {NS} ns **/
export async function main(ns) {
	const hacknet = ns.hacknet
	while (true) {
		let numNodes = await hacknet.numNodes();
		for (const index in ns.args) {
			const upgradeName = ns.args[index]
			if (hacknet.numHashes() > hacknet.hashCost(upgradeName)) {
				hacknet.spendHashes(upgradeName);
			}
		}
		for (var i = 0; i < numNodes; i++) {
			if (hacknet.getNodeStats(i).level <= 30
				&& await ns.getPlayer().money > await hacknet.getLevelUpgradeCost(i, 1)) {
				await hacknet.upgradeLevel(i, 1);
				continue;
			} else if (await ns.getPlayer().money > await hacknet.getLevelUpgradeCost(i, 10)) {
				await hacknet.upgradeLevel(i, 10);
				continue;
			}
			if (await ns.getPlayer().money > await hacknet.getRamUpgradeCost(i, 1)) {
				await hacknet.upgradeRam(i, 1);
				continue;
			}
			if (await ns.getPlayer().money > await hacknet.getCoreUpgradeCost(i, 1)) {
				await hacknet.upgradeCore(i, 1);
				continue;
			}
			if (await ns.getPlayer().money > await hacknet.getCacheUpgradeCost(i, 1)) {
				await hacknet.upgradeCache(i, 1);
				continue;
			}
		}
		if (numNodes < 20 && await ns.getPlayer().money > await hacknet.getPurchaseNodeCost()) {
			await hacknet.purchaseNode();
		}
		await ns.sleep(1000);
	}
}