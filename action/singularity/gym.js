const gyms = ["Powerhouse Gym"]
const stats = ["strength", "defense", "dexterity", "agility"]
/** @param {NS} ns */
export async function main(ns) {
    const singularity = ns.singularity
    const target = ((args0) => args0 !== undefined ? args0 : 100)(ns.args[0])
    var status = stats[0]
    while (true) {
        const skills = ns.getPlayer().skills
        if (skills.strength < target) {
            singularity.gymWorkout(gyms[0], stats[0], true)
        } else {
            status = stats[1]
        }
        if (status == stats[1]) {
            if(skills.defense < target) {
                singularity.gymWorkout(gyms[0], stats[1], true)
            } else {
                status = stats[2]
            }
        }
        if (status == stats[2]){
            if(skills.dexterity < target) {
                singularity.gymWorkout(gyms[0], stats[2], true)
            } else {
                status = stats[3]
            }
        }
        if (status == stats[3]) {
            if (skills.agility < target) {
                singularity.gymWorkout(gyms[0], stats[3], true)
            } else {
                singularity.stopAction()
                break
            }
        }
        await ns.sleep(60 * 1000)
    }
}