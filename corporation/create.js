const cities = ["Sector-12", "Aevum", "Volhaven", "Chongqing", "New Tokyo", "Ishima"];
const materials = ["Hardware", "AI Cores", "Real Estate"];
const agriculture = "Agriculture";

/** @param {NS} ns **/
export async function main(ns) {
     //check has WarehouseAPI, OfficeAPI

     // Warehouse API $50b
     // Office API $50b

     const corp = ns.corporation
     // Create Corp.
     // corp.createCorporation("MyCorp")

     // // Expand "Agriculture".
     // // corp.expandIndustry(agriculture, agriculture)

     // Unlock "Smart Supply"
     // const smartSupply = "Smart Supply"
     // if (!corp.hasUnlockUpgrade(smartSupply)) {
     //      await corp.unlockUpgrade("Smart Supply")
     // }

     // // Expand All City.
     // for (const index in cities) {
     //      const cityName = cities[index]
     //      if (corp.getDivision(agriculture).cities.indexOf(cityName) == -1) {
     //           await corp.expandCity(agriculture, cityName)
     //           await corp.purchaseWarehouse(agriculture, cityName)
     //      }
     //      // Applay "Smart Supply"(WarehouseAPI)
     //      await corp.setSmartSupply(agriculture, cityName, true)

     //      // Assign members(OfficeAPI)
     //      const members = ["Operations", "Engineer", "Business"]
     //      for (const member of members) {
     //           const employee = await corp.hireEmployee(agriculture, cityName);
     //           if (employee !== undefined) {
     //                await corp.assignJob(agriculture, cityName, employee.name, member)
     //           }
     //      }

     //      // Upgrade each office’s Storage to 300(WarehouseAPI)
     //      await corp.upgradeWarehouse(agriculture, cityName, 2)

     //      // Selling material(WarehouseAPI)
     //      await corp.sellMaterial(agriculture, cityName, "Plants", "MAX", "MP")
     //      await corp.sellMaterial(agriculture, cityName, "Food", "MAX", "MP")
     // }
     // corp.hireAdVert(agriculture)

     // // Grow Corp
     // const upgrads = ["FocusWires", "Neural Accelerators", "Speech Processor Implants", "Nuoptimal Nootropic Injector Implants", "Smart Factories"]
     // for (const upgrad of upgrads) {
     //      for (let i = 0; i < 2; i++) {
     //           corp.levelUpgrade(upgrad)
     //      }
     // }

     // // first buy material
     // for (const cityName of cities) {
     //      for (const material of materials) {
     //           switch (material) {
     //                case "Hardware":
     //                     corp.buyMaterial(agriculture, cityName, material, 12.5)
     //                     break
     //                case "AI Cores":
     //                     corp.buyMaterial(agriculture, cityName, material, 7.5)
     //                     break
     //                case "Real Estate":
     //                     corp.buyMaterial(agriculture, cityName, material, 2700)
     //                     break
     //           }
     //      }
     // }
     // await ns.sleep(1000);
     // for (const cityName of cities) {
     //      for (const material of materials) {
     //           switch (material) {
     //                case "Hardware":
     //                     corp.buyMaterial(agriculture, cityName, material, 0)
     //                     break
     //                case "AI Cores":
     //                     corp.buyMaterial(agriculture, cityName, material, 0)
     //                     break
     //                case "Real Estate":
     //                     corp.buyMaterial(agriculture, cityName, material, 0)
     //                     break
     //           }
     //      }
     // }

     // // check employees
     // var canPhase2 = false
     // while (true) {
     //      for (const cityName of cities) {
     //           const office = corp.getOffice(agriculture, cityName)
     //           canPhase2 = 100 <= office.maxMor
     //           if (canPhase2) {
     //                canPhase2 = 99 < office.maxHap
     //           }
     //           if (canPhase2) {
     //                canPhase2 = 99 < office.maxEne
     //           }
     //      }
     //      if (canPhase2) {
     //           break
     //      } else {
     //           await ns.sleep(5 * 1000)
     //      }
     // }

     // Find Investors
     corp.acceptInvestmentOffer()


     /*

Now you want to Upgrade the size of each office and increase the staff to 9 employees. You should end up with:

Operations (2)
Engineer (2)
Business (1)
Management (2)
Research & Development (2)
If everything went according to plan above, you’ve now got about $160b left over. Now it’s time to ratchet this thing up to the peaks!

Upgrade each of Smart Factories and Smart Storage to level 10 to increase productivity and give your offices more room to store all the new stuff. This should leave you with about $110b.

Upgrade Warehouse Sizes directly 7 times for each office, for a new grand total storage of 2k at all locations, leaving around $45b to work with. Now to use some of that new space!

We’re gonna do that thing again where we Buy some exact amounts of materials, one tick at a time. Here’s what we need at each office:

Hardware at 267.5/s for one tick to get to 125 + 2675 = 2800
Robots at 9.6/s for one tick to get to 96
AI Cores at 244.5/s for one tick to get to 75 + 2445 = 2520
Real Estate at 11940/s for one tick to get to 27000 + 119400 = 146400
With all this additional production, and thus revenue, let’s see if we can Find Investors again; spoiler alert: we can, and this time it should be about $5t. Nice.

Let’s get a bit more storage space, say 9 Warehouse Size upgrades per office for another 1.8k storage each, bringing them to 3.8k total.

Now we’ll get some more materials to fill up all that space we bought before. You know the drill, so here’s the shopping list for each office:

Hardware at 650/s for one tick to 2800 + 6500 = 9300
Robots at 63/s for one tick to 96 + 630 = 726
AI Cores at 375/s for one tick to 2520 + 3750 = 6270
Real Estate at 8400/s for one tick to 146400 + 84000 = 230400
This should get the Production Multiplier over 500. Neat.

     */
}