const cities = ["Sector-12", "Aevum", "Volhaven", "Chongqing", "New Tokyo", "Ishima"];

/** @param {NS} ns **/
export async function main(ns) {
     //check has WarehouseAPI, OfficeAPI

     // Warehouse API $50b
     // Office API $50b

     const corp = ns.corporation
     // Create Corp.
     corp.createCorporation("MyCorp")

     // Expand "Agriculture".
     const agriculture = "Agriculture"
     corp.expandIndustry(agriculture, agriculture)

     // Unlock "Smart Supply"
     corp.unlockUpgrade("Smart Supply")

     // Expand All City.
     for (cityName in cities) {
          corp.expandCity(agriculture, cityName)

          // Applay "Smart Supply"(WarehouseAPI)
          corp.setSmartSupply(agriculture, cityName, true)

          // Assign members(OfficeAPI)
          const members = ["Operations", "Engineer", "Business"]
          corp.upgradeOfficeSize(agriculture, cityName, 3)
          members.forEach(function (element) {
               const employeeName = corp.hireEmployee(agriculture, cityName).name
               corp.assignJob(agriculture, cityName, employeeName, element)
          });

          // Upgrade each office’s Storage to 300(WarehouseAPI)
          corp.upgradeWarehouse(agriculture, cityName, 3)

          // Selling material(WarehouseAPI)
          corp.sellMaterial(divisionName, cityName, "Plants", "MAX", "MP")
          corp.sellMaterial(divisionName, cityName, "Food", "MAX", "MP")
     }
     corp.hireAdVert(agriculture)

     // Grow Corp
     const upgrads = ["FocusWires", "Neural Accelerators", "Speech Processor Implants", "Nuoptimal Nootropic Injector Implants", "Smart Factories"]
     for (upgrad in upgrads) {
          for (let i = 0; i < 2; i++) {
               corp.levelUpgrade(upgrad)
          }
     }
     /*
Now we want to get some more materials to help make products and run the business better. You’ve noticed by now that the list values change on a timed basis, corresponding to the Current state of the market cycle shown at the top of the list. We need to be ready to make a change within one tick, but it’s long enough that it shouldn’t be hard (10s). The general process is:

Click Buy (0.000)
Enter the number of items to purchase per second
Click Confirm
Watch the item amount on the left (e.g., Material:  AMOUNT (RATE)) and the moment it changes to our desired value, just click the button to buy again and click Clear Purchase
We’re going to buy 3 things for each office:

Hardware at 12.5/s for one tick to 125 total
AI Cores at 7.5/s for one tick to 75 total
Real Estate at 2.7k/s (that’s twenty-seven hundred, 2 700, 2.7×103) for one tick to 27k total
When they start, employee Morale, Happiness, and Energy will be fair-to-middlin’, but they’ll improve with time. You should wait for the values to hit the following before proceeding:

Avg Employee Morale: 100.000
Avg Employee Happiness: 99.998 (or higher)
Avg Employee Energy: 99.998 (or higher)
Workers should be allowed to reach these values whenever they’re hired, but note that this requires the company to be earning income. This will make sure they’re contributing their best work, and is a good way to squeeze out a couple extra bucks. This will be relevant very soon…

Now the Profit ought to be humming along, rocking steady at about $1.5m/s, and your corporation is looking nice; I bet there’s someone out there who’ll want to invest! Head back to the main tab and Find Investors. You ought to catch a bid of around $210b or so. Cool.

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