// TODO  Did you forget a ns.sleep(x)?
// Where infinite loop?
/** @param {NS} ns */
export async function main(ns) {
	while (true) {
		var hackinglevel = ns.getHackingLevel()
		var target = await getTargetServer(ns.getHostname(), hackinglevel)
		if (target != null) {
			ns.print(target)
			startNuke(target)
			await runScript(target)
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
			ns.print("--start--")
			var target = servers[index]
			var targetRequiredLevel = ns.getServerRequiredHackingLevel(target)
			ns.print(target)
			if (ns.hasRootAccess(target)) {
				ns.print("hasRoot")
			} else if (targetRequiredLevel > hackinglevel) {
				ns.print("low hackinglevel")
				if (targetRequiredLevel - hackinglevel > 100) {
					ns.print("low hackinglevel over")
					continue
				}
			} else if (ns.getServerNumPortsRequired(target) > countPortTools()) {
				ns.print("low port tools")
			} else {
				ns.print("hit target !!!")
				result = target
			}
			if (result == null) {
				await ns.sleep(1 * 1000)
				result = await getTargetServer(target, hackinglevel)
			}
			ns.print("--end--")
		}
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


