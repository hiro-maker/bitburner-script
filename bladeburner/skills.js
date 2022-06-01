const skills = [
    ["Blade's Intuition", 999],
    ["Cloak", 25],
    ["Short-Circuit", 25],
    ["Digital Observer", 999],
    ["Tracer", 10],
    ["Overclock", 999],
    ["Reaper", 999],
    ["Evasive System", 999],
    ["Hyperdrive", 20]];

/** @param {NS} ns */
export async function main(ns) {
    const bladeburner = ns.bladeburner
    while (true) {
        const nowPoint = bladeburner.getSkillPoints()
        for (const skill in skills) {
            const name = skill[0]
            const now = bladeburner.getSkillLevel(name)
            if (now < skill[1] && nowPoint >= bladeburner.getSkillUpgradeCost(name)) {
                bladeburner.upgradeSkill(name)
            }
        }
        await ns.sleep(60 * 1000)
    }
}