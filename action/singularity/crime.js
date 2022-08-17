const crimes = ["shoplift", "rob store", "mug", "larceny", "deal drugs", "bond forgery", "traffick arms", "homicide", "grand theft auto", "kidnap", "assassinate", "heist"]
/** @param {NS} ns */
export async function main(ns) {
    const singularity = ns.singularity
    var crimeName = crimes[0]
    while (true) {
        if (ns.args[0] === undefined) {
            for (const item of crimes) {
                if (singularity.getCrimeChance(crimeName) != 1 || singularity.getCrimeChance(item) < 0.85) {
                    break
                }
                crimeName = item
            }
        } else {
            crimeName = ns.args[0]
        }

        const crimeTime = singularity.commitCrime(crimeName)
        await ns.sleep(crimeTime + 3 * 1000)
    }
}