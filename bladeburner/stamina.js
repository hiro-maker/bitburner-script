const types = ["General", "Contracts", "Operationts", "BlackOps"];
const generals = ["Field Analysis", "Diplomacy", "Hyperbolic Regeneration Chamber"];
const contracts = ["Tracking", "Bounty Hunter"];

/** @param {NS} ns */
export async function main(ns) {
    const bladeburner = ns.bladeburner
    while (true) {
        const stamina = bladeburner.getStamina()
        const currentStamina = stamina[0]
        const maxStamina = stamina[1]
        var type = types[0] // General
        var name = generals[2] // Hyperbolic Regeneration Chamber
        if (maxStamina / 2 <= currentStamina) {
            type = types[1] // Contracts
            name = contracts[1] // Bounty Hunter
        }
        bladeburner.startAction(type, name)
        await ns.sleep(200)
    }
}