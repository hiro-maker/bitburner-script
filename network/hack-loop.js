/** @param {NS} ns */
export async function main(ns) {
	const target = ((args0) => args0 !== undefined ? args0 : ns.getHostname())(ns.args[0])
	while(true) {
		await ns.hack(target);
	}
}