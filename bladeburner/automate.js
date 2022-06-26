const finish = ["Finish", ""]
const generals = [
    ["General", "Field Analysis"],
    ["General", "Diplomacy"],
    ["General", "Hyperbolic Regeneration Chamber"]
]
const actinos = [
    ["Contracts", "Tracking"],
    ["Contracts", "Bounty Hunter"],
    ["Contracts", "Retirement"],
    ["Operations", "Investigation"],
    ["Operations", "Undercover Operation"],
    ["Operations", "Sting Operation"],
    ["Operations", "Raid"],
    ["Operations", "Stealth Retirement Operation"],
    ["Operations", "Assassination"]
]

/** @param {NS} ns */
export async function main(ns) {
    const bladeburner = ns.bladeburner
    while (true) {
        const stamina = bladeburner.getStamina()
        const currentStamina = stamina[0]
        const maxStamina = stamina[1]
        if (maxStamina / 2 <= currentStamina) {
            const target = getTargetAction(bladeburner)
            if (finish == target) {
                break
            }
            const delay = bladeburner.getActionTime(target[0], target[1])
            bladeburner.startAction(target[0], target[1])
            await ns.sleep(delay + 200)
        } else {
            await rest(ns, bladeburner)
        }
    }
}

function getTargetAction(bladeburner) {
    // 仮
    const action = actinos[3]
    const type = action[0]
    const name = action[1]
    // Chance
    const chances = bladeburner.getActionEstimatedSuccessChance(type, name)
    if (0.85 > chances[0]) {
        if (chances[0] != chances[1]) {
            return generals[0]
        } else if (50 < bladeburner.getCityChaos(bladeburner.getCity())) {
            // city chaos
            return generals[1]
        } else{
            bladeburner.stopBladeburnerAction()
            return finish
        }
    } 
    // Operations remaining
    const count = bladeburner.getActionCountRemaining(type, name)
    if (0 >= count) {
        bladeburner.stopBladeburnerAction()
        return finish
    }
    return [type, name]
}

async function rest(ns, bladeburner) {
    while (true) {
        const stamina = bladeburner.getStamina()
        const currentStamina = stamina[0]
        const maxStamina = stamina[1]
        if (maxStamina == currentStamina) {
            break
        }
        const hrc = generals[2] // Hyperbolic Regeneration Chamber
        const delay = bladeburner.getActionTime(hrc[0], hrc[1])
        bladeburner.startAction(hrc[0], hrc[1])
        await ns.sleep(delay + 200)
    }
}