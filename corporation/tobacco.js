/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("disableLog"); ns.disableLog("sleep");

	var corp = ns.corporation.getCorporation();

	while (true) {
		corp = ns.corporation.getCorporation();
		for (const division of corp.divisions.reverse()) {
			if (division != "Tobacco") {
				continue;
			}
			upgradeWarehouses(ns, division);
			upgradeCorp(ns);
			await hireEmployees(ns, division);
			// newProduct(ns, division);
			doResearch(ns, division);
		}
		// if (corp.divisions.length < 2 && corp.numShares == corp.totalShares) {
		// 	if (corp.divisions[0].products.length > 2) {
		// 		await trickInvest(ns, corp.divisions[0]);
		// 	}
		// }
		await ns.sleep(5000);
	}
}

async function hireEmployees(ns, division, productCity = "Sector-12") {
	var employees = ns.corporation.getOffice(division, productCity).numEmployees;
	while (ns.corporation.getCorporation().funds > (cities.length * ns.corporation.getOfficeSizeUpgradeCost(division, productCity, 3))) {
		// upgrade all cities + 3 employees if sufficient funds
		ns.print(division + " Upgrade office size");
		for (const city of cities) {
			ns.corporation.upgradeOfficeSize(division, city, 3);
			for (var i = 0; i < 3; i++) {
				await ns.corporation.hireEmployee(division, city);
			}
		}
	}
	if (ns.corporation.getOffice(division, productCity).numEmployees > employees) {
		// set jobs after hiring people just in case we hire lots of people at once and setting jobs is slow
		for (const city of cities) {
			employees = ns.corporation.getOffice(division, city).numEmployees;
			if (ns.corporation.hasResearched(division, "Market-TA.II")) {
				// TODO: Simplify here. ProductCity config can always be used
				if (city == productCity) {
					await ns.corporation.setAutoJobAssignment(division, city, "Operations", Math.ceil(employees / 5));
					await ns.corporation.setAutoJobAssignment(division, city, "Engineer", Math.ceil(employees / 5));
					await ns.corporation.setAutoJobAssignment(division, city, "Business", Math.ceil(employees / 5));
					await ns.corporation.setAutoJobAssignment(division, city, "Management", Math.ceil(employees / 10));
					var remainingEmployees = employees - (3 * Math.ceil(employees / 5) + Math.ceil(employees / 10));
					await ns.corporation.setAutoJobAssignment(division, city, "Training", Math.ceil(remainingEmployees));
				}
				else {
					await ns.corporation.setAutoJobAssignment(division, city, "Operations", Math.floor(employees / 10));
					await ns.corporation.setAutoJobAssignment(division, city, "Engineer", 1);
					await ns.corporation.setAutoJobAssignment(division, city, "Business", Math.floor(employees / 5));
					await ns.corporation.setAutoJobAssignment(division, city, "Management", Math.ceil(employees / 100));
					await ns.corporation.setAutoJobAssignment(division, city, "Research & Development", Math.ceil(employees / 2));
					var remainingEmployees = employees - (Math.floor(employees / 5) + Math.floor(employees / 10) + 1 + Math.ceil(employees / 100) + Math.ceil(employees / 2));
					await ns.corporation.setAutoJobAssignment(division, city, "Training", Math.floor(remainingEmployees));
				}
			}
			else {
				if (city == productCity) {
					await ns.corporation.setAutoJobAssignment(division, city, "Operations", Math.floor((employees - 2) / 2));
					await ns.corporation.setAutoJobAssignment(division, city, "Engineer", Math.ceil((employees - 2) / 2));
					await ns.corporation.setAutoJobAssignment(division, city, "Management", 2);
				}
				else {
					await ns.corporation.setAutoJobAssignment(division, city, "Operations", 1);
					await ns.corporation.setAutoJobAssignment(division, city, "Engineer", 1);
					await ns.corporation.setAutoJobAssignment(division, city, "Research & Development", (employees - 2));
				}
			}
		}
	}
}

function upgradeWarehouses(ns, division) {
	// for (const city of cities) {
	// 	// check if warehouses are near max capacity and upgrade if needed
	// 	var cityWarehouse = ns.corporation.getWarehouse(division, city);
	// 	if (cityWarehouse.sizeUsed > 0.9 * cityWarehouse.size) {
	// 		if (ns.corporation.getCorporation().funds > ns.corporation.getUpgradeWarehouseCost(division, city)) {
	// 			ns.print(division + " Upgrade warehouse in " + city);
	// 			ns.corporation.upgradeWarehouse(division, city);
	// 		}
	// 	}
	// }
	if (ns.corporation.getUpgradeLevel("Wilson Analytics") > 20) {
		// Upgrade AdVert.Inc after a certain amount of Wilson Analytivs upgrades are available
		if (ns.corporation.getCorporation().funds > (4 * ns.corporation.getHireAdVertCost(division))) {
			ns.print(division + " Hire AdVert");
			ns.corporation.hireAdVert(division);
		}
	}
}

function upgradeCorp(ns) {
	for (const upgrade of upgradeList) {
		// purchase upgrades based on available funds and priority; see upgradeList
		if (ns.corporation.getCorporation().funds > (upgrade.prio * ns.corporation.getUpgradeLevelCost(upgrade.name))) {
			// those two upgrades ony make sense later once we can afford a bunch of them and already have some base marketing from DreamSense
			if ((upgrade.name != "ABC SalesBots" && upgrade.name != "Wilson Analytics") || (ns.corporation.getUpgradeLevel("DreamSense") > 20)) {
				ns.print("Upgrade " + upgrade.name + " to " + (ns.corporation.getUpgradeLevel(upgrade.name) + 1));
				ns.corporation.levelUpgrade(upgrade.name);
			}
		}
	}
	if (!ns.corporation.hasUnlock("Shady Accounting") && ns.corporation.getUnlockCost("Shady Accounting") * 2 < ns.corporation.getCorporation().funds) {
		ns.print("Unlock Shady Accounting")
		ns.corporation.unlockUpgrade("Shady Accounting");
	}
	else if (!ns.corporation.hasUnlock("Government Partnership") && ns.corporation.getUnlockCost("Government Partnership") * 2 < ns.corporation.getCorporation().funds) {
		ns.print("Unlock Government Partnership")
		ns.corporation.unlockUpgrade("Government Partnership");
	}
}

async function trickInvest(ns, division, productCity = "Sector-12") {
	ns.print("Prepare to trick investors")

	let products = ns.corporation.getDivision(division).products
	for (var product of products) {
		// stop selling products
		ns.corporation.sellProduct(division, productCity, product, "0", "MP", true);
	}

	for (const city of cities) {
		// put all employees into production to produce as fast as possible 
		const employees = ns.corporation.getOffice(division, city).numEmployees;

		await ns.corporation.setAutoJobAssignment(division, city, "Engineer", 0);
		await ns.corporation.setAutoJobAssignment(division, city, "Management", 0);
		await ns.corporation.setAutoJobAssignment(division, city, "Research & Development", 0);
		await ns.corporation.setAutoJobAssignment(division, city, "Operations", employees - 2); // workaround for bug
		await ns.corporation.setAutoJobAssignment(division, city, "Operations", employees - 1); // workaround for bug
		await ns.corporation.setAutoJobAssignment(division, city, "Operations", employees);
	}

	ns.print("Wait for warehouses to fill up")
	//ns.print("Warehouse usage: " + refWarehouse.sizeUsed + " of " + refWarehouse.size);
	let allWarehousesFull = false;
	while (!allWarehousesFull) {
		allWarehousesFull = true;
		for (const city of cities) {
			if (ns.corporation.getWarehouse(division, city).sizeUsed <= (0.98 * ns.corporation.getWarehouse(division, city).size)) {
				allWarehousesFull = false;
				break;
			}
		}
		await ns.sleep(5000);
	}
	ns.print("Warehouses are full, start selling");

	var initialInvestFunds = ns.corporation.getInvestmentOffer().funds;
	ns.print("Initial investmant offer: " + ns.nFormat(initialInvestFunds, "0.0a"));
	for (const city of cities) {
		// put all employees into business to sell as much as possible 
		const employees = ns.corporation.getOffice(division, city).numEmployees;
		await ns.corporation.setAutoJobAssignment(division, city, "Operations", 0);
		await ns.corporation.setAutoJobAssignment(division, city, "Business", employees - 2); // workaround for bug
		await ns.corporation.setAutoJobAssignment(division, city, "Business", employees - 1); // workaround for bug
		await ns.corporation.setAutoJobAssignment(division, city, "Business", employees);
	}
	for (var product of products) {
		// sell products again
		ns.corporation.sellProduct(division, productCity, product, "MAX", "MP", true);
	}

	while (ns.corporation.getInvestmentOffer().funds < (4 * initialInvestFunds)) {
		// wait until the stored products are sold, which should lead to huge investment offers
		await ns.sleep(200);
	}

	ns.print("Investment offer for 10% shares: " + ns.nFormat(ns.corporation.getInvestmentOffer().funds, "0.0a"));
	ns.print("Funds before public: " + ns.nFormat(ns.corporation.getCorporation().funds, "0.0a"));

	ns.corporation.goPublic(800e6);

	ns.print("Funds after  public: " + ns.nFormat(ns.corporation.getCorporation().funds, "0.0a"));

	for (const city of cities) {
		// set employees back to normal operation
		const employees = ns.corporation.getOffice(division, city).numEmployees;
		await ns.corporation.setAutoJobAssignment(division, city, "Business", 0);
		if (city == productCity) {
			await ns.corporation.setAutoJobAssignment(division, city, "Operations", 1);
			await ns.corporation.setAutoJobAssignment(division, city, "Engineer", (employees - 2));
			await ns.corporation.setAutoJobAssignment(division, city, "Management", 1);
		}
		else {
			await ns.corporation.setAutoJobAssignment(division, city, "Operations", 1);
			await ns.corporation.setAutoJobAssignment(division, city, "Research & Development", (employees - 1));
		}
	}

	// with gained money, expand to the most profitable division
	ns.corporation.expandIndustry("Healthcare", "Healthcare");
	await initCities(ns, ns.corporation.getCorporation().divisions[1]);
}

function doResearch(ns, division) {
	const laboratory = "Hi-Tech R&D Laboratory"
	const marketTAI = "Market-TA.I";
	const marketTAII = "Market-TA.II";
	let researchPoints = ns.corporation.getDivision(division).researchPoints
	let products = ns.corporation.getDivision(division).products
	if (!ns.corporation.hasResearched(division, laboratory)) {
		// always research labaratory first
		if (researchPoints > ns.corporation.getResearchCost(division, laboratory)) {
			ns.print(division + " Research " + laboratory);
			ns.corporation.research(division, laboratory);
		}
	}
	else if (!ns.corporation.hasResearched(division, marketTAII)) {
		// always research Market-TA.I plus .II first and in one step
		var researchCost = ns.corporation.getResearchCost(division, marketTAI)
			+ ns.corporation.getResearchCost(division, marketTAII);

		if (researchPoints > researchCost * 1.1) {
			ns.print(division + " Research " + marketTAI);
			ns.corporation.research(division, marketTAI);
			ns.print(division + " Research " + marketTAII);
			ns.corporation.research(division, marketTAII);
			for (var product of products) {
				ns.corporation.setProductMarketTA1(division, product, true);
				ns.corporation.setProductMarketTA2(division, product, true);
			}
		}
		return;
	}
	else {
		for (const researchObject of researchList) {
			// research other upgrades based on available funds and priority; see researchList
			if (!ns.corporation.hasResearched(division, researchObject.name)) {
				if (researchPoints > (researchObject.prio * ns.corporation.getResearchCost(division, researchObject.name))) {
					ns.print(division + " Research " + researchObject.name);
					ns.corporation.research(division, researchObject.name);
				}
			}
		}
	}
}

function newProduct(ns, division) {
	var productNumbers = [];
	let products = ns.corporation.getDivision(division).products
	//ns.print("Products: " + products);
	for (var product of products) {
		if (ns.corporation.getProduct(division, product).developmentProgress < 100) {
			ns.print(division + " Product development progress: " + ns.corporation.getProduct(division, product).developmentProgress.toFixed(1) + "%");
			return false;
		}
		else {
			productNumbers.push(product.charAt(product.length - 1));
			// initial sell value if nothing is defined yet is 0
			if (ns.corporation.getProduct(division, product).sCost == 0) {
				ns.print(division + " Start selling product " + product);
				ns.corporation.sellProduct(division, "Sector-12", product, "MAX", "MP", true);
				if (ns.corporation.hasResearched(division, "Market-TA.II")) {
					ns.corporation.setProductMarketTA1(division, product, true);
					ns.corporation.setProductMarketTA2(division, product, true);
				}
			}
		}
	}

	var numProducts = 3;
	// amount of products which can be sold in parallel is 3; can be upgraded
	if (ns.corporation.hasResearched(division, "uPgrade: Capacity.I")) {
		numProducts++;
		if (ns.corporation.hasResearched(division, "uPgrade: Capacity.II")) {
			numProducts++;
		}
	}

	if (productNumbers.length >= numProducts) {
		// discontinue the oldest product if over max amount of products
		ns.print(division + " Discontinue product " + products[0]);
		ns.corporation.discontinueProduct(division, products[0]);
	}

	// get the product number of the latest product and increase it by 1 for the mext product. Product names must be unique. 
	var newProductNumber = 0;
	if (productNumbers.length > 0) {
		newProductNumber = parseInt(productNumbers[productNumbers.length - 1]) + 1;
		// cap product numbers to one digit and restart at 0 if > 9.
		if (newProductNumber > 9) {
			newProductNumber = 0;
		}
	}
	const newProductName = "Product-" + newProductNumber;
	var productInvest = 1e9;
	if (ns.corporation.getCorporation().funds < (2 * productInvest)) {
		if (ns.corporation.getCorporation().funds <= 0) {
			ns.print("WARN negative funds, cannot start new product development " + ns.nFormat(ns.corporation.getCorporation().funds, "0.0a"));
			return;
			// productInvest = 0; // product development with 0 funds not possible if corp has negative funds
		}
		else {
			productInvest = Math.floor(ns.corporation.getCorporation().funds / 2);
		}
	}
	ns.print("Start new product development " + newProductName);
	ns.corporation.makeProduct(division, "Sector-12", newProductName, productInvest, productInvest);
}

async function initCities(ns, division, productCity = "Sector-12") {
	let cities = ns.corporation.getDivision(division).cities
	for (const city of cities) {
		ns.print("Expand " + division + " to City " + city);
		if (!cities.includes(city)) {
			ns.corporation.expandCity(division, city);
			ns.corporation.purchaseWarehouse(division, city);
		}

		//ns.corporation.setSmartSupply(division, city, true); // does not work anymore, bug?

		if (city != productCity) {
			// setup employees
			for (let i = 0; i < 3; i++) {
				await ns.corporation.hireEmployee(division, city);
			}
			await ns.corporation.setAutoJobAssignment(division, city, "Research & Development", 3);
		}
		else {
			const warehouseUpgrades = 3;
			// get a bigger warehouse in the product city. we can produce and sell more here
			for (let i = 0; i < warehouseUpgrades; i++) {
				ns.corporation.upgradeWarehouse(division, city);
			}
			// get more employees in the main product development city
			const newEmployees = 9;
			ns.corporation.upgradeOfficeSize(division, productCity, newEmployees);
			for (let i = 0; i < newEmployees + 3; i++) {
				await ns.corporation.hireEmployee(division, productCity);
			}
			await ns.corporation.setAutoJobAssignment(division, productCity, "Operations", 4);
			await ns.corporation.setAutoJobAssignment(division, productCity, "Engineer", 6);
			await ns.corporation.setAutoJobAssignment(division, productCity, "Management", 2);
		}
		const warehouseUpgrades = 3;
		for (let i = 0; i < warehouseUpgrades; i++) {
			ns.corporation.upgradeWarehouse(division, city);
		}
	}

	ns.corporation.makeProduct(division, productCity, "Product-0", "1e9", "1e9");
}

async function initialCorpUpgrade(ns) {
	ns.print("unlock upgrades");
	ns.corporation.unlockUpgrade("Smart Supply");
	ns.corporation.levelUpgrade("Smart Storage");
	ns.corporation.levelUpgrade("Smart Storage");
	ns.corporation.levelUpgrade("Smart Storage");
	ns.corporation.levelUpgrade("Smart Storage");
	ns.corporation.levelUpgrade("DreamSense");
	// upgrade employee stats
	ns.corporation.levelUpgrade("Nuoptimal Nootropic Injector Implants");
	ns.corporation.levelUpgrade("Speech Processor Implants");
	ns.corporation.levelUpgrade("Neural Accelerators");
	ns.corporation.levelUpgrade("FocusWires");
}

const cities = ["Sector-12", "Aevum", "Volhaven", "Chongqing", "New Tokyo", "Ishima"];

const upgradeList = [
	// lower priority value -> upgrade faster
	{ prio: 2, name: "Project Insight", },
	{ prio: 2, name: "DreamSense" },
	{ prio: 4, name: "ABC SalesBots" },
	{ prio: 4, name: "Smart Factories" },
	{ prio: 4, name: "Smart Storage" },
	{ prio: 8, name: "Neural Accelerators" },
	{ prio: 8, name: "Nuoptimal Nootropic Injector Implants" },
	{ prio: 8, name: "FocusWires" },
	{ prio: 8, name: "Speech Processor Implants" },
	{ prio: 8, name: "Wilson Analytics" },
];

const researchList = [
	// lower priority value -> upgrade faster
	{ prio: 10, name: "Overclock" },
	// { prio: 10, name: "uPgrade: Fulcrum" },
	// { prio: 3, name: "uPgrade: Capacity.I" },
	// { prio: 4, name: "uPgrade: Capacity.II" },
	{ prio: 10, name: "Self-Correcting Assemblers" },
	{ prio: 21, name: "Drones" },
	{ prio: 4, name: "Drones - Assembly" },
	{ prio: 10, name: "Drones - Transport" },
	{ prio: 26, name: "Automatic Drug Administration" },
	{ prio: 10, name: "CPH4 Injections" },
];