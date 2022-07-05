
const blackops = "BlackOps"

const fieldAnalysis = ["General", "Field Analysis"]

/** @param {NS} ns */
export async function main(ns) {
    const bladeburner = ns.bladeburner
    for (const action of bladeburner.getBlackOpNames()) {
        // Rank check.
        if (bladeburner.getRank() < bladeburner.getBlackOpRank(action)) {
            break
        }

        // Cance check.
        await startFieldAnalysis(ns, bladeburner, action)

        var delay = 0
        if (bladeburner.startAction(blackops, action)) {
            delay += bladeburner.getActionTime(blackops, action)
        }
        await ns.sleep(delay + 200)
    }
}

async function startFieldAnalysis(ns, bladeburner, action) {
    while (true) {
        const chances = bladeburner.getActionEstimatedSuccessChance(blackops, action)
        if (chances[0] != chances[1] || chances[0] != 1) {
            const delay = bladeburner.getActionTime(fieldAnalysis[0], fieldAnalysis[1])
            bladeburner.startAction(fieldAnalysis[0], fieldAnalysis[1])
            await ns.sleep(delay + 200)
        } else {
            break
        }
    }
}