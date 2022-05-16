let factionServers = ["CSEC", "avmnite-02h", "I.I.I.I", "run4theh111z", "w0r1d_d43m0n"];
let css = `<style id="scanCSS">
        .w  {white-space:nowrap}
        .sc {white-space:pre; color:#ccc; font:14px monospace; line-height: 16px; }
        .sc .s {color:#080; cursor:pointer; text-decoration:underline}
        .sc .f {color:#088}
        .sc .r {color:#6f3}
        .sc .r.f {color:#0ff}
        .sc .r::before {color:#6f3}
        .sc .hack {display:inline-block; font:12px monospace}
        .sc .red {color:red;}
        .sc .green {color:green;}
        .sc .backdoor {color:#6f3; font:12px monospace}
        .sc .backdoor > a {cursor:pointer; text-decoration:underline;}
        .sc .cct {color:#0ff;}
    </style>`;
let doc = eval("document");
let tprint = html => doc.getElementById("terminal").insertAdjacentHTML('beforeend', `<li>${html}</li>`);
/** @param {NS} ns **/
export let main = ns => {
    let tIn = doc.getElementById("terminal-input");
    let tEv = tIn[Object.keys(tIn)[1]];
    let priorCss = doc.getElementById("scanCSS");
    if (priorCss) priorCss.parentNode.removeChild(priorCss); // Remove old CSS to facilitate tweaking css above
    doc.head.insertAdjacentHTML('beforeend', css);
    let serverInfo = (x) => {
        return ns.getServer(x); // Costs 2 GB. If you can't don't need backdoor links, uncomment and use the alternate implementations below
        /* return {
            requiredHackingSkill: ns.getServerRequiredHackingLevel(x),
            hasAdminRights: ns.hasRootAccess(x),
            purchasedByPlayer: x.includes('daemon') || x.includes('hacknet'),
            backdoorInstalled: true // No way of knowing without ns.getServer
        } */
    }
    let s = ["home"],
        p = [""],
        r = { home: "home" },
        myHack = ns.getHackingLevel(),
        fName = x => {
            let server = serverInfo(x); // Costs 2 GB. If you can't don't need backdoor links, uncomment the alternate implementations below
            let rooted = server.hasAdminRights; // ns.hasRootAccess(x);
            let reqHack = server.requiredHackingSkill; // ns.getServerRequiredHackingLevel(x);
            let numPort = server.numOpenPortsRequired; // ns.numOpenPortsRequired(x);
            // let nowSecurityLevel = server.hackDifficulty; // ns.getServerSecurityLevel(x);
            // let hackMoney = ns.hackAnalyze(x)
            let hackChance = ns.formulas.hacking.hackChance(server, ns.getPlayer())
            let hackTime = ns.formulas.hacking.hackTime(server, ns.getPlayer())
            let maxRam = server.maxRam
            let rate = Math.floor(server.moneyAvailable / hackTime * hackChance)
            return `<span class="w" id="${x}">` +
                `<a class="s${factionServers.includes(x) ? " f" : ""}${rooted ? " r" : ""}">${x}</a>
                <span class="hack ${(reqHack <= myHack ? 'green' : 'red')}">(Hack:${reqHack})</span>
                <span>Port:${numPort}</span>
                <span>${rate == 0 ? '' : 'MaxRam:' + maxRam +'GB'}</span>
                <span>${rate == 0 ? '' : 'HackRate:' + rate}</span>
            </span>`;
        };
    let addSc = (x = s[0], p1 = ["\n"], o = p1.join("") + fName(x)) => {
        for (let i = 0; i < s.length; i++) {
            if (p[i] != x) continue;
            let p2 = p1.slice();
            p2[p2.length - 1] = p2[p2.push(p.slice(i + 1).includes(p[i]) ? "├╴" : "└╴") - 2].replace("├╴", "│ ").replace("└╴", "  ");
            o += addSc(s[i], p2);
        }
        return o;
    };
    let ordering = (a, b) => {
        let d = ns.scan(a).length - ns.scan(b).length; // Sort servers with fewer connections towards the top.
        d = d != 0 ? d : serverInfo(b).purchasedByPlayer - serverInfo(a).purchasedByPlayer; // Purchased servers to the very top
        d = d != 0 ? d : a.slice(0, 2).toLowerCase().localeCompare(b.slice(0, 2).toLowerCase()); // Hack: compare just the first 2 chars to keep purchased servers in order purchased
        return d;
    }
    for (let i = 0, j; i < s.length; i++)
        for (j of ns.scan(s[i]).sort(ordering))
            if (!s.includes(j)) s.push(j), p.push(s[i]), r[j] = r[s[i]] + ";connect " + j;
    tprint(`<div class="sc new">${addSc()}</div>`);
    doc.querySelector(".sc.new").classList['remove']("new");
};