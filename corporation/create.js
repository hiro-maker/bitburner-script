const cities = ["Sector-12", "Aevum", "Volhaven", "Chongqing", "New Tokyo", "Ishima"];
const members = ["Operations", "Engineer", "Business", "Management", "Research & Development"]
const materials = ["Hardware", "Robots", "AI Cores", "Real Estate"];
const agriculture = "Agriculture";

/** @param {NS} ns **/
export async function main(ns) {
     //check has WarehouseAPI, OfficeAPI

     // Warehouse API $50b
     // Office API $50b

     const corp = ns.corporation
     const isBonusTime = corp.getBonusTime() > 10 *1000
     const waitTime = isBonusTime ? 1 : 10

     // // Create Corp.
     // corp.createCorporation("MyCorp")

     // // Expand "Agriculture".
     // corp.expandIndustry(agriculture, agriculture)

     // Unlock "Smart Supply"
     const smartSupply = "Smart Supply"
     if (!corp.hasUnlockUpgrade(smartSupply)) {
          await corp.unlockUpgrade("Smart Supply")
     }

     // Expand All City.
     for (const index in cities) {
          const cityName = cities[index]
          if (corp.getDivision(agriculture).cities.indexOf(cityName) == -1) {
               await corp.expandCity(agriculture, cityName)
               await corp.purchaseWarehouse(agriculture, cityName)
          }
          // Applay "Smart Supply"(WarehouseAPI)
          await corp.setSmartSupply(agriculture, cityName, true)

          // Assign members(OfficeAPI)
          // loop is 3 count("Operations", "Engineer", "Business")
          for (var i = 0; i <= 3; i++) {
               const employee = await corp.hireEmployee(agriculture, cityName);
               if (employee !== undefined) {
                    await corp.assignJob(agriculture, cityName, employee.name, members[i])
               }
          }

          // Upgrade each office’s Storage to 300(WarehouseAPI)
          await corp.upgradeWarehouse(agriculture, cityName, 2)

          // Selling material(WarehouseAPI)
          await corp.sellMaterial(agriculture, cityName, "Plants", "MAX", "MP")
          await corp.sellMaterial(agriculture, cityName, "Food", "MAX", "MP")
     }
     corp.hireAdVert(agriculture)

     // Grow Corp
     const upgrads = ["FocusWires", "Neural Accelerators", "Speech Processor Implants", "Nuoptimal Nootropic Injector Implants", "Smart Factories"]
     for (const upgrad of upgrads) {
          for (let i = 0; i < 2; i++) {
               corp.levelUpgrade(upgrad)
          }
     }

     // first buy material
     for (const cityName of cities) {
          for (const material of materials) {
               switch (material) {
                    case "Hardware":
                         await corp.buyMaterial(agriculture, cityName, material, 12.5);
                         break
                    case "AI Cores":
                         await corp.buyMaterial(agriculture, cityName, material, 7.5)
                         break
                    case "Real Estate":
                         await corp.buyMaterial(agriculture, cityName, material, 2700)
                         break
               }
          }
     }
     await ns.sleep(waitTime * 1000);
     for (const cityName of cities) {
          for (const material of materials) {
               await corp.buyMaterial(agriculture, cityName, material, 0)
          }
     }

     // // TODO check employees
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

     // // Find Investors($210b)
     // await corp.acceptInvestmentOffer()

     // // upgrade office size(9)
     // for (const cityName of cities) {
     //      const size = 6
     //      await corp.upgradeOfficeSize(agriculture, cityName, size)
     //      for (var i = 0; i <= size; i++) {
     //           const employee = await corp.hireEmployee(agriculture, cityName);
     //           if (employee !== undefined) {
     //                var member = ""
     //                switch (i) {
     //                     case 0:
     //                     case 1:
     //                     case 3:
     //                     case 4:
     //                          member = members[i]
     //                          break
     //                     case 2:
     //                          member = members[i + 1]
     //                          break
     //                     case 5:
     //                          member = members[i - 1]
     //                          break
     //                }
     //                await corp.assignJob(agriculture, cityName, employee.name, member)
     //           }
     //      }
     // }

     // // upgrade Smart Factories and Smart Storage.
     // const smartUpgrads = ["Smart Factories", "Smart Storage"]
     // for (const upgrad of smartUpgrads) {
     //      for (var i = 0; i <= 10; i++) {
     //           corp.levelUpgrade(upgrad)
     //      }
     // }

     // // Upgrade each office’s Storage to 2k(WarehouseAPI)
     // for (const cityName of cities) {
     //      await corp.upgradeWarehouse(agriculture, cityName, 7)
     // }

     // // second buy material
     // for (const cityName of cities) {
     //      for (const material of materials) {
     //           switch (material) {
     //                case "Hardware":
     //                     await corp.buyMaterial(agriculture, cityName, material, 267.5);
     //                     break
     //                case "Robots":
     //                     await corp.buyMaterial(agriculture, cityName, material, 9.6);
     //                     break
     //                case "AI Cores":
     //                     await corp.buyMaterial(agriculture, cityName, material, 244.5);
     //                     break
     //                case "Real Estate":
     //                     await corp.buyMaterial(agriculture, cityName, material, 11940);
     //                     break
     //           }
     //      }
     // }
     // await ns.sleep(waitTime * 1000);
     // for (const cityName of cities) {
     //      for (const material of materials) {
     //           corp.buyMaterial(agriculture, cityName, material, 0)
     //      }
     // }

     // // Find Investors($5t)
     // await corp.acceptInvestmentOffer()

     // // Upgrade each office’s Storage to 2k(WarehouseAPI)
     // for (const cityName of cities) {
     //      await corp.upgradeWarehouse(agriculture, cityName, 9)
     // }

     // // final buy material
     // for (const cityName of cities) {
     //      for (const material of materials) {
     //           switch (material) {
     //                case "Hardware":
     //                     corp.buyMaterial(agriculture, cityName, material, 650)
     //                     break
     //                case "Robots":
     //                     corp.buyMaterial(agriculture, cityName, material, 63)
     //                     break
     //                case "AI Cores":
     //                     corp.buyMaterial(agriculture, cityName, material, 375)
     //                     break
     //                case "Real Estate":
     //                     corp.buyMaterial(agriculture, cityName, material, 8400)
     //                     break
     //           }
     //      }
     // }
     // await ns.sleep(waitTime * 1000);
     // for (const cityName of cities) {
     //      for (const material of materials) {
     //           corp.buyMaterial(agriculture, cityName, material, 0)
     //      }
     // }


     /*
     Hardware
     125+2675+6500=9300
     Robots
     96+630=726
     AI Cores
     75+2445+3750=6270
     Real Estate
     27000+119400+84000=230400
     */
}