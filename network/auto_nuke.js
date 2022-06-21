const errorType = {
	FIND_TARGET: 0,
	HAS_ROOT: 1,
	LOW_HACKING_LEVEL: 2,
	LOW_HACKING_LEVEL_OVER: 3,
	LOW_PORT_TOOL: 4,
	UNKNOW: 999,
}

/** @param {NS} ns */
export async function main(ns) {
	var target = [errorType.UNKNOW, ns.getHostname()]
	while (true) {
		target = await getTargetServer(target[1], ns.getHackingLevel())
		if (target[0] == errorType.FIND_TARGET) {
			startNuke(target[1])
			await runScript(target[1])
		}
		await ns.sleep(60 * 1000)
	}

	async function getTargetServer(host, hackinglevel) {
		var servers = ns.scan(host)
		var result
		for (var index in servers) {
			if (index == 0) {
				continue
			}
			result = servers[index]
			let type = isTargetServer(result, hackinglevel)
			if (type == errorType.LOW_HACKING_LEVEL_OVER) {
				continue
			}
		}
		// TODO required last server flg.
		return [type, result]
	}

	function isTargetServer(target, hackinglevel) {
		var result = errorType.UNKNOW
		ns.print("--start--")
		var targetRequiredLevel = ns.getServerRequiredHackingLevel(target)
		if (ns.hasRootAccess(target)) {
			result = errorType.HAS_ROOT
		} else if (targetRequiredLevel > hackinglevel) {
			result = errorType.LOW_HACKING_LEVEL
			if (targetRequiredLevel - hackinglevel > 100) {
				result = errorType.LOW_HACKING_LEVEL_OVER
			}
		} else if (ns.getServerNumPortsRequired(target) > countPortTools()) {
			result = errorType.LOW_PORT_TOOL
		} else {
			result = errorType.FIND_TARGET
		}
		ns.print(target + " is " + result.toString())
		ns.print("--end--")
		return result
	}


	function countPortTools() {
		var result = 0
		if (ns.fileExists("BruteSSH.exe", "home")) {
			++result
		}
		if (ns.fileExists("FTPCrack.exe", "home")) {
			++result
		}
		if (ns.fileExists("relaySMTP.exe", "home")) {
			++result
		}
		if (ns.fileExists("HTTPWorm.exe", "home")) {
			++result
		}
		if (ns.fileExists("SQLInject.exe", "home")) {
			++result
		}
		return result
	}

	function startNuke(target) {
		// ready nuke.
		if (ns.fileExists("BruteSSH.exe", "home")) {
			ns.brutessh(target);
		}
		if (ns.fileExists("FTPCrack.exe", "home")) {
			ns.ftpcrack(target)
		}
		if (ns.fileExists("relaySMTP.exe", "home")) {
			ns.relaysmtp(target)
		}
		if (ns.fileExists("HTTPWorm.exe", "home")) {
			ns.httpworm(target)
		}
		if (ns.fileExists("SQLInject.exe", "home")) {
			ns.sqlinject(target)
		}
		ns.nuke(target);
		//ns.installBackdoor(target)
	}

	async function runScript(target) {
		var script1 = "early-hack-template.js"
		var script2 = "hackloop.js"

		// scp script
		await ns.scp(script1, target)
		await ns.scp(script2, target)

		// run script
		ns.exec(script2, target)

		var maxRam = ns.getServerMaxRam(target)
		var script1Ram = ns.getScriptRam(script1)

		var id = 0;
		while (maxRam - ns.getServerUsedRam(target) >= script1Ram) {
			ns.exec(script1, target, 1, id)
			++id
		}
	}
}


