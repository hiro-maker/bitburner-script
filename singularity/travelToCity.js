const citys = ["Sector-12", "Chongqing", "Ishima", "New Tokyo", "Volhaven", "Aevum"]
/** @param {NS} ns */
export async function main(ns) {
    const city = ns.args[0]
    if (citys.includes(city)) {
        if (ns.singularity.travelToCity(city)) {
            ns.tprint("Have a good trip.")
            return
        }
    }
    ns.tprint(citys)
    ns.tprint("You are in " + ns.getPlayer().city)
}