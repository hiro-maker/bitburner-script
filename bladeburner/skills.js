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
        var target = ""
        var targetCost = Number.MAX_SAFE_INTEGER
        for (const skill of skills) {
            const name = skill[0]
            const now = bladeburner.getSkillLevel(name)
            if (now < skill[1]) {
                const cost = bladeburner.getSkillUpgradeCost(name)
                if (nowPoint >= cost && targetCost > cost) {
                    target = name
                    targetCost = cost
                }
            }
        }
        if (!!target) {
            bladeburner.upgradeSkill(target)
            await ns.sleep(1000)
        } else {
            await ns.sleep(60 * 1000)
        }
    }
}