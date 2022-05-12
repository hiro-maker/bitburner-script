const crimes = ["shoplift", "rob store", "mug", "larceny", "deal drugs", "bond forgery", "traffick arms", "homicide", "grand theft auto", "kidnap", "assassinate", "heist"]
/** @param {NS} ns */
export async function main(ns) {
    const singularity = ns.singularity
    var crimeName = ns.args[0]
    if (crimeName === undefined) {
        crimeName = crimes[0]
        for (const item of crimes) {
            if (singularity.getCrimeChance(crimeName) > singularity.getCrimeChance(item)) {
                break
            }
            crimeName = item
        }
    }

    while (true) {
        const crimeTime = singularity.commitCrime(crimeName)
        await ns.sleep(crimeTime + 3 * 1000)
    }
}