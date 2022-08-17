const cities = ["Aevum", "Sector-12", "Volhaven", "Chongqing", "New Tokyo", "Ishima"];
const jobNames = ["Operations", "Engineer", "Business", "Management", "Research & Development"]
const tobacco = "Tobacco";

/** @param {NS} ns **/
export async function main(ns) {

    const corp = ns.corporation
    const isBonusTime = corp.getBonusTime() > 10 * 1000
    const waitTime = isBonusTime ? 1 : 10

    // Expand "Tobacco".
    corp.expandIndustry(tobacco, tobacco)

    // Expand All City.
    for (const cityName of cities) {
        if (corp.getDivision(tobacco).cities.indexOf(cityName) == -1) {
            await corp.expandCity(tobacco, cityName)
        }

        if (cities[0] == cityName) {
            const employeesSize = 30;
            const jobSize = 6
            await corp.upgradeOfficeSize(tobacco, cityName, employeesSize - 3)
            for (var i = 0; i <= employeesSize; i++) {
                const employee = await corp.hireEmployee(tobacco, cityName);
                if (employee !== undefined) {
                    const jobName = jobNames[Math.floor(i / jobSize)]
                    await corp.assignJob(tobacco, cityName, employee.name, jobName)
                }
            }
        } else {
            const employeesSize = 9;
            await corp.upgradeOfficeSize(tobacco, cityName, employeesSize)
            var jobName = ""
            for (var i = 0; i <= employeesSize; i++) {
                const employee = await corp.hireEmployee(tobacco, cityName);
                if (4 >= i) {
                    jobName = jobNames[i]
                } else {
                    var index = 5
                    if (7 == i) {
                        continue
                    }
                    jobName = jobNames[i - index]
                }
                await corp.assignJob(tobacco, cityName, employee.name, jobName)
            }
        }
    }
}