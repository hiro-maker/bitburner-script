const gyms = ["Powerhouse Gym"]
const stats = ["Train Strength", "Train Defense", "Train Dexterity", "Train Agility"]
const status = ["stay", "doing", "finish"]
/** @param {NS} ns */
export async function main(ns) {
    const singularity = ns.singularity
    const statuses = [status[0], status[0], status[0], status[0]]

    while (true) {
        const player = ns.getPlayer()
        if (player.strength < 100) {
            singularity.gymWorkout(gyms[0], stats[0], true)
            strengthStatus = statuses[0][1]
        } else {
            strengthStatus = statuses[0][2]
        }
        if (player.defense < 100) {
            singularity.gymWorkout(gyms[0], stats[1], true)
            strengthStatus = statuses[1][1]
        } else {
            defenseStatus = statuses[1][2]
        }
        if (player.dexterity < 100) {
            singularity.gymWorkout(gyms[0], stats[2], true)
            strengthStatus = statuses[2][1]
        } else {
            dexterityStatus = statuses[2][2]
        }
        if (player.agility < 100) {
            singularity.gymWorkout(gyms[0], stats[3], true)
            strengthStatus = statuses[3][1]
        } else {
            agilityStatus = statuses[3][2]
        }
    }
}