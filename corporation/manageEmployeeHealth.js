/** @param {NS} ns **/
export async function main(ns) {
	const corp = ns.corporation
	while (true) {
		var corporation = corp.getCorporation();
		for (const divisionName of corporation.divisions) {
			const division = corp.getDivision(divisionName)
			for (const citieName of division.cities) {
				const office = corp.getOffice(divisionName, citieName)
				if (office.avgEnergy <= 95) {
					await corp.buyTea(divisionName, citieName)
				}
				if (office.avgMorale <= 90) {
					await corp.throwParty(divisionName, citieName, 1 * 1000 * 1000)
				}
			}
		}
		await ns.sleep(5 * 1000);
	}
}