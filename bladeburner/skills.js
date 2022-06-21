const skills = [
    ["Blade's Intuition", 999],
    ["Cloak", 25],
    ["Short-Circuit", 25],
    ["Digital Observer", 999],
    ["Tracer", 10],
    ["Overclock", 90],
    ["Reaper", 999],
    ["Evasive System", 999],
    ["Hyperdrive", 20]];

/** @param {NS} ns */
export async function main(ns) {
    const bladeburner = ns.bladeburner
    while (true) {
        const nowPoint = bladeburner.getSkillPoints()
        var isUpgrade = false
        for (const skill of skills) {
            const name = skill[0]
            const now = bladeburner.getSkillLevel(name)
            if (now < skill[1] && nowPoint >= bladeburner.getSkillUpgradeCost(name)) {
                bladeburner.upgradeSkill(name)
                isUpgrade = true
            }
        }
        if (!isUpgrade) {
            await ns.sleep(60 * 1000)
        }
    }
}